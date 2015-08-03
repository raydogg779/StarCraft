/******* Define Hero units *******/
var Hero={};
Hero.HeroCruiser=AttackableUnit.extends({
    constructorPlus:function(props){
        //Same action mapping
        this.imgPos.dock=this.imgPos.moving;
        this.frame.dock=this.frame.moving;
        //Override
        this.magic=this.get('MP');
    },
    prototypePlus: {
        //Add basic unit info
        name: "HeroCruiser",
        imgPos: {
            moving: {
                left: [0, 95, 195, 297, 0, 99, 201, 301],
                top: [81, 81, 81, 81, 0, 0, 0, 0]
            }
        },
        width: 94,
        height: 80,
        frame: {
            moving: 1,
            stop: 1
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(9),
        HP: 1000,
        damage: 50,
        armor:3,
        MP: 500,
        sight:385,
        attackRange: 250,
        attackInterval: 3000,
        portraitOffset: {x:240,y:168},
        dieEffect:Burst.BigExplode,
        isFlying:true,
        unitType:Unit.BIG,
        attackType:AttackableUnit.NORMAL_ATTACK,
        recover:function(){
            if (this.magic<this.get('MP')) {
                this.magic+=3;
                if (this.magic>this.get('MP')) this.magic=this.get('MP');
            }
        },
        items:{
            '6':{name:'Yamato'},
            '7':{name:'DefensiveMatrix'},
            '8':{name:'EMPShockwave'},
            '9':{name:'Irradiate'}
        },
        cost:{
            man:8
        },
        //Override
        dock:function(){
            //Use the same behavior
            Zerg.Devourer.prototype.dock.call(this);
        }
    }
});
Hero.Kerrigan=AttackableUnit.extends({
    constructorPlus:function(props){
        //Override
        this.magic=this.get('MP');
    },
    prototypePlus: {
        //Add basic unit info
        name: "Kerrigan",
        imgPos: {
            moving: {
                left: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [74, 74, 74, 74, 74, 74, 74, 74, 74],
                    [148, 148, 148, 148, 148, 148, 148, 148, 148],
                    [222, 222, 222, 222, 222, 222, 222, 222, 222],
                    [296, 296, 296, 296, 296, 296, 296, 296, 296],
                    [407, 407, 407, 407, 407, 407, 407, 407, 407],
                    [481, 481, 481, 481, 481, 481, 481, 481, 481],
                    [555, 555, 555, 555, 555, 555, 555, 555, 555]
                ],
                top: [
                    [0, 43, 86, 129, 172, 215, 258, 301, 344],
                    [0, 43, 86, 129, 172, 215, 258, 301, 344],
                    [0, 43, 86, 129, 172, 215, 258, 301, 344],
                    [0, 43, 86, 129, 172, 215, 258, 301, 344],
                    [0, 43, 86, 129, 172, 215, 258, 301, 344],
                    [0, 43, 86, 129, 172, 215, 258, 301, 344],
                    [0, 43, 86, 129, 172, 215, 258, 301, 344],
                    [0, 43, 86, 129, 172, 215, 258, 301, 344]
                ]
            },
            attack: {
                left: [
                    [0, 0, 0, 0],
                    [74, 74, 74, 74],
                    [148, 148, 148, 148],
                    [222, 222, 222, 222],
                    [296, 296, 296, 296],
                    [407, 407, 407, 407],
                    [481, 481, 481, 481],
                    [555, 555, 555, 555]
                ],
                top: [
                    [387, 430, 473, 516],
                    [387, 430, 473, 516],
                    [387, 430, 473, 516],
                    [387, 430, 473, 516],
                    [387, 430, 473, 516],
                    [387, 430, 473, 516],
                    [387, 430, 473, 516],
                    [387, 430, 473, 516]
                ]
            },
            dock: {
                left: [0, 74, 148, 222, 296, 407, 481, 555],
                top: [0, 0, 0, 0, 0, 0, 0, 0]
            }
        },
        width: 37,//(N-1)
        height: 43,//(N-1)
        frame: {
            moving: 9,
            dock: 1,
            attack:4
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(10),
        HP: 300,
        damage: 20,
        armor:1,
        MP: 300,
        sight:315,
        attackRange: 210,
        attackInterval: 2200,
        portraitOffset: {x:540,y:168},
        dieEffect:Burst.HumanDeath,
        attackEffect:Burst.FireSpark,
        isFlying:false,
        unitType:Unit.SMALL,
        attackType:AttackableUnit.WAVE_ATTACK,
        recover:function(){
            if (this.magic<this.get('MP')) {
                this.magic+=2;
                if (this.magic>this.get('MP')) this.magic=this.get('MP');
            }
        },
        cost:{
            man:1
        },
        items:{
            '6':{name:'StimPacks'},
            '7':{name:'Cloak'},
            '8':{name:'Lockdown'}
        },
        //Override
        dock:function(){
            //Use the same behavior
            AttackableUnit.turnAround.call(this);
        }
    }
});
Hero.Sarah=AttackableUnit.extends({
    constructorPlus:function(props){
        //Override
        this.magic=this.get('MP');
    },
    prototypePlus: {
        //Add basic unit info
        name: "Sarah",
        imgPos: {
            moving: {
                left: [
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [124, 124, 124, 124, 124, 124, 124, 124],
                    [248, 248, 248, 248, 248, 248, 248, 248],
                    [372, 372, 372, 372, 372, 372, 372, 372],
                    [496, 496, 496, 496, 496, 496, 496, 496],
                    [682, 682, 682, 682, 682, 682, 682, 682],
                    [806, 806, 806, 806, 806, 806, 806, 806],
                    [930, 930, 930, 930, 930, 930, 930, 930]
                ],
                top: [
                    [0, 58, 116, 174, 232, 290, 348, 406],
                    [0, 58, 116, 174, 232, 290, 348, 406],
                    [0, 58, 116, 174, 232, 290, 348, 406],
                    [0, 58, 116, 174, 232, 290, 348, 406],
                    [0, 58, 116, 174, 232, 290, 348, 406],
                    [0, 58, 116, 174, 232, 290, 348, 406],
                    [0, 58, 116, 174, 232, 290, 348, 406],
                    [0, 58, 116, 174, 232, 290, 348, 406]
                ]
            },
            attack: {
                left: [
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [124, 124, 124, 124, 124, 124, 124, 124],
                    [248, 248, 248, 248, 248, 248, 248, 248],
                    [372, 372, 372, 372, 372, 372, 372, 372],
                    [496, 496, 496, 496, 496, 496, 496, 496],
                    [682, 682, 682, 682, 682, 682, 682, 682],
                    [806, 806, 806, 806, 806, 806, 806, 806],
                    [930, 930, 930, 930, 930, 930, 930, 930]
                ],
                top: [
                    [464, 522, 580, 638, 696, 754, 812, 870],
                    [464, 522, 580, 638, 696, 754, 812, 870],
                    [464, 522, 580, 638, 696, 754, 812, 870],
                    [464, 522, 580, 638, 696, 754, 812, 870],
                    [464, 522, 580, 638, 696, 754, 812, 870],
                    [464, 522, 580, 638, 696, 754, 812, 870],
                    [464, 522, 580, 638, 696, 754, 812, 870],
                    [464, 522, 580, 638, 696, 754, 812, 870]
                ]
            },
            dock: {
                left: [0, 124, 248, 372, 496, 682, 806, 930],
                top: [0, 0, 0, 0, 0, 0, 0, 0]
            }
        },
        width: 62,//(N-1)
        height: 58,//(N-1)
        frame: {
            moving: 8,
            dock: 1,
            attack: 8
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(10),
        HP: 500,
        SP: 500,
        damage: 40,
        armor:2,
        plasma:0,
        MP: 500,
        sight:315,
        attackRange: 70,
        attackInterval: 2000,
        portraitOffset: {x:120,y:168},
        dieEffect:Burst.HumanDeath,
        attackEffect:Burst.FireSpark,
        isFlying:false,
        unitType:Unit.SMALL,
        attackType:AttackableUnit.NORMAL_ATTACK,
        recover:function(){
            if (this.life<this.get('HP')) {
                this.life+=3;
                if (this.life>this.get('HP')) this.life=this.get('HP');
            }
            if (this.shield<this.get('SP')) {
                this.shield+=3;
                if (this.shield>this.get('SP')) this.shield=this.get('SP');
            }
            if (this.magic<this.get('MP')) {
                this.magic+=3;
                if (this.magic>this.get('MP')) this.magic=this.get('MP');
            }
        },
        cost:{
            man:2
        },
        items:{
            '6':{name:'Cloak'},
            '7':{name:'PsionicStorm'},
            '8':{name:'Plague'},
            '9':{name:'Ensnare'}
        },
        //Override
        dock:function(){
            //Use the same behavior
            AttackableUnit.turnAround.call(this);
        }
    }
});
//Post-operation for all unit types, prepare basic properties for different team numbers, init in level.js
//Only for unit, no plan for building upgrade yet
_$.traverse([Zerg,Terran,Protoss,Neutral,Hero],function(unitType){
    ['HP','SP','MP','damage','armor','speed','attackRange','attackInterval','plasma','sight'].forEach(function(prop){
        //Prop array, first one for us, second for enemy
        if (unitType.prototype[prop]!=undefined) {
            unitType.prototype[prop]=[unitType.prototype[prop],unitType.prototype[prop]];
            unitType.prototype[prop].shareFlag=true;
        }
    });
    if (unitType.prototype.attackMode) {
        ['damage','attackRange','attackInterval'].forEach(function(prop){
            //Prop array, first one for us, second for enemy
            unitType.prototype.attackMode.flying[prop]=
                [unitType.prototype.attackMode.flying[prop],unitType.prototype.attackMode.flying[prop]];
            unitType.prototype.attackMode.flying[prop].shareFlag=true;
            unitType.prototype.attackMode.ground[prop]=
                [unitType.prototype.attackMode.ground[prop],unitType.prototype.attackMode.ground[prop]];
            unitType.prototype.attackMode.ground[prop].shareFlag=true;
        });
    }
    //Will enrich isEnemy to teamNum, case teamNum>=1&&teamNum<=8, set
    unitType.upgrade=function(prop,value,isEnemy){
        switch (isEnemy){
            case false:
                eval('unitType.prototype.'+prop)[0]=value;//unitType.prototype[prop][0]
                break;
            case true:
                eval('unitType.prototype.'+prop)[1]=value;
                break;
            case undefined:
                unitType.prototype[prop]=value;//Bug:Cannot use eval=
                break;
        }
    };
});
Protoss.Carrier.prototype.interceptorCapacity=
    [Protoss.Carrier.prototype.interceptorCapacity,Protoss.Carrier.prototype.interceptorCapacity];
Protoss.Carrier.prototype.interceptorCapacity.shareFlag=true;
Protoss.Reaver.prototype.scarabCapacity=
    [Protoss.Reaver.prototype.scarabCapacity,Protoss.Reaver.prototype.scarabCapacity];
Protoss.Reaver.prototype.scarabCapacity.shareFlag=true;
