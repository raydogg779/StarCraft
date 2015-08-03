var Cheat={
    isShown:false,
    cwal:false,
    gathering:false,
    handler:function(){
        if (Cheat.isShown){
            var cheatFlag=true;
            switch ($('input#cheatInput').val().toLowerCase()){
                case "show me the money":
                    Resource[0].mine+=10000;
                    Resource[0].gas+=10000;
                    break;
                case "black sheep wall":
                    //Switch between show fog or not show
                    Map.fogFlag=!Map.fogFlag;
                    break;
                case "something for nothing":
                    //Upgrade all grades
                    for (var grade in Upgrade){
                        Upgrade[grade].effect();
                    }
                    break;
                case "full recovery":
                    Unit.allOurUnits().concat(Building.ourBuildings).forEach(function(chara){
                        chara.life=chara.get('HP');
                        if (chara.SP) chara.shield=chara.get('SP');
                        if (chara.MP) chara.magic=chara.get('MP');
                    });
                    break;
                case "staying alive":
                    Referee.winCondition=Referee.loseCondition=function(){
                        return false;
                    };
                    break;
                case "operation cwal":
                    Cheat.cwal=!(Cheat.cwal);
                    break;
                case "the gathering":
                    Cheat.gathering=!(Cheat.gathering);
                    break;
                case "big daddy":
                    var daddy=new Hero.HeroCruiser({x:Map.offsetX+Game.HBOUND/2,y:Map.offsetY+Game.VBOUND/2});
                    Game.changeSelectedTo(daddy);
                    break;
                case "big mommy":
                    var mommy=new Hero.Sarah({x:Map.offsetX+Game.HBOUND/2,y:Map.offsetY+Game.VBOUND/2});
                    Game.changeSelectedTo(mommy);
                    break;
                case "game over man":
                case "gg":
                    Game.lose();
                    break;
                case "there is no cow level":
                case "your gg":
                    Game.win();
                    break;
                case "fuck your mother":
                    Unit.allEnemyUnits().concat(Building.enemyBuildings).forEach(function(chara){
                        chara.die();
                    });
                    break;
                case "fuck my asshole":
                    Unit.allOurUnits().concat(Building.ourBuildings).forEach(function(chara){
                        chara.die();
                    });
                    break;
                case "liuda is god":
                    Referee.winCondition=Referee.loseCondition=function(){
                        return false;
                    };
                    Unit.allUnits.concat(Building.allBuildings).forEach(function(chara){
                        chara.die();
                    });
                    break;
                default:
                    //Not match any of above cheating code
                    cheatFlag=false;
                    break;
            }
            $('#cheat_Box').hide();
            $('input#cheatInput').val('');
            if (cheatFlag) {
                //Refresh control panel
                Game.changeSelectedTo(Game.selectedUnit);
                Game.showMessage('Cheat enabled');
            }
            Cheat.isShown=false;
            keyController.disable=false;
        }
        else {
            $('#cheat_Box').show();
            $('input#cheatInput').focus();
            Cheat.isShown=true;
            keyController.disable=true;
        }
    }
};
