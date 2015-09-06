var Referee={
    ourDetectedUnits:[],//Detected enemies
    enemyDetectedUnits:[],//Detected ours
    ourUnderArbiterUnits:[],
    enemyUnderArbiterUnits:[],
    _pos:[[-1,0],[1,0],[0,-1],[0,1]],//Collision avoid
    voice:{
        pError:new Audio('bgm/PointError.wav'),
        button:new Audio('bgm/Button.wav'),
        resource:{
            Zerg:{
                mine:new Audio('bgm/mine.Zerg.wav'),
                gas:new Audio('bgm/gas.Zerg.wav'),
                man:new Audio('bgm/man.Zerg.wav'),
                magic:new Audio('bgm/magic.Zerg.wav')
            },
            Terran:{
                mine:new Audio('bgm/mine.Terran.wav'),
                gas:new Audio('bgm/gas.Terran.wav'),
                man:new Audio('bgm/man.Terran.wav'),
                magic:new Audio('bgm/magic.Terran.wav')
            },
            Protoss:{
                mine:new Audio('bgm/mine.Protoss.wav'),
                gas:new Audio('bgm/gas.Protoss.wav'),
                man:new Audio('bgm/man.Protoss.wav'),
                magic:new Audio('bgm/magic.Protoss.wav')
            }
        },
        upgrade:{
            Zerg:new Audio('bgm/upgrade.Zerg.wav'),
            Terran:new Audio('bgm/upgrade.Terran.wav'),
            Protoss:new Audio('bgm/upgrade.Protoss.wav')
        }
    },
    winCondition:function(){
        //By default: All our units and buildings are killed
        return (Unit.allEnemyUnits().length==0 && Building.enemyBuildings.length==0);
    },
    loseCondition:function(){
        //By default: All enemies and buildings are killed
        return (Unit.allOurUnits().length==0 && Building.ourBuildings.length==0);
    },
    judgeArbiter:function(){
        //Every 0.4 sec
        if (Game._clock%4==0){
            //Same Arbiter buffer reference
            var arbiterBuffer=Protoss.Arbiter.prototype.bufferObj;
            var myArbiters=Unit.ourFlyingUnits.filter(function(chara){
                return chara.name=="Arbiter";
            });
            var enemyArbiters=Unit.enemyFlyingUnits.filter(function(chara){
                return chara.name=="Arbiter";
            });
            //Clear old units' Arbiter buffer
            Referee.ourUnderArbiterUnits.concat(Referee.enemyUnderArbiterUnits).forEach(function(chara){
                chara.removeBuffer(arbiterBuffer);
            });
            Referee.ourUnderArbiterUnits=[];
            Referee.enemyUnderArbiterUnits=[];
            //Find new under arbiter units
            myArbiters.forEach(function(arbiter){
                //Find targets: our units inside Arbiter sight, not including Arbiter
                var targets=Game.getInRangeOnes(arbiter.posX(),arbiter.posY(),arbiter.get('sight'),false,true,null,function(chara){
                    return myArbiters.indexOf(chara)==-1;
                });
                Referee.ourUnderArbiterUnits=Referee.ourUnderArbiterUnits.concat(targets);
            });
            $.unique(Referee.ourUnderArbiterUnits);
            enemyArbiters.forEach(function(arbiter){
                //Find targets: enemy units inside Arbiter sight
                var targets=Game.getInRangeOnes(arbiter.posX(),arbiter.posY(),arbiter.get('sight'),true,true,null,function(chara){
                    return enemyArbiters.indexOf(chara)==-1;
                });
                Referee.enemyUnderArbiterUnits=Referee.enemyUnderArbiterUnits.concat(targets);
            });
            $.unique(Referee.enemyUnderArbiterUnits);
            //Arbiter buffer effect on these units
            Referee.ourUnderArbiterUnits.concat(Referee.enemyUnderArbiterUnits).forEach(function(chara){
                chara.addBuffer(arbiterBuffer);
            });
        }
    },
    //detectorBuffer are reverse of arbiterBuffer
    judgeDetect:function(){
        //Every 0.4 sec
        if (Game._clock%4==0){
            //Same detector buffer reference
            var detectorBuffer=Gobj.detectorBuffer;
            var ourDetectors=Unit.allOurUnits().concat(Building.ourBuildings).filter(function(chara){
                return chara.detector;
            });
            var enemyDetectors=Unit.allEnemyUnits().concat(Building.enemyBuildings).filter(function(chara){
                return chara.detector;
            });
            //Clear old units detected buffer
            Referee.ourDetectedUnits.concat(Referee.enemyDetectedUnits).forEach(function(chara){
                chara.removeBuffer(detectorBuffer);
            });
            Referee.ourDetectedUnits=[];
            Referee.enemyDetectedUnits=[];
            //Find new under arbiter units
            ourDetectors.forEach(function(detector){
                //Find targets: enemy invisible units inside my detector sight
                var targets=Game.getInRangeOnes(detector.posX(),detector.posY(),detector.get('sight'),true,true,null,function(chara){
                    return chara.isInvisible;
                });
                Referee.ourDetectedUnits=Referee.ourDetectedUnits.concat(targets);
            });
            $.unique(Referee.ourDetectedUnits);
            enemyDetectors.forEach(function(detector){
                //Find targets: our invisible units inside enemy detector sight
                var targets=Game.getInRangeOnes(detector.posX(),detector.posY(),detector.get('sight'),false,true,null,function(chara){
                    return chara.isInvisible;
                });
                Referee.enemyDetectedUnits=Referee.enemyDetectedUnits.concat(targets);
            });
            $.unique(Referee.enemyDetectedUnits);
            //Detector buffer effect on these units
            Referee.ourDetectedUnits.concat(Referee.enemyDetectedUnits).forEach(function(chara){
                chara.addBuffer(detectorBuffer);
            });
        }
    },
    judgeReachDestination:function(chara){
        //Idle but has destination
        if (chara.isIdle() && chara.destination) {
            //Already here
            if (chara.insideSquare({centerX:chara.destination.x,centerY:chara.destination.y,radius:Unit.moveRange})) {
                //Has next destination
                if (chara.destination.next) {
                    chara.destination=chara.destination.next;
                    chara.moveTo(chara.destination.x,chara.destination.y);
                    chara.targetLock=false;
                }
                //No more destination
                else {
                    delete chara.destination;
                }
            }
            //Continue moving
            else {
                chara.moveTo(chara.destination.x,chara.destination.y);
                chara.targetLock=false;
            }
        }
    },
    judgeRecover:function(){
        //Every 1 sec
        if (Game._clock%10==0){
            Unit.allUnits.concat(Building.allBuildings).forEach(function(chara){
                if (chara.recover) chara.recover();
            });
        }
    },
    judgeDying:function(){
        //Kill die survivor every 1 sec
        if (Game._clock%10==0){
            Unit.allUnits.concat(Building.allBuildings).filter(function(chara){
                return chara.life<=0 && chara.status!='dead';
            }).forEach(function(chara){
                chara.die();
            });
        }
    },
    //Avoid collision
    judgeCollision:function(){
        //N*N->N
        var units=Unit.allGroundUnits().concat(Building.allBuildings);
        for(var N=0;N<units.length;N++) {
            var chara1 = units[N];
            for(var M=N+1;M<units.length;M++) {
                var chara2 = units[M];
                var dist=chara1.distanceFrom(chara2);
                //Ground unit collision limit
                var distLimit;
                if (chara2 instanceof Unit){
                    distLimit=(chara1.radius()+chara2.radius())*0.5;
                    if (distLimit<Unit.meleeRange) distLimit=Unit.meleeRange;//Math.max
                }
                //Collision with Building
                else{
                    distLimit=(chara1.radius()+chara2.radius())*0.8;
                }
                //Separate override ones
                if (dist==0) {
                    var colPos=Referee._pos[Math.random()*4>>0];
                    if (chara1 instanceof Unit){
                        chara1.x+=colPos[0];
                        chara1.y+=colPos[1];
                        dist=1;
                    }
                    else {
                        if (chara2 instanceof Unit){
                            chara2.x+=colPos[0];
                            chara2.y+=colPos[1];
                            dist=1;
                        }
                    }
                }
                if (dist<distLimit) {
                    //Collision flag
                    chara1.collision=chara2;
                    chara2.collision=chara1;
                    //Adjust ratio
                    var K=(distLimit-dist)/dist/2;
                    var adjustX=K*(chara1.x-chara2.x)>>0;
                    var adjustY=K*(chara1.y-chara2.y)>>0;
                    //Adjust location
                    var interactRatio1=0;
                    var interactRatio2=0;
                    if (chara1 instanceof Building){
                        interactRatio1=0;
                        //Building VS Unit
                        if (chara2 instanceof Unit) interactRatio2=2;
                        //Building VS Building
                        else interactRatio2=0;
                    }
                    else {
                        //Unit VS Unit
                        if (chara2 instanceof Unit) {
                            if (chara1.status=="moving"){
                                //Move VS Move
                                if (chara2.status=="moving"){
                                    interactRatio1=1;
                                    interactRatio2=1;
                                }
                                //Move VS Dock
                                else {
                                    interactRatio1=2;
                                    interactRatio2=0;
                                }
                            }
                            else {
                                //Dock VS Move
                                if (chara2.status=="moving"){
                                    interactRatio1=0;
                                    interactRatio2=2;
                                }
                                //Dock VS Dock
                                else {
                                    interactRatio1=1;
                                    interactRatio2=1;
                                }
                            }
                        }
                        //Unit VS Building
                        else {
                            interactRatio1=2;
                            interactRatio2=0;
                        }
                    }
                    chara1.x+=interactRatio1*adjustX;
                    chara1.y+=interactRatio1*adjustY;
                    chara2.x-=interactRatio2*adjustX;
                    chara2.y-=interactRatio2*adjustY;
                }
            }
        }
        units=Unit.allFlyingUnits();
        for(var N=0;N<units.length;N++) {
            var chara1 = units[N];
            for(var M=N+1;M<units.length;M++) {
                var chara2 = units[M];
                var dist=chara1.distanceFrom(chara2);
                //Flying unit collision limit
                var distLimit=Unit.meleeRange;
                //Separate override ones
                if (dist==0) {
                    var colPos=Referee._pos[Math.random()*4>>0];
                    chara1.x+=colPos[0];
                    chara1.y+=colPos[1];
                    dist=1;
                }
                if (dist<distLimit) {
                    //Adjust ratio
                    var K=(distLimit-dist)/dist/2;
                    var adjustX=K*(chara1.x-chara2.x)>>0;
                    var adjustY=K*(chara1.y-chara2.y)>>0;
                    //Adjust location
                    chara1.x+=adjustX;
                    chara1.y+=adjustY;
                    chara2.x-=adjustX;
                    chara2.y-=adjustY;
                }
            }
        }
    },
    monitorMiniMap:function(){
        //Every 1 sec
        if (Game._clock%10==0){
            Map.refreshMiniMap();
        }
    },
    coverFog:function(){
        /*//Every 1 sec
        if (Game._clock%10==0){
            Map.drawFog();
        }*/
        Map.drawFog();
    },
    alterSelectionMode:function(){
        //GC after some user changes
        $.extend([],Game.allSelected).forEach(function(chara){
            if (chara.status=='dead' || (chara.isInvisible && chara.isEnemy))
                Game.allSelected.splice(Game.allSelected.indexOf(chara),1);
        });
        //Alter info UI: Multi selection mode
        if (Game.allSelected.length>1){
            //Need minor refresh or big move
            if (_$.arrayEqual(Game.allSelected,Game._oldAllSelected)){
                //Only refresh
                Game.refreshMultiSelectBox();
            }
            else {
                //Redraw multiSelection div
                Game.drawMultiSelectBox();
                //Record this operation
                Game._oldAllSelected=_$.mixin([],Game.allSelected);
            }
            //Show multiSelection box
            $('div.override').show();
            $('div.override div.multiSelection').show();
        }
        //Alter info UI: Single selection mode
        else {
            $('div.override').hide();
            $('div.override div.multiSelection').hide();
        }
    },
    addLarva:function(){
        //Every 20 sec
        if (Game._clock%200==0){
            Building.allBuildings.filter(function(chara){
                return chara.produceLarva;
            }).forEach(function(chara){
                //Can give birth to 3 larvas
                for(var N=0;N<3;N++){
                    if (chara.larvas[N]==null || chara.larvas[N].status=="dead"){
                        chara.larvas[N]=new Zerg.Larva({x:(chara.x+N*48),y:(chara.y+chara.height),isEnemy:chara.isEnemy});
                        break;
                    }
                }
            });
        }
    },
    judgeMan:function(){
        //Update our current man and total man
        var curMan=0,totalMan=0;
        Unit.allOurUnits().concat(Building.ourBuildings).forEach(function(chara){
            if (chara.cost && chara.cost.man) curMan+=chara.cost.man;
            if (chara.manPlus) totalMan+=chara.manPlus;
        });
        Resource[0].curMan=curMan;
        Resource[0].totalMan=totalMan;
        //Update enemy current man and total man
        curMan=0;
        totalMan=0;
        Unit.allEnemyUnits().concat(Building.enemyBuildings).forEach(function(chara){
            if (chara.cost) curMan+=chara.cost.man;
            if (chara.manPlus) totalMan+=chara.manPlus;
        });
        Resource[1].curMan=curMan;
        Resource[1].totalMan=totalMan;
    },
    judgeWinLose:function(){
        if (Referee.loseCondition())
            Game.lose();
        if (Referee.winCondition())
            Game.win();
    }
};