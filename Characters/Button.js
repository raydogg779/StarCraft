var Button={
    callback:null,
    /***************Functions***************/
    reset:function(){
        Game.changeSelectedTo(Game.selectedUnit);
    },
    //Equip all buttons for unit
    equipButtonsFor:function(chara){
        //Clear all buttons
        $('div.panel_Control button').removeAttr('class').removeAttr('disabled').removeAttr('style').off('click').off('mouseover').off('mouseout').html('').hide();
        //Filter out enemy
        if (chara.isEnemy || chara=={}) return;
        //Add button press sound
        $('div.panel_Control button').on('click',function(){
            Referee.voice.button.play();
        });
        //Show buttons
        if (chara instanceof Unit){
            $('button[num="1"]').attr('class','move').show();
            $('button[num="2"]').attr('class','stop').show();
            $('button[num="4"]').attr('class','patrol').show();
            $('button[num="5"]').attr('class','hold').show();
            if (Game.selectedUnit.hold) $('button.hold').css('border-color','red');//Add for hold tag
            //Bind callbacks
            $('button.move').on('click',Button.moveHandler);
            $('button.stop').on('click',Button.stopHandler);
            $('button.patrol').on('click',Button.patrolHandler);
            $('button.hold').on('click',Button.holdHandler);
        }
        if (chara.attack){
            $('button[num="3"]').attr('class','attack').show();
            $('button.attack').on('click',Button.attackHandler);
        }
        //Add items
        if (chara.items){
            for (var N in chara.items){
                if (chara.items[N]!=null) {
                    $('button[num="'+N+'"]').off('click').attr('class',chara.items[N].name).show();
                    if (chara.items[N].condition && chara.items[N].condition()==false)
                        $('button[num="'+N+'"]').attr('disabled',true);
                    else $('button[num="'+N+'"]').removeAttr('disabled');
                    //Exceptions: need mark numbers on button
                    switch (chara.items[N].name){
                        case 'SpiderMines':
                            $('button[num="'+N+'"]')[0].innerHTML=chara.spiderMines;
                            break;
                        case 'Scarab':
                            $('button[num="'+N+'"]')[0].innerHTML=chara.scarabNum;
                            break;
                        case 'Interceptor':
                            $('button[num="'+N+'"]')[0].innerHTML=chara.continuousAttack.count;
                            break;
                    }
                }
                else {
                    $('button[num="'+N+'"]').removeAttr('class').hide();
                }
            }
            //Bind basic callbacks
            $('button.Cancel').on('click',function(){
                //Reset menu by reselect unit
                Button.reset();
            });
            $('button.SelectLarva').on('click',function(){
                var larvas=Game.selectedUnit.larvas;
                if (larvas){
                    larvas=larvas.filter(function(chara){
                        return chara.status!='dead';
                    });
                    //If found alive larva
                    if (larvas.length){
                        Game.unselectAll();
                        Game.addIntoAllSelected(larvas,true);
                        if (larvas[0] instanceof Gobj){
                            Game.changeSelectedTo(larvas[0]);
                            //Sound effect
                            larvas[0].sound.selected.play();
                        }
                    }
                }
            });
            $('button.BasicMutation').on('click',function(){
                Button.equipButtonsFor(Button.basicZergMutations);
            });
            $('button.AdvancedMutation').on('click',function(){
                Button.equipButtonsFor(Button.advancedZergMutations);
            });
            $('button.BasicBuilding').on('click',function(){
                Button.equipButtonsFor(Button.basicTerranBuildings);
            });
            $('button.AdvancedBuilding').on('click',function(){
                Button.equipButtonsFor(Button.advancedTerranBuildings);
            });
            $('button.BasicStructure').on('click',function(){
                Button.equipButtonsFor(Button.basicProtossStructures);
            });
            $('button.AdvancedStructure').on('click',function(){
                Button.equipButtonsFor(Button.advancedProtossStructures);
            });
            //Upgrade callbacks
            var upgrades=new Array();
            for (var grade in Upgrade){
                upgrades.push(grade);
            }//Cannot use for-in bind together
            upgrades.forEach(function(grade){
                $('button.'+grade).on('click',function(){
                    //Filter out when occupied
                    if (Game.selectedUnit.processing) return;
                    //Payment
                    if (Resource.paypal(Resource.getCost(grade))){
                        if (Resource.getCost(grade) && Resource.getCost(grade).time){
                            var owner=Game.selectedUnit;
                            var duration=Resource.getCost(grade).time;
                            //Cheat: Operation cwal
                            if (Cheat.cwal) duration=0;
                            setTimeout(function(){
                                Upgrade[grade].effect();
                                Referee.voice.upgrade[Game.race.selected].play();
                                delete owner.processing;
                                Button.reset();
                                Game.showMessage('Upgrade complete');
                            },duration*100);
                            //Occupy flag
                            owner.processing={
                                name:grade,
                                startTime:new Date().getTime(),//Game._clock,
                                time:duration
                            };
                        }
                        //Or will effect immediately
                        else Upgrade[grade].effect();
                    }
                });
            });
            //Magic callbacks
            var magics=[];
            for (var magic in Magic){
                magics.push(magic);
            }//Cannot use for-in bind together
            var hasMagic=function(chara,magic){
                if (chara.items){
                    for (var attr in chara.items){
                        if (chara.items[attr] && chara.items[attr].name==magic){
                            if (chara.items[attr].condition){
                                if (chara.items[attr].condition()) return true;
                            }
                            else return true;
                        }
                    }
                }
                return false;
            };
            magics.forEach(function(magic){
                $('button.'+magic).on('click',function(){
                    Unit.allOurUnits().concat(Building.ourBuildings).filter(function(chara){
                        return (chara.selected && hasMagic(chara,magic));
                    }).forEach(function(chara){
                        var duration=Resource.getCost(magic)?(Resource.getCost(magic).time):0;
                        //For Scarab and Interceptor
                        if (duration){
                            //Filter out when occupied
                            if (chara.processing) return;
                            //Payment: chara paypal cost
                            if (Resource.paypal.call(chara,Resource.getCost(magic))){
                                //Cheat: Operation cwal
                                if (Cheat.cwal) duration=0;
                                setTimeout(function(){
                                    Magic[magic].spell.call(chara);
                                    delete chara.processing;
                                },duration*100);
                                //Occupy flag
                                chara.processing={
                                    name:magic,
                                    startTime:new Date().getTime(),//Game._clock,
                                    time:duration
                                };
                            }
                        }
                        else {
                            //Pay by credit card
                            if (Magic[magic].credit) Resource.creditBill=Resource.getCost(magic);
                            //Payment: chara paypal cost
                            if (Resource.paypal.call(chara,Resource.getCost(magic))){
                                Magic[magic].spell.call(chara);
                            }
                        }
                    });
                });
            });

            //Unit callbacks:
            //For Zerg units
            var unitTypes=[];
            for (var unitType in Zerg){
                unitTypes.push(unitType);
            }
            var exceptions=['Guardian','Devourer'];
            unitTypes.forEach(function(unitType){
                $('button.'+unitType).on('click',function(){
                    Unit.allOurUnits().filter(function(chara){
                        return (chara.selected && chara.name==Game.selectedUnit.name);
                    }).forEach(function(chara){
                        //Payment
                        if (Resource.paypal(Resource.getCost(unitType))){
                            //Evolve as egg
                            var egg;
                            //Evolve as cocoon
                            if (exceptions.indexOf(unitType)!=-1){
                                egg=chara.evolveTo(Building.ZergBuilding.Cocoon);
                            }
                            else {
                                egg=chara.evolveTo(Building.ZergBuilding.Egg);
                                if (unitType=='Lurker') egg.action=18;
                            }
                            //Calculate duration
                            var duration=Resource.getCost(unitType).time;
                            //Cheat: Operation cwal
                            if (Cheat.cwal) duration=0;
                            setTimeout(function(){
                                if (egg.status!='dead'){
                                    //Evolve
                                    if (exceptions.indexOf(unitType)!=-1){
                                        //Cocoon
                                        egg.evolveTo(Zerg[unitType],[unitType+'Birth']);
                                    }
                                    else {
                                        //Egg
                                        egg.evolveTo(Zerg[unitType],['EggBirth',unitType+'Birth']);
                                    }
                                }
                            },duration*100);
                            //Processing flag on egg
                            egg.processing={
                                name:unitType,
                                startTime:new Date().getTime(),//Game._clock,
                                time:duration
                            };
                        }
                    });
                });
            });
            //For Terran and Protoss units
            [Terran,Protoss].forEach(function(Race){
                var unitTypes=[];
                for (var unitType in Race){
                    unitTypes.push(unitType);
                }//Cannot use for-in bind together
                var exceptions=['Lurker','Guardian','Devourer','Archon','DarkArchon'];
                unitTypes.forEach(function(unitType){
                    //Unit type isn't in exceptions
                    if (exceptions.indexOf(unitType)==-1) {
                        $('button.'+unitType).on('click',function(){
                            //Filter out when occupied
                            if (Game.selectedUnit.processing) return;
                            //Payment
                            if (Resource.paypal(Resource.getCost(unitType))){
                                if (Resource.getCost(unitType) && Resource.getCost(unitType).time){
                                    var owner=Game.selectedUnit;
                                    var duration=Resource.getCost(unitType).time;
                                    //Cheat: Operation cwal
                                    if (Cheat.cwal) duration=0;
                                    setTimeout(function(){
                                        if (Race[unitType].prototype.isFlying)
                                            new Race[unitType]({x:owner.x,y:owner.y});
                                        else
                                            new Race[unitType]({x:owner.x,y:owner.y+owner.height});
                                        delete owner.processing;
                                    },duration*100);
                                    //Occupy flag
                                    owner.processing={
                                        name:unitType,
                                        startTime:new Date().getTime(),//Game._clock,
                                        time:duration
                                    };
                                }
                            }
                        });
                    }
                    //Exception units
                    else {
                        $('button.'+unitType).on('click',function(){
                            Unit.allOurUnits().filter(function(chara){
                                return (chara.selected && chara.name==Game.selectedUnit.name);
                            }).forEach(function(chara){
                                //Filter out when occupied
                                if (chara.processing) return;
                                //Payment
                                if (Resource.paypal(Resource.getCost(unitType))){
                                    if (Resource.getCost(unitType) && Resource.getCost(unitType).time){
                                        var duration=Resource.getCost(unitType).time;
                                        //Cheat: Operation cwal
                                        if (Cheat.cwal) duration=0;
                                        setTimeout(function(){
                                            //Evolve
                                            var evolved=new Race[unitType]({x:chara.x,y:chara.y});
                                            if (chara.selected) Game.addIntoAllSelected(evolved);
                                            if (chara==Game.selectedUnit) Game.changeSelectedTo(evolved);
                                            //Hide die burst and sound for old unit, then die
                                            chara.dieEffect=chara.sound.death=null;
                                            chara.die();
                                            delete chara.processing;
                                        },duration*100);
                                        //Occupy flag
                                        chara.processing={
                                            name:unitType,
                                            startTime:new Date().getTime(),//Game._clock,
                                            time:duration
                                        };
                                    }
                                }
                            });
                        });
                    }
                });
            });
            //Building callbacks
            [Building.ZergBuilding,Building.TerranBuilding,Building.ProtossBuilding].forEach(function(Build){
                var buildNames=[];
                for (var buildName in Build){
                    //Filter out noise
                    if (buildName!='inherited' && buildName!='super' && buildName!='extends'){
                        buildNames.push(buildName);
                    }
                }
                buildNames.forEach(function(buildName){
                    $('button.'+buildName).on('click',function(){
                        //Filter out when occupied
                        if (Game.selectedUnit.processing) return;
                        //Payment
                        if (Resource.paypal(Resource.getCost(buildName))){
                            if (Resource.getCost(buildName) && Resource.getCost(buildName).time){
                                var owner=Game.selectedUnit;
                                var duration=Resource.getCost(buildName).time;
                                //Cheat: Operation cwal
                                if (Cheat.cwal) duration=0;
                                setTimeout(function(){
                                    var building=new Build[buildName]({x:owner.x,y:owner.y});
                                    if (building instanceof Building.ZergBuilding) setTimeout(Map.drawMud,0);
                                    delete owner.processing;
                                },duration*100);
                                //Occupy flag
                                owner.processing={
                                    name:buildName,
                                    startTime:new Date().getTime(),//Game._clock,
                                    time:duration
                                };
                            }
                        }
                        Button.reset();
                    });
                });
            });
        }
        //Bind tooltip callbacks
        $('div.panel_Control button').on('mouseover',function(event){
            var _name=this.className;
            $('div.tooltip_Box').css('right',innerWidth-event.clientX).css('bottom',innerHeight-event.clientY).show();
            $('div.tooltip_Box div.itemName')[0].innerHTML=_name;
            var cost=Resource.getCost(_name);
            if (cost) {
                $('div.cost').show();
                ['mine','gas','man','magic'].forEach(function(res){
                    if(cost[res]) {
                        $('div.cost *[class*='+res+']').show();
                        $('div.cost span.'+res+'Num')[0].innerHTML=cost[res];
                    }
                    else $('div.cost *[class*='+res+']').hide();
                });
            }
        });
        $('div.panel_Control button').on('mouseout',function(){
            $('div.tooltip_Box').hide();
            $('div.tooltip_Box div.cost').hide();
            $('div.tooltip_Box div.itemName')[0].innerHTML='';
            ['mine','gas','man','magic'].forEach(function(res){
                $('div.cost span.'+res+'Num')[0].innerHTML='';
            });
        });
    },

    /***************Buttons***************/
    basicZergMutations:{
        items:{
            '1':{name:'Hatchery'},
            '2':{name:'CreepColony',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Hatchery' || chara.name=='Lair' || chara.name=='Hive';
                })
            }},
            '3':{name:'Extractor',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Hatchery' || chara.name=='Lair' || chara.name=='Hive';
                })
            }},
            '4':{name:'SpawningPool',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Hatchery' || chara.name=='Lair' || chara.name=='Hive';
                })
            }},
            '5':{name:'EvolutionChamber',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Hatchery' || chara.name=='Lair' || chara.name=='Hive';
                })
            }},
            '7':{name:'HydraliskDen',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='SpawningPool';
                })
            }},
            '9':{name:'Cancel'}
        }
    },
    advancedZergMutations:{
        items:{
            '1':{name:'Spire',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Lair' || chara.name=='Hive';
                })
            }},
            '2':{name:'QueenNest',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Lair' || chara.name=='Hive';
                })
            }},
            '3':{name:'NydusCanal',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Hive';
                })
            }},
            '4':{name:'UltraliskCavern',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Hive';
                })
            }},
            '5':{name:'DefilerMound',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Hive';
                })
            }},
            '9':{name:'Cancel'}
        }
    },
    basicTerranBuildings:{
        items:{
            '1':{name:'CommandCenter'},
            '2':{name:'SupplyDepot',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='CommandCenter';
                })
            }},
            '3':{name:'Refinery',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='CommandCenter';
                })
            }},
            '4':{name:'Barracks',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='CommandCenter';
                })
            }},
            '5':{name:'EngineeringBay',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='CommandCenter';
                })
            }},
            '6':{name:'MissileTurret',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='EngineeringBay';
                })
            }},
            '7':{name:'Academy',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Barracks';
                })
            }},
            '8':{name:'Bunker',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Barracks';
                })
            }},
            '9':{name:'Cancel'}
        }
    },
    advancedTerranBuildings:{
        items:{
            '1':{name:'Factory',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Barracks';
                })
            }},
            '2':{name:'Starport',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Factory';
                })
            }},
            '3':{name:'ScienceFacility',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Starport';
                })
            }},
            '4':{name:'Armory',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Factory';
                })
            }},
            '9':{name:'Cancel'}
        }
    },
    basicProtossStructures:{
        items:{
            '1':{name:'Nexus'},
            '2':{name:'Pylon',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Nexus';
                })
            }},
            '3':{name:'Assimilator',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Nexus';
                })
            }},
            '4':{name:'Gateway',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Nexus';
                })
            }},
            '5':{name:'Forge',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Nexus';
                })
            }},
            '6':{name:'PhotonCannon',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Forge';
                })
            }},
            '7':{name:'CyberneticsCore',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Gateway';
                })
            }},
            '8':{name:'ShieldBattery',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='Gateway';
                })
            }},
            '9':{name:'Cancel'}
        }
    },
    advancedProtossStructures:{
        items:{
            '1':{name:'RoboticsFacility',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='CyberneticsCore';
                })
            }},
            '2':{name:'StarGate',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='CyberneticsCore';
                })
            }},
            '3':{name:'CitadelOfAdun',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='CyberneticsCore';
                })
            }},
            '4':{name:'RoboticsSupportBay',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='RoboticsFacility';
                })
            }},
            '5':{name:'FleetBeacon',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='StarGate';
                })
            }},
            '6':{name:'TemplarArchives',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='CitadelOfAdun';
                })
            }},
            '7':{name:'Observatory',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='RoboticsFacility';
                })
            }},
            '8':{name:'ArbiterTribunal',condition:function(){
                return Building.ourBuildings.some(function(chara){
                    return chara.name=='StarGate';
                }) && Building.ourBuildings.some(function(chara){
                    return chara.name=='TemplarArchives';
                })
            }},
            '9':{name:'Cancel'}
        }
    },

    /***************Handlers***************/
    //Move button
    moveHandler:function(){
        if (Button.callback==null) {
            Button.callback='move';
            $('div.GameLayer').attr('status','button');
        }
        else {
            //Cancel handler
            $('div.GameLayer').removeAttr('status');
            Button.callback=null;
        }
    },
    //Stop button
    stopHandler:function(){
        Unit.allOurUnits().filter(function(chara){
            return chara.selected;
        }).forEach(function(chara){
            if (chara.attack) chara.stopAttack();
            chara.dock();
            //Interrupt old destination routing
            if (chara.destination) {
                //Break possible dead lock
                if (chara.destination.next) chara.destination.next=undefined;
                delete chara.destination;
            }
        });
    },
    //Attack button
    attackHandler:function(){
        if (Button.callback==null) {
            Button.callback='attack';
            $('div.GameLayer').attr('status','button');
        }
        else {
            //Cancel handler
            $('div.GameLayer').removeAttr('status');
            Button.callback=null;
        }
    },
    //Patrol button
    patrolHandler:function(){
        if (Button.callback==null) {
            Button.callback='patrol';
            $('div.GameLayer').attr('status','button');
        }
        else {
            //Cancel handler
            $('div.GameLayer').removeAttr('status');
            Button.callback=null;
        }
    },
    //Hold button
    holdHandler:function(){
        Button.stopHandler();
        //Freeze all our selected units
        Unit.allOurUnits().filter(function(chara){
            return chara.selected;
        }).forEach(function(chara){
            if (chara.hold){
                delete chara.AI;
                delete chara.findNearbyTargets;
                delete chara.hold;
                Button.reset();
            }
            else {
                //Use the same AI as attackable building
                chara.AI=Building.Attackable.prototypePlus.AI;
                //Can only find target inside attack range instead of in sight
                chara.findNearbyTargets=Building.Attackable.prototypePlus.findNearbyTargets;
                chara.dock();
                chara.hold=true;
                Button.reset();
            }
        });
    },
    //Execute callback
    execute:function(event){
        //Finish part II
        switch (Button.callback){
            case 'move':
                mouseController.rightClick(event);
                break;
            case 'attack':
                mouseController.rightClick(event,true);
                break;
            case 'patrol':
                mouseController.rightClick(event,true);
                break;
            default:
                if (typeof(Button.callback)=='function'){
                    //Mouse at (clickX,clickY)
                    var offset=$('#frontCanvas').offset();
                    var clickX=event.pageX-offset.left;
                    var clickY=event.pageY-offset.top;
                    var location={x:clickX+Map.offsetX,y:clickY+Map.offsetY};
                    //Show right click cursor
                    new Burst.RightClickCursor(location);
                    //Call back with location info
                    Button.callback(location);
                }
        }
        $('div.GameLayer').removeAttr('status');
        Button.callback=null;
    }
};