//Define unit which has HP/direction and be selectable, unattackable unit
var Unit=Gobj.extends({
    constructorPlus:function(props){
        //Add id for unit
        this.id=Unit.currentID++;
        this.direction=(Math.random()*8)>>0;//Random direction,Math.floor
        this.isEnemy=Boolean(props.isEnemy);//false by default
        this.life=this.get('HP');
        if (this.SP) this.shield=this.get('SP');
        if (this.MP) this.magic=50;
        this.selected=false;
        this.routingTimer=0;
        //Each unit instance has its own sound
        this.sound={
            selected:new Audio('bgm/'+this.name+'.selected.wav'),
            moving:new Audio('bgm/'+this.name+'.moving.wav'),
            death:new Audio('bgm/'+this.name+'.death.wav')
        };
        //Finish below after fully constructed, postpone
        var myself=this;
        setTimeout(function(){
            //Add this unit into Game
            Unit.allUnits.push(myself);
            if (myself.isFlying) {
                if (myself.isEnemy) Unit.enemyFlyingUnits.push(myself);
                else Unit.ourFlyingUnits.push(myself);
            }
            else {
                if (myself.isEnemy) Unit.enemyGroundUnits.push(myself);
                else Unit.ourGroundUnits.push(myself);
            }
            //Flying units show above ground units
            Unit.sortAllUnits();
            //Show unit
            myself.dock();
        },0);

    },
    prototypePlus:{
        name:"Unit",
        isFlying:true,
        //Override Gobj method
        animeFrame:function(){
            //Animation play
            this.action++;
            //Override Gobj here, support hidden frames
            var arrLimit=(this.imgPos[this.status].left[0] instanceof Array)?(this.imgPos[this.status].left[0].length):1;
            if (this.action==this.frame[this.status] || this.action>=arrLimit) {
                this.action=0;
            }
            //Multiple hidden frames support
            if (this.imgPos[this.status].left[0][this.action]==-1) this.action=0;
        },
        detectOutOfBound:function(){
            var boundX=Map.getCurrentMap().width-this.width;
            var boundY=Map.getCurrentMap().height-this.height;
            //Right Bound
            if (this.x>boundX) {
                this.x=boundX;
            }
            //Left Bound
            if (this.x<0) {
                this.x=0;
            }
            //Bottom Bound
            if (this.y>boundY) {
                this.y=boundY;
            }
            //Top Bound
            if (this.y<0) {
                this.y=0;
            }
        },
        //Override to use 8 directions speed
        updateLocation:function(){
            //8 directions speed
            if (this.get('speed') instanceof Array){
                this.x+=this.get('speed')[this.direction].x;
                this.y+=this.get('speed')[this.direction].y;
            }
            //No direction speed
            else {
                this.x+=this.get('speed').x;
                this.y+=this.get('speed').y;
            }
        },
        //Add new functions to prototype
        turnTo:function(direction){
            //Change direction
            this.direction=direction;
        },
        //Dock means stop moving but keep animation
        dock:function(){
            //Clear old timer
            this.stop();
            //Launch new dock timer
            this.status="dock";
            this.action=0;
            //Stop routing
            clearInterval(this.routingTimer);
            var myself=this;
            this._timer=setInterval(function(){
                //Only play animation, will not move
                myself.animeFrame();
            },100);
        },
        stand:function(){
            this.dock();
        },//alias
        stopMoving:function(){
            this.dock();
        },//alias
        run:function(){
            this.moving();
        },//alias
        navigateTo:function(clickX,clickY,range){
            if (!range) range=Unit.moveRange;//Smallest limit by default
            //Center position
            var charaX=this.posX();
            var charaY=this.posY();
            //Already at check point
            if (this.insideCircle({centerX:clickX,centerY:clickY,radius:range})) {
                this.dock();
                //Stop routing
                clearInterval(this.routingTimer);
                this.routingTimer=0;
                //Reach destination flag
                return true;
            }
            //Need move
            else {
                var direction=0;
                //Already in same X
                if (this.insideSquare({centerX:clickX,centerY:charaY,radius:range*0.7>>0})) {
                    direction=(clickY>charaY)?4:0;
                }
                else {
                    //Already in same Y
                    if (this.insideSquare({centerX:charaX,centerY:clickY,radius:range*0.7>>0})) {
                        direction=(clickX>charaX)?2:6;
                    }
                    //Need move by oblique path
                    else {
                        direction=(clickX>charaX)?(clickY>charaY?3:1):(clickY>charaY?5:7);
                    }
                }
                /*//Change direction to avoid collision
                if (this.collision) {
                    var directionLeft=(direction-1+8)%8;
                    var nextStepLeft={x:this.posX()+this.get('speed')[directionLeft].x,
                        y:this.posY()+this.get('speed')[directionLeft].y};
                    var directionRight=(direction+1)%8;
                    var nextStepRight={x:this.posX()+this.get('speed')[directionRight].x,
                        y:this.posY()+this.get('speed')[directionRight].y};
                    //Choose one side
                    direction=(this.collision.distanceFrom(nextStepLeft)>this.collision.distanceFrom(nextStepRight))
                        ?directionLeft:directionRight;
                    //direction=(this.faceTo(this.collision,true)+1)%8;
                    //Remove collision unit
                    this.collision=undefined;
                }*/
                this.turnTo(direction);
            }
        },
        faceTo:function(target,preventAction){
            //Below angle represents direction toward target
            var angle;
            //Unit or Building
            if (target instanceof Gobj){
                angle=Math.atan((this.posY()-target.posY())/(target.posX()-this.posX()));
            }
            else {
                //Location={x:1,y:2}
                angle=Math.atan((this.posY()-target.y)/(target.x-this.posX()));
            }
            if (target.posX()<this.posX()) angle+=Math.PI;
            //Wrap out nearest direction
            var direction=(angle<-Math.PI*3/8)?4:(angle<-Math.PI/8)?3:(angle<Math.PI/8)?2:(angle<Math.PI*3/8)?1:
                (angle<Math.PI*5/8)?0:(angle<Math.PI*7/8)?7:(angle<Math.PI*9/8)?6:(angle<Math.PI*11/8)?5:4;
            if (!preventAction) this.turnTo(direction);
            return direction;
        },
        escapeFrom:function(enemy){
            //Add to fix holding issue
            if (this.hold) return;
            var escapeDirection=Unit.prototype.faceTo.call(enemy,this,true);//Fix escape from attackable building issue
            var escapeSpeed=this.get('speed')[escapeDirection];
            var escapeSteps=100/(Math.abs(escapeSpeed.x)+Math.abs(escapeSpeed.y));
            //Escape by multiple steps
            this.moveTo(this.posX()+escapeSpeed.x*escapeSteps,this.posY()+escapeSpeed.y*escapeSteps);
        },
        moveTo:function(clickX,clickY,range,callback){
            if (!range) range=Unit.moveRange;//Smallest limit by default
            //If already routing
            if (this.routingTimer) {
                clearInterval(this.routingTimer);//then break routing
            }
            //Start new routing
            var myself=this;
            var routingFrame=function(){
                if (myself.navigateTo(clickX,clickY,range)){
                    //Run callback when reach target
                    if (typeof(callback)=='function') callback();
                    return true;
                }
            };
            //Add one missing frame, fix twice callback issue
            if (routingFrame()) callback=null;
            this.routingTimer=setInterval(routingFrame,100);
            //Start moving
            this.run();
        },
        moveToward:function(target,range,callback){
            if (!range) range=Unit.moveRange;//Smallest limit by default
            //If already routing
            if (this.routingTimer) {
                clearInterval(this.routingTimer);//then break routing
            }
            //Start new routing
            var myself=this;
            var routingFrame=function(){
                if (target.status!='dead'){
                    if (myself.navigateTo(target.posX(),target.posY(),range)) {
                        //Run callback when reach target
                        if (typeof(callback)=='function') callback();
                        //Reach destination flag, fix twice callback issue
                        return true;
                    }
                }
                //Will stop move toward dead target
                else {
                    clearInterval(myself.routingTimer);
                    myself.dock();
                }
            };
            //Add one missing frame, fix twice callback issue
            if (routingFrame()) callback=null;
            this.routingTimer=setInterval(routingFrame,100);
            //Start moving
            this.run();
        },
        //Override for sound effect
        die:function(){
            //Old behavior
            Gobj.prototype.die.call(this);
            this.life=0;
            //Stop routing
            clearInterval(this.routingTimer);
            //If has sound effect
            if (this.sound.death && this.insideScreen()) {
                this.sound.death.play();
            }
        },
        //AI when attacked by enemy
        reactionWhenAttackedBy:function(enemy,onlyDamage){
            //Resign and give reward to enemy if has no life before dead
            if (this.life<=0) {
                //If multiple target, only die once and give reward
                if (this.status!="dead") {
                    //Killed by enemy
                    this.die();
                    //Give enemy reward
                    enemy.kill++;
                }
                //Already dead, cannot take following actions
                return;
            }
            //Run away toward bullet direction
            if (this.status=="dock" && !onlyDamage){
                this.escapeFrom(enemy);
            }
        },
        //Calculate damage, if enemy is damage itself, return that damage directly
        calculateDamageBy:function(enemyObj){
            var damage=0;
            if (enemyObj instanceof Gobj){
                var enemyAttackType=enemyObj.attackType;
                if (!enemyAttackType && enemyObj.attackMode){
                    enemyAttackType=(this.isFlying)?enemyObj.attackMode.flying.attackType:enemyObj.attackMode.ground.attackType;
                }
                damage=enemyObj.get('damage')*Unit.attackMatrix[enemyAttackType][this.unitType];
            }
            else damage=enemyObj;
            return damage;
        },
        getDamageBy:function(enemy,percent){
            if (percent==undefined) percent=1;//100% by default
            var damage=0;
            //If has SP and shield remain
            if (this.shield>0) {
                damage=((this.calculateDamageBy(enemy)-this.get('plasma'))*percent)>>0;
                if (damage<1) damage=0.5;
                this.shield-=damage;
                if (this.shield<0) {
                    //Inherit damage
                    this.life+=(this.shield);
                    this.shield=0;
                }
            }
            else {
                damage=((this.calculateDamageBy(enemy)-this.get('armor'))*percent)>>0;
                if (damage<1) damage=0.5;
                this.life-=damage;
            }
        },
        //Attack ground action
        attackGround:function(position,loop){
            //Convert to array
            var positions=new Array().concat(position);
            if (this.attack) this.stopAttack();
            //Move to first position
            this.moveTo(positions[0].x,positions[0].y);
            this.targetLock=false;
            var checkpoint=this.destination=positions[0];
            //Join destination chain from next
            positions.slice(1).forEach(function(pos){
                checkpoint.next=pos;
                checkpoint=checkpoint.next;
            });
            //Patrol loop, dead lock
            if (loop) checkpoint.next=this.destination;
        },
        //Patrol action
        patrol:function(position,addHere){
            //Convert to array
            var positions=new Array().concat(position);
            if (addHere) positions.push({x:this.posX(),y:this.posY()});
            this.attackGround(positions,true);
        },
        isMachine:function(){
            return ["SCV","Vulture","Tank","Goliath","Wraith","Dropship","Vessel","BattleCruiser","Valkyrie",
                "Probe","Dragoon","Shuttle","Reaver","Observer","Scout","Carrier","Arbiter","Corsair","HeroCruiser"]
                .indexOf(this.name)!=-1;
        },
        //Life status
        lifeStatus:function(){
            var lifeRatio=this.life/this.get('HP');
            return ((lifeRatio>0.7)?"green":(lifeRatio>0.3)?"yellow":"red");
        }
    }
});
//Assign current ID to each newly born unit
Unit.currentID=0;
//Smallest range for move precision
Unit.moveRange=20;
//Range for mouse select
Unit.selectRange=20;
//Range for melee attack
Unit.meleeRange=25;//50
//Speed matrix, 2^0.5=>0.7
Unit.speedMatrix=[
    {x: 0, y: -1},
    {x: 0.7, y: -0.7},
    {x: 1, y: 0},
    {x: 0.7, y: 0.7},
    {x: 0, y: 1},
    {x: -0.7, y: 0.7},
    {x: -1, y: 0},
    {x: -0.7, y: -0.7}
];
//Get speed matrix by unit speed
Unit.getSpeedMatrixBy=function(speed){
    var speedMatrix=_$.clone(Unit.speedMatrix);
    _$.matrixOperation(speedMatrix,function(N){
        return N*speed;
    });
    return speedMatrix;
};
//All units' sight
Unit.sight=300;
//Attack type matrix
Unit.attackMatrix=[
    [1,1,1],
    [0.5,0.75,1],
    [1,0.5,0.25]
];
//Unit type
Unit.SMALL=0;
Unit.MIDDLE=1;
Unit.BIG=2;
//All existed units, class property
Unit.allUnits=[];
Unit.ourFlyingUnits=[];
Unit.ourGroundUnits=[];
Unit.enemyFlyingUnits=[];
Unit.enemyGroundUnits=[];
Unit.allOurUnits=function(){
  return Unit.ourFlyingUnits.concat(Unit.ourGroundUnits);
};
Unit.allEnemyUnits=function(){
    return Unit.enemyFlyingUnits.concat(Unit.enemyGroundUnits);
};
Unit.allFlyingUnits=function(){
    return Unit.ourFlyingUnits.concat(Unit.enemyFlyingUnits);
};
Unit.allGroundUnits=function(){
    return Unit.ourGroundUnits.concat(Unit.enemyGroundUnits);
};
//Get all units count
Unit.count=function(){
    var count={ours:0,enemy:0};
    Unit.allUnits.forEach(function(chara){
        if (chara.isEnemy) count.enemy++;
        else count.ours++;
    });
    return count;
};
//Sort all units to show flying unit above/after ground unit
Unit.sortAllUnits=function(){
    Unit.allUnits.sort(function(unit1,unit2){
        return (unit1.isFlying?1:0)-(unit2.isFlying?1:0);
    });
};
//Sort units
Unit.sortUnits=function(units){
    units.sort(function(unit1,unit2){
        return (unit1.isFlying?1:0)-(unit2.isFlying?1:0);
    });
};
//Dock action I
Unit.turnAround=function(){
    //Inherited dock from Unit.js
    Unit.prototype.dock.call(this);
    //Add in new things
    if (this.dockTimer) clearInterval(this.dockTimer);
    var myself=this;
    this.dockTimer=setInterval(function(){
        //Look around animation
        if (myself.status=="dock") {
            myself.turnTo((myself.direction+1)%8);//For all ground soldier to use
        }
        else {
            clearInterval(myself.dockTimer);
        }
    },2000);
};
//Dock action II
Unit.walkAround=function(){
    //Inherited dock from Unit.js
    Unit.prototype.dock.call(this);
    //Add in new things
    if (this.dockTimer) clearInterval(this.dockTimer);
    var myself=this;
    this.dockTimer=setInterval(function(){
        var direction=(Math.random()*8)>>0;//Math.floor
        //Walk around, for all critters to use
        if (myself.status=="dock") {
            myself.moveTo(myself.posX()+myself.get('speed')[direction].x*6,myself.posY()+myself.get('speed')[direction].y*6);
        }
        else {
            clearInterval(myself.dockTimer);
        }
    },2000);
};
//Dock action III
Unit.hover=function(){
    //Inherited dock from Unit.js
    Unit.prototype.dock.call(this);
    //Add in new things
    if (this.dockTimer) clearInterval(this.dockTimer);
    var myself=this;
    var N=0;
    var hoverOffset=1;
    this.dockTimer=setInterval(function(){
        //Hover animation
        if (myself.status=="dock") {
            myself.y+=hoverOffset;
            if (N%4==0) {
                //myself.turnTo((myself.direction+1)%8);//For marine to use
                hoverOffset=-hoverOffset;//Hover up and down
            }
        }
        else {
            clearInterval(myself.dockTimer);
        }
        N++;
    },200);
};
//Dock action IV
Unit.walkAroundLarva=function(){
    //Inherited dock from Unit.js
    Unit.prototype.dock.call(this);
    //Add in new things
    if (this.dockTimer) clearInterval(this.dockTimer);
    var myself=this;
    this.dockTimer=setInterval(function(){
        var direction=(myself.direction+1)%8;//Math.floor
        //Walk around, for all critters to use
        if (myself.status=="dock") {
            Unit.prototype.moveTo.call(myself,myself.posX()+myself.get('speed')[direction].x*6,myself.posY()+myself.get('speed')[direction].y*6);
        }
        else {
            clearInterval(myself.dockTimer);
        }
    },2000);
};
var AttackableUnit=Unit.extends({
    constructorPlus:function(props){
        this.attackTimer=0;
        this.bullet={};
        this.kill=0;
        this.target={};
        //Idle by default
        this.targetLock=false;
        //Can fire by default
        this.coolDown=true;
        //Init attack range
        if (this.meleeAttack) this.attackRange=Math.max(this.radius(),35);
        //Add attack sound for AttackableUnit
        this.sound.attack=new Audio('bgm/'+this.name+'.attack.wav');
    },
    prototypePlus:{
        //Add basic unit info
        name:"AttackableUnit",
        isInAttackRange:function(enemy){
            return enemy.inside({centerX:this.posX(),centerY:this.posY(),radius:this.get('attackRange')});
        },
        matchAttackLimit:function(enemy){
            //Has attack limit
            if (this.attackLimit){
                //Doesn't match attack limit
                if ((this.attackLimit=="flying" && !(enemy.isFlying)) ||
                    (this.attackLimit=="ground" && enemy.isFlying)) return false;
            }
            //No attack limit or match attack limit
            return true;
        },
        attack:function(enemy){
            //Cannot attack invisible unit or unit who mismatch your attack type
            if (enemy.isInvisible || !(this.matchAttackLimit(enemy))) {
                Referee.voice.pError.play();
                this.stopAttack();
                return;
            }
            //Don't attack same target again unless miss target or tracing target
            if (this.target==enemy) {
                if (this.cannotReachTarget()) {
                    if (this.status=='moving') return;//tracing
                }
                else return;
            }
            //Recover attack range
            else delete this.tracing;
            if (enemy instanceof Gobj && enemy.status!="dead") {
                //Stop old attack and moving
                this.stopAttack();
                this.dock();
                //New attack
                this.target=enemy;
                //Get melee attack range if melee attack unit
                if (this.meleeAttack) {
                    //Override
                    this.attackRange=this.radius()+enemy.radius();
                }
                //If separate attack mode, override
                if (this.attackMode) {
                    this.Bullet=(enemy.isFlying)?this.attackMode.flying.Bullet:this.attackMode.ground.Bullet;
                    this.attackRange=(enemy.isFlying)?this.get('attackMode.flying.attackRange'):this.get('attackMode.ground.attackRange');
                    this.attackEffect=(enemy.isFlying)?this.attackMode.flying.attackEffect:this.attackMode.ground.attackEffect;
                    this.attackInterval=(enemy.isFlying)?this.get('attackMode.flying.attackInterval'):this.get('attackMode.ground.attackInterval');
                    //Change attack bgm
                    this.sound.attack=(enemy.isFlying)?this.sound.attackF:this.sound.attackG;
                    this.damage=(enemy.isFlying)?this.get('attackMode.flying.damage'):this.get('attackMode.ground.damage');
                    this.attackType=(enemy.isFlying)?this.attackMode.flying.attackType:this.attackMode.ground.attackType;
                    this.attackMode.status=enemy.isFlying;
                }
                //Move in attack range, no need to move melee
                var range=this.get('attackRange');
                if (this.tracing) {
                    //Adjust attack range for tracing
                    range=Math.max(this.get('attackRange')-50,this.radius()+enemy.radius());
                    delete this.tracing;
                }
                //Add to fix holding issue
                if (!this.hold) this.moveToward(enemy,range);
                var myself=this;
                var attackFrame=function(){
                    //If enemy already dead or becomes invisible or we just miss enemy
                    if (enemy.status=="dead" || enemy.isInvisible || myself.isMissingTarget()) {
                        myself.stopAttack();
                        myself.dock();
                    }
                    else {
                        //Cannot come in until reload cool down, only dock down can finish attack animation
                        if (myself.isReloaded() && myself.isInAttackRange(enemy) && myself.status=="dock") {
                            //Load bullet
                            myself.coolDown=false;
                            //Cool down after attack interval
                            setTimeout(function(){
                                myself.coolDown=true;
                            },myself.get('attackInterval'));
                            //If AOE, init enemies
                            var enemies;
                            if (myself.AOE) {
                                //Get possible targets
                                if (myself.isEnemy) {
                                    enemies=(myself.attackLimit)?((myself.attackLimit=="flying")?
                                        Unit.ourFlyingUnits:Unit.ourGroundUnits.concat(Building.ourBuildings))
                                        :(Unit.allOurUnits().concat(Building.ourBuildings));
                                }
                                else {
                                    enemies=(myself.attackLimit)?((myself.attackLimit=="flying")?
                                        Unit.enemyFlyingUnits:Unit.enemyGroundUnits.concat(Building.enemyBuildings))
                                        :(Unit.allEnemyUnits().concat(Building.enemyBuildings));
                                }
                                //Range filter
                                switch (myself.AOE.type) {
                                    case "LINE":
                                        //Calculate inter-points between enemy
                                        var N=Math.ceil(myself.distanceFrom(enemy)/(myself.AOE.radius));
                                        enemies=enemies.filter(function(chara){
                                            for (var n=1;n<=N;n++){
                                                var X=myself.posX()+n*(enemy.posX()-myself.posX())/N;
                                                var Y=myself.posY()+n*(enemy.posY()-myself.posY())/N;
                                                if (chara.insideCircle({centerX:X>>0,centerY:Y>>0,radius:myself.AOE.radius}) && !chara.isInvisible) {
                                                    return true;
                                                }
                                            }
                                            return false;
                                        });
                                        break;
                                    //Default type is CIRCLE
                                    case "CIRCLE":
                                    default:
                                        enemies=enemies.filter(function(chara){
                                            return chara.insideCircle(
                                                {centerX:enemy.posX(),centerY:enemy.posY(),radius:myself.AOE.radius})
                                                && !chara.isInvisible;
                                        })
                                }
                            }
                            //First facing to enemy
                            myself.faceTo(enemy);
                            //Show attack animation if has
                            if (myself.imgPos.attack) {
                                myself.action=0;
                                //Change status to show attack frame
                                myself.status="attack";
                                //Will return to dock after attack
                                setTimeout(function(){
                                    //If still show attack
                                    if (myself.status=="attack") {
                                        myself.status="dock";
                                        myself.action=0;
                                    }
                                },myself.frame.attack*100);//attackAnimation < attackInterval
                            }
                            //If has bullet
                            if (myself.Bullet) {
                                //Will shoot multiple bullets in one time
                                if (myself.continuousAttack) {
                                    myself.bullet=new Array();
                                    for (var N=0;N<myself.continuousAttack.count;N++){
                                        var bullet=new myself.Bullet({
                                            from:myself,
                                            to:enemy
                                        });
                                        //Reassign bullets location
                                        if (myself.continuousAttack.layout) myself.continuousAttack.layout(bullet,N);
                                        if (myself.continuousAttack.onlyOnce && N!=0) {
                                            bullet.noDamage=true;
                                        }
                                        bullet.fire();
                                        myself.bullet.push(bullet);
                                    }
                                }
                                else {
                                    //Reload one new bullet
                                    myself.bullet=new myself.Bullet({
                                        from:myself,
                                        to:enemy
                                    });
                                    myself.bullet.fire();
                                }
                            }
                            //Else will cause damage immediately (melee attack)
                            else {
                                //Cause damage when burst appear
                                //If AOE, only enemy unit has AOE
                                if (myself.AOE) {
                                    enemies.forEach(function(chara){
                                        chara.getDamageBy(myself);
                                        chara.reactionWhenAttackedBy(myself);
                                    })
                                }
                                else {
                                    //Cause damage after finish whole melee attack action
                                    setTimeout(function(){
                                        enemy.getDamageBy(myself);
                                        enemy.reactionWhenAttackedBy(myself);
                                    },myself.frame.attack*100);
                                }
                                //Will die if suicide attack unit
                                if (myself.suicide) myself.die();
                            }
                            //If has attack effect (burst)
                            if (myself.attackEffect) {
                                if (myself.AOE && myself.AOE.hasEffect) {
                                    enemies.forEach(function(chara){
                                        new myself.attackEffect({x:chara.posX(),y:chara.posY()});
                                    })
                                }
                                else {
                                    new myself.attackEffect({x:enemy.posX(),y:enemy.posY()});
                                }
                            }
                            //Sound effect, missile attack unit will play sound when bullet fire
                            if (!myself.Bullet && myself.insideScreen()) myself.sound.attack.play();
                        }
                    }
                };
                attackFrame();//Add one missing frame
                this.attackTimer=setInterval(attackFrame,100);
            }
        },
        stopAttack:function(){
            //Stop attacking animation
            clearInterval(this.attackTimer);
            //Clear target
            this.target={};
        },
        findNearbyTargets:function(){
            //Initial
            var units,buildings,results=[];
            //Only ours
            if (this.isEnemy) {
                units=Unit.allOurUnits();
                buildings=Building.ourBuildings;
            }
            //Only enemies
            else {
                units=Unit.allEnemyUnits();
                buildings=Building.enemyBuildings;
            }
            var myself=this;
            [units,buildings].forEach(function(charas){
                var myX=myself.posX();
                var myY=myself.posY();
                charas=charas.filter(function(chara){
                    return !chara.isInvisible && myself.canSee(chara) && myself.matchAttackLimit(chara);
                }).sort(function(chara1,chara2){
                    var X1=chara1.posX(),Y1=chara1.posY(),X2=chara2.posX(),Y2=chara1.posY();
                    return (X1-myX)*(X1-myX)+(Y1-myY)*(Y1-myY)-(X2-myX)*(X2-myX)-(Y2-myY)*(Y2-myY);
                });
                results=results.concat(charas);
            });
            //Calculate order delay, reverse to priority
            var _getDelay=function(chara){
                var delay=0;
                if (chara.attack){
                    //Measure delay by attack times needed to kill enemy
                    if (chara.matchAttackLimit(myself))
                        delay+=((chara.life+chara.SP?chara.shield:0)/chara.calculateDamageBy(myself));
                    else delay+=32;
                }
                else delay+=64;
                return delay;
            };
            results.sort(function(chara1,chara2){
                return _getDelay(chara1)-_getDelay(chara2);
            });
            //Take near>>unit>>attackable>>killtimes as priority, will attracted if be attacked
            return results;
        },
        highestPriorityTarget:function(){
            return this.findNearbyTargets()[0];
        },
        AI:function(){
            //Dead unit doesn't have following AI
            if (this.status=='dead') return;
            //If no mission, return it to scout status
            if (this.isIdle()) this.targetLock=false;
            //AI:Attack insight enemy automatically when alive
            //If locking target
            if (this.targetLock) {
                // target ran out of attack range
                if (this.cannotReachTarget()) {
                    this.followEnemy();
                }
            }
            //If not lock target
            else {
                //Find in-range enemy by attack priority
                var enemy=this.highestPriorityTarget();
                //If not attacking but find in-range enemy
                if (!this.isAttacking() && enemy) {
                    this.attack(enemy);
                }
                //If target ran outside attack range
                if (this.cannotReachTarget()) {
                    //but find insight other enemy
                    if (enemy && this.target!=enemy) {
                        this.attack(enemy);
                    }
                    //No other enemy in sight
                    else {
                        this.followEnemy();
                    }
                }
            }
        },
        //Override
        reactionWhenAttackedBy:function(enemy,onlyDamage){
            //Resign and give reward to enemy if has no life before dead
            if (this.life<=0) {
                //If multiple target, only die once and give reward
                if (this.status!="dead") {
                    //Killed by enemy
                    this.die();
                    //Give enemy reward
                    enemy.kill++;
                }
                //Already dead, cannot take following actions
                return;
            }
            //AI when attacked by enemy
            if (!onlyDamage){
                if (this.attack && this.matchAttackLimit(enemy) && !enemy.isInvisible){
                    if (this.isIdle()) {
                        //Will hatred toward enemy
                        this.attack(enemy);
                    }
                    else if (!this.targetLock && this.target.target!==this){
                        //Will be attracted by higher hatred enemy
                        this.attack(enemy);
                    }
                }
                else {
                    if (this.isIdle()) this.escapeFrom(enemy);
                }
            }
        },
        isAttacking:function(){
            //Has target
            return (this.target instanceof Gobj);
        },
        followEnemy:function(){
            //Remind to attack again
            this.attack(this.target);
            //Filter out building target
            if (this.target instanceof Unit) this.tracing=true;
        },
        isTracing:function(){
            return this.isAttacking() && this.status=="moving";
        },
        isFiring:function(){
            //May out of range and cannot fire, don't follow when attack status
            return this.isAttacking() && this.status=="dock";
        },
        //Override
        isIdle:function(){
            //Not moving or attacking
            return !this.isAttacking() && this.status=="dock";
        },
        cannotReachTarget:function(){
            //Found target outside attack range after once firing, need follow once
            return this.isFiring() && !(this.isInAttackRange(this.target));
        },
        isMissingTarget:function(){
            //Lock on target has global sight, lock off (attackGround) use its own sight
            return !this.targetLock && this.isAttacking() && !(this.canSee(this.target));
        },
        isReloaded:function(){
            //Add for newly reloaded yamato, two kinds of bullet conflict, ignore bullet array
            if ((this.bullet instanceof Gobj) && this.bullet.status!='dead') return false;
            return this.coolDown;
        },
        //Override for attackable unit
        die:function(){
            //Old behavior
            Unit.prototype.die.call(this);
            //Recursion, if inherited will stack overflow
                //(this.inherited.die).call(this);
            //Clear new timer for unit
            this.stopAttack();
            this.selected=false;
        }
    }
});
//Attack type
AttackableUnit.NORMAL_ATTACK=0;
AttackableUnit.BURST_ATTACK=1;
AttackableUnit.WAVE_ATTACK=2;
//Dock action I, override
AttackableUnit.turnAround=function(){
    //Inherited dock from Unit.js
    Unit.prototype.dock.call(this);
    //Add in new things
    if (this.dockTimer) clearInterval(this.dockTimer);
    var myself=this;
    this.dockTimer=setInterval(function(){
        //Look around animation
        if (myself.isIdle()) {
            myself.turnTo((myself.direction+1)%8);//For all ground soldier to use
        }
        else {
            clearInterval(myself.dockTimer);
        }
    },2000);
};
//Dock action II, override
AttackableUnit.walkAround=function(){
    //Inherited dock from Unit.js
    Unit.prototype.dock.call(this);
    //Add in new things
    if (this.dockTimer) clearInterval(this.dockTimer);
    var myself=this;
    this.dockTimer=setInterval(function(){
        var direction=(Math.random()*8)>>0;//Math.floor
        //Walk around, for all critters to use
        if (myself.isIdle()) {
            myself.moveTo(myself.posX()+myself.get('speed')[direction].x*6,myself.posY()+myself.get('speed')[direction].y*6);
        }
        else {
            clearInterval(myself.dockTimer);
        }
    },2000);
};
//Dock action III, override
AttackableUnit.hover=function(){
    //Inherited dock from Unit.js
    Unit.prototype.dock.call(this);
    //Add in new things
    if (this.dockTimer) clearInterval(this.dockTimer);
    var myself=this;
    var N=0;
    var hoverOffset=1;
    this.dockTimer=setInterval(function(){
        //Hover animation
        if (myself.isIdle()) {
            myself.y+=hoverOffset;
            if (N%4==0) {
                //myself.turnTo((myself.direction+1)%8);//For marine to use
                hoverOffset=-hoverOffset;//Hover up and down
            }
        }
        else {
            clearInterval(myself.dockTimer);
        }
        N++;
    },200);
};