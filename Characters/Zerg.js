/******* Define Zerg units *******/
var Zerg={};
Zerg.Drone=AttackableUnit.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus: {
        //Add basic unit info
        name: "Drone",
        imgPos: {
            moving: {
                left: [
                    [36, 36, 36],
                    [292, 292, 292],
                    [548, 548, 548],
                    [804, 804, 804],
                    [1060, 1060, 1060],
                    [1444, 1444, 1444],
                    [1700, 1700, 1700],
                    [1956, 1956, 1956]
                ],
                top: [
                    [36, 164, 292],
                    [36, 164, 292],
                    [36, 164, 292],
                    [36, 164, 292],
                    [36, 164, 292],
                    [36, 164, 292],
                    [36, 164, 292],
                    [36, 164, 292]
                ]
            },
            attack: {
                left: [
                    [36, 36, 36, 36, 36, 36, 36],
                    [292, 292, 292, 292, 292, 292, 292],
                    [548, 548, 548, 548, 548, 548, 548],
                    [804, 804, 804, 804, 804, 804, 804],
                    [1060, 1060, 1060, 1060, 1060, 1060, 1060],
                    [1444, 1444, 1444, 1444, 1444, 1444, 1444],
                    [1700, 1700, 1700, 1700, 1700, 1700, 1700],
                    [1956, 1956, 1956, 1956, 1956, 1956, 1956]
                ],
                top: [
                    [420, 548, 676, 804, 932, 1060, 1188],
                    [420, 548, 676, 804, 932, 1060, 1188],
                    [420, 548, 676, 804, 932, 1060, 1188],
                    [420, 548, 676, 804, 932, 1060, 1188],
                    [420, 548, 676, 804, 932, 1060, 1188],
                    [420, 548, 676, 804, 932, 1060, 1188],
                    [420, 548, 676, 804, 932, 1060, 1188],
                    [420, 548, 676, 804, 932, 1060, 1188]
                ]
            },
            dock: {
                left: [36, 292, 548, 804, 1060, 1444, 1700, 1956],
                top: [36, 36, 36, 36, 36, 36, 36, 36]
            }
        },
        width: 56,
        height: 56,//128N-92
        frame: {
            moving: 3,
            dock: 1,
            attack:7
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(12),
        HP: 40,
        damage: 5,
        armor:0,
        sight:245,
        meleeAttack: true,
        attackInterval: 2200,
        portraitOffset: {x:0,y:0},
        dieEffect:Burst.DroneDeath,
        isFlying:false,
        attackLimit:"ground",
        unitType:Unit.SMALL,
        attackType:AttackableUnit.NORMAL_ATTACK,
        recover:Building.ZergBuilding.prototype.recover,
        cost:{
            mine:50,
            man:1,
            time:200
        },
        upgrade:['EvolveCarapace'],
        items:{'4':null,
            '5':{name:'gather'},
            '7':{name:'BasicMutation'},
            '8':{name:'AdvancedMutation'},
            '9':{name:'Burrow',condition:function(){
                return Magic.Burrow.enabled
            }}
        }
    }
});
Zerg.Zergling=AttackableUnit.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus: {
        //Add basic unit info
        name: "Zergling",
        imgPos: {
            moving: {
                left: [
                    [0, 0, 0, 0, 0, 0, 0],
                    [86, 86, 86, 86, 86, 86, 86],
                    [172, 172, 172, 172, 172, 172, 172],
                    [258, 258, 258, 258, 258, 258, 258],
                    [344, 344, 344, 344, 344, 344, 344],
                    [473, 473, 473, 473, 473, 473, 473],
                    [559, 559, 559, 559, 559, 559, 559],
                    [645, 645, 645, 645, 645, 645, 645]
                ],
                top: [
                    [0, 42, 84, 126, 168, 210, 252],
                    [0, 42, 84, 126, 168, 210, 252],
                    [0, 42, 84, 126, 168, 210, 252],
                    [0, 42, 84, 126, 168, 210, 252],
                    [0, 42, 84, 126, 168, 210, 252],
                    [0, 42, 84, 126, 168, 210, 252],
                    [0, 42, 84, 126, 168, 210, 252],
                    [0, 42, 84, 126, 168, 210, 252]
                ]
            },
            dock: {
                left: [0, 86, 172, 258, 344, 473, 559, 645],
                top: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            attack: {
                left: [
                    [0, 0, 0, 0, 0],
                    [86, 86, 86, 86, 86],
                    [172, 172, 172, 172, 172],
                    [258, 258, 258, 258, 258],
                    [344, 344, 344, 344, 344],
                    [473, 473, 473, 473, 473],
                    [559, 559, 559, 559, 559],
                    [645, 645, 645, 645, 645]
                ],
                top: [
                    [294, 336, 378, 420, 462],
                    [294, 336, 378, 420, 462],
                    [294, 336, 378, 420, 462],
                    [294, 336, 378, 420, 462],
                    [294, 336, 378, 420, 462],
                    [294, 336, 378, 420, 462],
                    [294, 336, 378, 420, 462],
                    [294, 336, 378, 420, 462]
                ]
            }
        },
        width: 43,//43N-43
        height: 42,//42N-42
        frame: {
            moving: 7,
            dock: 1,
            attack: 5
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(13),
        HP: 35,
        damage: 5,
        armor:0,
        sight:175,
        meleeAttack: true,
        attackInterval: 800,
        portraitOffset: {x:60,y:0},
        dieEffect:Burst.ZerglingDeath,
        isFlying:false,
        attackLimit:"ground",
        unitType:Unit.SMALL,
        attackType:AttackableUnit.NORMAL_ATTACK,
        recover:Building.ZergBuilding.prototype.recover,
        cost:{
            mine:25,
            man:0.5,
            time:140
        },
        upgrade:['UpgradeMeleeAttacks','EvolveCarapace'],
        items:{
            '9':{name:'Burrow',condition:function(){
                return Magic.Burrow.enabled
            }}
        }
    }
});
Zerg.Overlord=Unit.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus: {
        //Add basic unit info
        name: "Overlord",
        imgPos: {
            moving: {
                left: [
                    [8, 8, 92, 92, 174, 174, 260, 260],
                    [8, 8, 92, 92, 174, 174, 260, 260],
                    [8, 8, 92, 92, 174, 174, 260, 260],
                    [8, 8, 92, 92, 174, 174, 260, 260],
                    [8, 8, 92, 92, 174, 174, 260, 260],
                    [620, 620, 536, 536, 450, 450, 366, 366],
                    [620, 620, 536, 536, 450, 450, 366, 366],
                    [620, 620, 536, 536, 450, 450, 366, 366]
                ],
                top: [
                    [12, 12, 12, 12, 12, 12, 12, 12],
                    [180, 180, 180, 180, 180, 180, 180, 180],
                    [344, 344, 344, 344, 344, 344, 428, 428],
                    [508, 508, 508, 508, 508, 508, 508, 508],
                    [676, 676, 676, 676, 676, 676, 676, 676],
                    [508, 508, 508, 508, 508, 508, 508, 508],
                    [344, 344, 344, 344, 344, 344, 428, 428],
                    [180, 180, 180, 180, 180, 180, 180, 180]
                ]
            },
            dock: {
                left: [8, 8, 8, 8, 8, 620, 620, 620],
                top: [12, 180, 344, 508, 676, 508, 344, 180]
            }
        },
        width: 68,
        height: 72,
        frame: {
            moving: 8,
            dock: 1
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(2),
        HP: 200,
        armor:0,
        sight:315,
        portraitOffset: {x:120,y:0},
        dieEffect:Burst.BigZergDeath,
        isFlying:true,
        unitType:Unit.BIG,
        detector:Gobj.detectorBuffer,
        recover:Building.ZergBuilding.prototype.recover,
        cost:{
            mine:100,
            time:400
        },
        upgrade:['UpgradeFlyerCarapace'],
        manPlus:8,
        items:{
            '8':{name:'Load',condition:function(){
                return Magic.Load.enabled
            }}
        },
        //Override
        dock:function(){
            //Use the same behavior
            Unit.hover.call(this);
        }
    }
});
Zerg.Hydralisk=AttackableUnit.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus: {
        //Add basic unit info
        name: "Hydralisk",
        imgPos: {
            moving: {
                left: [
                    [0, 0, 0, 0, 0, 0, 0],
                    [90, 90, 90, 90, 90, 90, 90],
                    [180, 180, 180, 180, 180, 180, 180],
                    [270, 270, 270, 270, 270, 270, 270],
                    [360, 360, 360, 360, 360, 360, 360],
                    [495, 495, 495, 495, 495, 495, 495],
                    [585, 585, 585, 585, 585, 585, 585],
                    [675, 675, 675, 675, 675, 675, 675]
                ],
                top: [
                    [0, 58, 116, 174, 232, 290, 348],
                    [0, 58, 116, 174, 232, 290, 348],
                    [0, 58, 116, 174, 232, 290, 348],
                    [0, 58, 116, 174, 232, 290, 348],
                    [0, 58, 116, 174, 232, 290, 348],
                    [0, 58, 116, 174, 232, 290, 348],
                    [0, 58, 116, 174, 232, 290, 348],
                    [0, 58, 116, 174, 232, 290, 348]
                ]
            },
            dock: {
                left: [0, 90, 180, 270, 360, 495, 585, 675],
                top: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            attack: {
                left: [
                    [0, 0, 0, 0, 0],
                    [90, 90, 90, 90, 90],
                    [180, 180, 180, 180, 180],
                    [270, 270, 270, 270, 270],
                    [360, 360, 360, 360, 360],
                    [495, 495, 495, 495, 495],
                    [585, 585, 585, 585, 585],
                    [675, 675, 675, 675, 675]
                ],
                top: [
                    [406, 464, 522, 580, 638],
                    [406, 464, 522, 580, 638],
                    [406, 464, 522, 580, 638],
                    [406, 464, 522, 580, 638],
                    [406, 464, 522, 580, 638],
                    [406, 464, 522, 580, 638],
                    [406, 464, 522, 580, 638],
                    [406, 464, 522, 580, 638]
                ]
            }
        },
        width: 45,//45(N-1)
        height: 58,//58(N-1)
        frame: {
            moving: 7,
            dock: 1,
            attack: 5
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(9),
        HP: 80,
        damage: 10,
        armor:0,
        sight:210,
        attackRange: 140,
        attackInterval: 1500,
        portraitOffset: {x:180,y:0},
        dieEffect:Burst.HydraliskDeath,
        isFlying:false,
        unitType:Unit.MIDDLE,
        attackType:AttackableUnit.BURST_ATTACK,
        recover:Building.ZergBuilding.prototype.recover,
        cost:{
            mine:75,
            gas:25,
            man:1,
            time:280
        },
        upgrade:['UpgradeMissileAttacks','EvolveCarapace'],
        items:{
            '7':{name:'Lurker',condition:function(){
                return Magic.Lurker.enabled
            }},
            '9':{name:'Burrow',condition:function(){
                return Magic.Burrow.enabled
            }}
        },
        //Override
        dock:function(){
            //Use the same behavior
            AttackableUnit.turnAround.call(this);
        }
    }
});
Zerg.Lurker=AttackableUnit.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus: {
        //Add basic unit info
        name: "Lurker",
        imgPos: {
            moving: {
                left: [
                    [0, 0, 0, 0, 0, 0, 0],
                    [144, 144, 144, 144, 144, 144, 144],
                    [288, 288, 288, 288, 288, 288, 288],
                    [432, 432, 432, 432, 432, 432, 432],
                    [576, 576, 576, 576, 576, 576, 576],
                    [792, 792, 792, 792, 792, 792, 792],
                    [936, 936, 936, 936, 936, 936, 936],
                    [1080, 1080, 1080, 1080, 1080, 1080, 1080]
                ],
                top: [
                    [1, 68, 135, 202, 269, 336, 403],
                    [1, 68, 135, 202, 269, 336, 403],
                    [1, 68, 135, 202, 269, 336, 403],
                    [1, 68, 135, 202, 269, 336, 403],
                    [1, 68, 135, 202, 269, 336, 403],
                    [1, 68, 135, 202, 269, 336, 403],
                    [1, 68, 135, 202, 269, 336, 403],
                    [1, 68, 135, 202, 269, 336, 403]
                ]
            },
            dock: {
                left: [0, 144, 288, 432, 576, 792, 936, 1080],
                top: [1, 1, 1, 1, 1, 1, 1, 1]
            }
        },
        width: 72,//72N-72
        height: 67,//67N-66
        frame: {
            moving: 7,
            dock: 1
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(14),
        HP: 125,
        damage: 20,
        armor:0,
        sight:280,
        attackRange: 210,
        attackInterval: 3700,
        continuousAttack:{
            count:3,
            layout:function(bullet,num){
                //Reassign location
                bullet.x+=bullet.speed.x*(num);
                bullet.y+=bullet.speed.y*(num);
                //Reassign each action
                bullet.action=(bullet.action+num)%(bullet.frame.moving);
            },
            onlyOnce:true
        },
        portraitOffset: {x:240,y:0},
        dieEffect:Burst.LurkerDeath,
        isFlying:false,
        attackLimit:"ground",
        unitType:Unit.MIDDLE,
        attackType:AttackableUnit.NORMAL_ATTACK,
        recover:Building.ZergBuilding.prototype.recover,
        AOE:{
            type:"LINE",
            hasEffect:false,
            radius:35
        },
        cost:{
            mine:50,
            gas:100,
            man:2,
            time:400
        },
        upgrade:['UpgradeMissileAttacks','EvolveCarapace'],
        items:{
            '9':{name:'Burrow'}
        },
        //Override
        dock:function(){
            //Use the same behavior
            AttackableUnit.turnAround.call(this);
        }
    }
});
Zerg.Mutalisk=AttackableUnit.extends({
    constructorPlus:function(props){
        //Same action mapping
        this.imgPos.dock=this.imgPos.moving;
        this.frame.dock=this.frame.moving;
    },
    prototypePlus: {
        //Add basic unit info
        name: "Mutalisk",
        imgPos: {
            moving: {
                left: [
                    [0, 0, 0, 0, 0],
                    [134, 134, 134, 134, 134],
                    [268, 268, 268, 268, 268],
                    [401, 401, 401, 401, 401],
                    [535, 535, 535, 535, 535],
                    [669, 669, 669, 669, 669],
                    [802, 802, 802, 802, 802],
                    [936, 936, 936, 936, 936]
                ],
                top: [
                    [0, 75, 150, 225, 300],
                    [0, 75, 150, 225, 300],
                    [0, 75, 150, 225, 300],
                    [0, 75, 150, 225, 300],
                    [0, 75, 150, 225, 300],
                    [0, 75, 150, 225, 300],
                    [0, 75, 150, 225, 300],
                    [0, 75, 150, 225, 300]
                ]
            }
        },
        width: 66,
        height: 75,
        frame: {
            moving: 5
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(16),
        HP: 120,
        damage: 9,
        armor:0,
        sight:245,
        attackRange: 105,
        attackInterval: 2200,//3000
        portraitOffset: {x:300,y:0},
        dieEffect:Burst.SmallZergDeath,
        isFlying:true,
        unitType:Unit.SMALL,
        attackType:AttackableUnit.NORMAL_ATTACK,
        recover:Building.ZergBuilding.prototype.recover,
        cost:{
            mine:100,
            gas:100,
            man:2,
            time:400
        },
        upgrade:['UpgradeFlyerAttacks','UpgradeFlyerCarapace'],
        items:{
            '7':{name:'Guardian',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='GreaterSpire';
                })
            }},
            '8':{name:'Devourer',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='GreaterSpire';
                })
            }}
        }
    }
});
Zerg.Guardian=AttackableUnit.extends({
    constructorPlus:function(props){
        //Same action mapping
        this.imgPos.dock=this.imgPos.moving;
        this.frame.dock=this.frame.moving;
    },
    prototypePlus: {
        //Add basic unit info
        name: "Guardian",
        imgPos: {
            moving: {
                left: [
                    [0, 0, 0, 0, 0, 0, 0],
                    [162, 162, 162, 162, 162, 162, 162],
                    [324, 324, 324, 324, 324, 324, 324],
                    [486, 486, 486, 486, 486, 486, 486],
                    [648, 648, 648, 648, 648, 648, 648],
                    [891, 891, 891, 891, 891, 891, 891],
                    [1053, 1053, 1053, 1053, 1053, 1053, 1053],
                    [1215, 1215, 1215, 1215, 1215, 1215, 1215]
                ],
                top: [
                    [0, 74, 148, 222, 296, 370, 444],
                    [0, 74, 148, 222, 296, 370, 444],
                    [0, 74, 148, 222, 296, 370, 444],
                    [0, 74, 148, 222, 296, 370, 444],
                    [0, 74, 148, 222, 296, 370, 444],
                    [0, 74, 148, 222, 296, 370, 444],
                    [0, 74, 148, 222, 296, 370, 444],
                    [0, 74, 148, 222, 296, 370, 444]
                ]
            }
        },
        width: 81,//(N-1)
        height: 74,//(N-1)
        frame: {
            moving: 7
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(6),
        HP: 150,
        damage: 20,
        armor:2,
        sight:385,
        attackRange: 280,
        attackInterval: 3000,
        portraitOffset: {x:360,y:0},
        dieEffect:Burst.BigZergDeath,
        isFlying:true,
        attackLimit:"ground",
        unitType:Unit.BIG,
        attackType:AttackableUnit.NORMAL_ATTACK,
        recover:Building.ZergBuilding.prototype.recover,
        cost:{
            mine:50,
            gas:100,
            man:2,
            time:400
        },
        upgrade:['UpgradeFlyerAttacks','UpgradeFlyerCarapace'],
        //Override
        dock:function(){
            //Use the same behavior
            AttackableUnit.hover.call(this);
        }
    }
});
Zerg.Devourer=AttackableUnit.extends({
    constructorPlus:function(props){
        //Same action mapping
        this.imgPos.dock=this.imgPos.moving;
        this.frame.dock=this.frame.moving;
    },
    prototypePlus: {
        //Add basic unit info
        name: "Devourer",
        imgPos: {
            moving: {
                left: [
                    [0,0,0,0,0,0],
                    [146,146,146,146,146,146],
                    [292,292,292,292,292,292],
                    [438,438,438,438,438,438],
                    [584,584,584,584,584,584],
                    [803,803,803,803,803,803],
                    [949,949,949,949,949,949],
                    [1095,1095,1095,1095,1095,1095]
                ],
                top: [
                    [0, 86, 172, 258, 344, 430],
                    [0, 86, 172, 258, 344, 430],
                    [0, 86, 172, 258, 344, 430],
                    [0, 86, 172, 258, 344, 430],
                    [0, 86, 172, 258, 344, 430],
                    [0, 86, 172, 258, 344, 430],
                    [0, 86, 172, 258, 344, 430],
                    [0, 86, 172, 258, 344, 430]
                ]
            },
            attack: {
                left: [
                    [0,0,0,0,0,0,0,0],
                    [146,146,146,146,146,146,146,146],
                    [292,292,292,292,292,292,292,292],
                    [438,438,438,438,438,438,438,438],
                    [584,584,584,584,584,584,584,584],
                    [803,803,803,803,803,803,803,803],
                    [949,949,949,949,949,949,949,949],
                    [1095,1095,1095,1095,1095,1095,1095,1095]
                ],
                top: [
                    [516, 516, 602, 602, 688, 688, 774, 774],
                    [516, 516, 602, 602, 688, 688, 774, 774],
                    [516, 516, 602, 602, 688, 688, 774, 774],
                    [516, 516, 602, 602, 688, 688, 774, 774],
                    [516, 516, 602, 602, 688, 688, 774, 774],
                    [516, 516, 602, 602, 688, 688, 774, 774],
                    [516, 516, 602, 602, 688, 688, 774, 774],
                    [516, 516, 602, 602, 688, 688, 774, 774]
                ]
            }
        },
        width: 73,//(N-1)
        height: 86,//(N-1)
        frame: {
            moving: 6,
            attack: 8
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(12),
        HP: 250,
        damage: 25,
        armor:2,
        sight:350,
        attackRange: 175,//210
        attackInterval: 5000,//10000
        portraitOffset: {x:420,y:0},
        dieEffect:Burst.BigZergDeath,
        isFlying:true,
        attackLimit:"flying",
        unitType:Unit.BIG,
        attackType:AttackableUnit.BURST_ATTACK,
        recover:Building.ZergBuilding.prototype.recover,
        AOE:{
            hasEffect:true,
            radius:60
        },
        cost:{
            mine:150,
            gas:50,
            man:2,
            time:400
        },
        upgrade:['UpgradeFlyerAttacks','UpgradeFlyerCarapace'],
        //Override
        dock:function(){
            //Use the same behavior
            AttackableUnit.hover.call(this);
        }
    }
});
Zerg.Scourge=AttackableUnit.extends({
    constructorPlus:function(props){
        //Same action mapping
        this.imgPos.attack=this.imgPos.dock=this.imgPos.moving;
        this.frame.attack=this.frame.dock=this.frame.moving;
    },
    prototypePlus: {
        //Add basic unit info
        name: "Scourge",
        imgPos: {
            moving: {
                left: [
                    [0, 0, 0, 0, 0],
                    [68, 68, 68, 68, 68],
                    [136, 136, 136, 136, 136],
                    [204, 204, 204, 204, 204],
                    [272, 272, 272, 272, 272],
                    [374, 374, 374, 374, 374],
                    [442, 442, 442, 442, 442],
                    [510, 510, 510, 510, 510]
                ],
                top: [
                    [0, 30, 60, 90, 120],
                    [0, 30, 60, 90, 120],
                    [0, 30, 60, 90, 120],
                    [0, 30, 60, 90, 120],
                    [0, 30, 60, 90, 120],
                    [0, 30, 60, 90, 120],
                    [0, 30, 60, 90, 120],
                    [0, 30, 60, 90, 120]
                ]
            }
        },
        width: 34,//34(N-1)
        height: 30,//30(N-1)
        frame: {
            moving: 5
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(16),
        HP: 25,
        damage: 110,//Suicide
        armor:0,
        sight:175,
        meleeAttack: true,
        attackRange:35,
        attackInterval: 1000,//Suicide
        portraitOffset: {x:480,y:0},
        dieEffect:Burst.SmallZergDeath,
        attackEffect:Burst.ScourgeBomb,
        isFlying:true,
        attackLimit:"flying",
        suicide:true,
        unitType:Unit.SMALL,
        attackType:AttackableUnit.NORMAL_ATTACK,
        recover:Building.ZergBuilding.prototype.recover,
        cost:{
            mine:15,
            gas:35,
            man:0.5,
            time:150
        },
        upgrade:['UpgradeFlyerCarapace'],
        //Override
        dock:function(){
            //Use the same behavior
            AttackableUnit.hover.call(this);
        }
    }
});
Zerg.Queen=Unit.extends({
    constructorPlus:function(props){
        //Same action mapping
        this.imgPos.dock=this.imgPos.moving;
        this.frame.dock=this.frame.moving;
    },
    prototypePlus: {
        //Add basic unit info
        name: "Queen",
        imgPos: {
            moving: {
                left: [
                    [0, 0, 0, 0, 0],
                    [156, 156, 156, 156, 156],
                    [312, 312, 312, 312, 312],
                    [468, 468, 468, 468, 468],
                    [624, 624, 624, 624, 624],
                    [858, 858, 858, 858, 858],
                    [1014, 1014, 1014, 1014, 1014],
                    [1170, 1170, 1170, 1170, 1170]
                ],
                top: [
                    [0, 71, 142, 213, 284],
                    [0, 71, 142, 213, 284],
                    [0, 71, 142, 213, 284],
                    [0, 71, 142, 213, 284],
                    [0, 71, 142, 213, 284],
                    [0, 71, 142, 213, 284],
                    [0, 71, 142, 213, 284],
                    [0, 71, 142, 213, 284]
                ]
            }
        },
        width: 78,//(N-1)
        height: 71,//(N-1)
        frame: {
            moving: 5
            //attack: 6//Reserved
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(16),
        HP: 120,
        armor:0,
        MP: 200,
        sight:350,
        portraitOffset: {x:540,y:0},
        dieEffect:Burst.BigZergDeath,
        isFlying:true,
        unitType:Unit.MIDDLE,
        recover:Building.ZergBuilding.prototype.recover,
        cost:{
            mine:100,
            gas:150,
            man:2,
            time:500
        },
        upgrade:['UpgradeFlyerCarapace'],
        items:{
            '6':{name:'InfestTerranCommandCenter'},
            '7':{name:'Parasite'},
            '8':{name:'SpawnBroodlings',condition:function(){
                return Magic.SpawnBroodlings.enabled
            }},
            '9':{name:'Ensnare',condition:function(){
                return Magic.Ensnare.enabled
            }}
        },
        //Override
        dock:function(){
            //Use the same behavior
            Unit.hover.call(this);
        }
    }
});
Zerg.Broodling=AttackableUnit.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus: {
        //Add basic unit info
        name: "Broodling",
        imgPos: {
            moving: {
                left: [
                    [5, 5, 5, 5, 5, 5, 5],
                    [101, 101, 101, 101, 101, 101, 101],
                    [197, 197, 197, 197, 197, 197, 197],
                    [293, 293, 293, 293, 293, 293, 293],
                    [389, 389, 389, 389, 389, 389, 389],
                    [533, 533, 533, 533, 533, 533, 533],
                    [629, 629, 629, 629, 629, 629, 629],
                    [725, 725, 725, 725, 725, 725, 725]
                ],
                top: [
                    [5, 53, 101, 149, 197, 245, 293],
                    [5, 53, 101, 149, 197, 245, 293],
                    [5, 53, 101, 149, 197, 245, 293],
                    [5, 53, 101, 149, 197, 245, 293],
                    [5, 53, 101, 149, 197, 245, 293],
                    [5, 53, 101, 149, 197, 245, 293],
                    [5, 53, 101, 149, 197, 245, 293],
                    [5, 53, 101, 149, 197, 245, 293]
                ]
            },
            dock: {
                left: [5, 101, 197, 293, 389, 533, 629, 725],
                top: [5, 5, 5, 5, 5, 5, 5, 5]
            },
            attack: {
                left: [
                    [5, 5, 5, 5, 5],
                    [101, 101, 101, 101, 101],
                    [197, 197, 197, 197, 197],
                    [293, 293, 293, 293, 293],
                    [389, 389, 389, 389, 389],
                    [533, 533, 533, 533, 533],
                    [629, 629, 629, 629, 629],
                    [725, 725, 725, 725, 725]
                ],
                top: [
                    [341, 389, 437, 485, 533],
                    [341, 389, 437, 485, 533],
                    [341, 389, 437, 485, 533],
                    [341, 389, 437, 485, 533],
                    [341, 389, 437, 485, 533],
                    [341, 389, 437, 485, 533],
                    [341, 389, 437, 485, 533],
                    [341, 389, 437, 485, 533]
                ]
            }
        },
        width: 38,//48N-43
        height: 38,
        frame: {
            moving: 7,
            dock: 1,
            attack: 5
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(6),
        HP: 30,
        damage: 4,
        armor:0,
        sight:175,
        meleeAttack: true,
        attackInterval: 1500,
        portraitOffset: {x:720,y:0},
        dieEffect:Burst.BroodlingDeath,
        isFlying:false,
        attackLimit:"ground",
        unitType:Unit.SMALL,
        recover:Building.ZergBuilding.prototype.recover,
        upgrade:['UpgradeMeleeAttacks','EvolveCarapace'],
        items:{
            '9':{name:'Burrow',condition:function(){
                return Magic.Burrow.enabled
            }}
        },
        attackType:AttackableUnit.NORMAL_ATTACK,
        //Override
        dock:function(){
            //Use the same behavior
            AttackableUnit.walkAround.call(this);
        }
    }
});
Zerg.Ultralisk=AttackableUnit.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus: {
        //Add basic unit info
        name: "Ultralisk",
        imgPos: {
            moving: {
                left: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [202, 202, 202, 202, 202, 202, 202, 202, 202],
                    [404, 404, 404, 404, 404, 404, 404, 404, 404],
                    [707, 707, 707, 707, 707, 707, 707, 707, 707],
                    [909, 909, 909, 909, 909, 909, 909, 909, 909],
                    [1212, 1212, 1212, 1212, 1212, 1212, 1212, 1212, 1212],
                    [1414, 1414, 1414, 1414, 1414, 1414, 1414, 1414, 1414],
                    [1717, 1717, 1717, 1717, 1717, 1717, 1717, 1717, 1717]
                ],
                top: [
                    [0, 108, 216, 324, 432, 540, 648, 756, 864],
                    [0, 108, 216, 324, 432, 540, 648, 756, 864],
                    [0, 108, 216, 324, 432, 540, 648, 756, 864],
                    [0, 108, 216, 324, 432, 540, 648, 756, 864],
                    [0, 108, 216, 324, 432, 540, 648, 756, 864],
                    [0, 108, 216, 324, 432, 540, 648, 756, 864],
                    [0, 108, 216, 324, 432, 540, 648, 756, 864],
                    [0, 108, 216, 324, 432, 540, 648, 756, 864]
                ]
            },
            dock: {
                left: [0, 202, 404, 707, 909, 1212, 1414, 1717],
                top: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            attack: {
                left: [
                    [0, 0, 0, 0, 0, 0],
                    [202, 202, 202, 202, 202, 202],
                    [404, 404, 404, 404, 404, 404],
                    [707, 707, 707, 707, 707, 707],
                    [909, 909, 909, 909, 909, 909],
                    [1212, 1212, 1212, 1212, 1212, 1212],
                    [1414, 1414, 1414, 1414, 1414, 1414],
                    [1717, 1717, 1717, 1717, 1717, 1717]
                ],
                top: [
                    [972, 1080, 1188, 1296, 1404, 1512],
                    [972, 1080, 1188, 1296, 1404, 1512],
                    [972, 1080, 1188, 1296, 1404, 1512],
                    [972, 1080, 1188, 1296, 1404, 1512],
                    [972, 1080, 1188, 1296, 1404, 1512],
                    [972, 1080, 1188, 1296, 1404, 1512],
                    [972, 1080, 1188, 1296, 1404, 1512],
                    [972, 1080, 1188, 1296, 1404, 1512]
                ]
            }
        },
        width: 101,//(N-1)
        height: 108,//(N-1)
        frame: {
            moving: 9,
            dock: 1,
            attack: 6
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(12),
        HP: 400,
        damage: 20,
        armor:1,
        sight:245,
        meleeAttack: true,
        attackInterval: 1500,
        portraitOffset: {x:600,y:0},
        dieEffect:Burst.UltraliskDeath,
        isFlying:false,
        attackLimit:"ground",
        unitType:Unit.BIG,
        attackType:AttackableUnit.NORMAL_ATTACK,
        recover:Building.ZergBuilding.prototype.recover,
        cost:{
            mine:200,
            gas:200,
            man:6,
            time:600
        },
        upgrade:['UpgradeMeleeAttacks','EvolveCarapace']
    }
});
Zerg.Defiler=Unit.extends({
    constructorPlus:function(props){
        //Same action mapping
        this.imgPos.dock=this.imgPos.moving;
        this.frame.dock=this.frame.moving;
    },
    prototypePlus: {
        //Add basic unit info
        name: "Defiler",
        imgPos: {
            moving: {
                left: [
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [144, 144, 144, 144, 144, 144, 144, 144],
                    [288, 288, 288, 288, 288, 288, 288, 288],
                    [432, 432, 432, 432, 432, 432, 432, 432],
                    [576, 576, 576, 576, 576, 576, 576, 576],
                    [792, 792, 792, 792, 792, 792, 792, 792],
                    [936, 936, 936, 936, 936, 936, 936, 936],
                    [1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080]
                ],
                top: [
                    [0, 62, 124, 186, 248, 310, 372, 434],
                    [0, 62, 124, 186, 248, 310, 372, 434],
                    [0, 62, 124, 186, 248, 310, 372, 434],
                    [0, 62, 124, 186, 248, 310, 372, 434],
                    [0, 62, 124, 186, 248, 310, 372, 434],
                    [0, 62, 124, 186, 248, 310, 372, 434],
                    [0, 62, 124, 186, 248, 310, 372, 434],
                    [0, 62, 124, 186, 248, 310, 372, 434]
                ]
            }
        },
        width: 72,//(N-1)
        height: 62,//(N-1)
        frame: {
            moving: 8
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(10),
        HP: 80,
        armor:1,
        MP: 200,
        sight:350,
        portraitOffset: {x:660,y:0},
        dieEffect:Burst.DefilerDeath,
        isFlying:false,
        unitType:Unit.MIDDLE,
        recover:Building.ZergBuilding.prototype.recover,
        cost:{
            mine:50,
            gas:150,
            man:2,
            time:500
        },
        upgrade:['EvolveCarapace'],
        items:{
            '6':{name:'Consume',condition:function(){
                return Magic.Consume.enabled
            }},
            '7':{name:'DarkSwarm'},
            '8':{name:'Plague',condition:function(){
                return Magic.Plague.enabled
            }},
            '9':{name:'Burrow',condition:function(){
                return Magic.Burrow.enabled
            }}
        }
    }
});
Zerg.InfestedTerran=AttackableUnit.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus: {
        //Add basic unit info
        name: "InfestedTerran",
        imgPos: {
            moving: {
                left: [
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [82, 82, 82, 82, 82, 82, 82, 82],
                    [164, 164, 164, 164, 164, 164, 164, 164],
                    [246, 246, 246, 246, 246, 246, 246, 246],
                    [328, 328, 328, 328, 328, 328, 328, 328],
                    [451, 451, 451, 451, 451, 451, 451, 451],
                    [533, 533, 533, 533, 533, 533, 533, 533],
                    [615, 615, 615, 615, 615, 615, 615, 615]
                ],
                top: [
                    [0, 54, 108, 162, 216, 270, 324, 378],
                    [0, 54, 108, 162, 216, 270, 324, 378],
                    [0, 54, 108, 162, 216, 270, 324, 378],
                    [0, 54, 108, 162, 216, 270, 324, 378],
                    [0, 54, 108, 162, 216, 270, 324, 378],
                    [0, 54, 108, 162, 216, 270, 324, 378],
                    [0, 54, 108, 162, 216, 270, 324, 378],
                    [0, 54, 108, 162, 216, 270, 324, 378]
                ]
            },
            dock: {
                left: [0, 82, 164, 246, 328, 451, 533, 615],
                top: [0, 0, 0, 0, 0, 0, 0, 0]
            }
        },
        width: 41,//41(N-1)
        height: 44,//54(N-1)
        frame: {
            moving: 8,
            dock: 1
        },
        //Only for moving status, override
        speed:Unit.getSpeedMatrixBy(10),
        HP: 60,
        damage: 500,//Suicide
        armor:0,
        sight:175,
        meleeAttack: true,
        attackRange:35,
        attackInterval: 1000,//Suicide
        portraitOffset: {x:780,y:0},
        dieEffect:Burst.HumanDeath,
        attackEffect:Burst.InfestedBomb,
        isFlying:false,
        attackLimit:"ground",
        suicide:true,
        unitType:Unit.SMALL,
        attackType:AttackableUnit.NORMAL_ATTACK,
        recover:Building.ZergBuilding.prototype.recover,
        AOE:{
            hasEffect:false,
            radius:80
        },
        cost:{
            mine:100,
            gas:50,
            man:1,
            time:400
        },
        upgrade:['EvolveCarapace'],
        items:{
            '9':{name:'Burrow',condition:function(){
                return Magic.Burrow.enabled
            }}
        },
        //Override
        dock:function(){
            //Use the same behavior
            AttackableUnit.turnAround.call(this);
        }
    }
});