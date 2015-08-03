var Referee={
    ourDetectedUnits:[],//Detected enemies
    enemyDetectedUnits:[],//Detected ours
    _pos:[[-1,0],[1,0],[0,-1],[0,1]],//Collision avoid
    voice:{
        pError:new Audio('bgm/PointError.wav'),
        button:new Audio('bgm/button.wav'),
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
    judgeDetect:function(){
        var ourDetectors=Unit.allOurUnits().concat(Building.ourBuildings).filter(function(chara){
            return chara.detector;
        });
        var enemyDetectors=Unit.allEnemyUnits().concat(Building.enemyBuildings).filter(function(chara){
            return chara.detector;
        });
        //Our detectors detect enemies
        var ourDetectedResults=Unit.allEnemyUnits().filter(function(chara){
            //Filter invisible units
            if (chara.isInvisible==null) return false;
            //Detect by all detectors
            for (var N in ourDetectors) {
                if (chara.insideCircle({centerX:ourDetectors[N].posX(),centerY:ourDetectors[N].posY(),radius:ourDetectors[N].get('sight')})){
                    return true;
                }
            }
            //Not detected by all detectors
            return false;
        });
        //Enemy detectors detect ours
        var enemyDetectedResults=Unit.allOurUnits().filter(function(chara){
            //Filter invisible units
            if (chara.isInvisible==undefined) return false;
            //Detect by all detectors
            for (var N in enemyDetectors) {
                if (chara.insideCircle({centerX:enemyDetectors[N].posX(),centerY:enemyDetectors[N].posY(),radius:enemyDetectors[N].get('sight')})){
                    return true;
                }
            }
            //Not detected by all detectors
            return false;
        });
        //Restore
        Referee.ourDetectedUnits.forEach(function(chara){
            //If doesn't detect anymore
            if (ourDetectedResults.indexOf(chara)==-1) {
                chara.isInvisible=true;
                chara.selected=false;
                if (Game.selectedUnit==chara) Game.changeSelectedTo({});
            }
        });
        Referee.enemyDetectedUnits.forEach(function(chara){
            //If doesn't detect anymore
            if (enemyDetectedResults.indexOf(chara)==-1) {
                chara.isInvisible=true;
            }
        });
        //Detect
        ourDetectedResults.forEach(function(chara){
            chara.isInvisible=false;
        });
        enemyDetectedResults.forEach(function(chara){
            chara.isInvisible=false;
        });
        //Update detected
        Referee.ourDetectedUnits=ourDetectedResults;
        Referee.enemyDetectedUnits=enemyDetectedResults;
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
            if (chara.status=='dead') Game.allSelected.splice(Game.allSelected.indexOf(chara),1);
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