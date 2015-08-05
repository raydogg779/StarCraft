var Resource={
    playerNum:0,
    init:function(num){
        if (num==undefined) num=2;
        for (var N=0;N<num;N++){
            Resource[N]={
                mine:50,
                gas:0,
                curMan:0,
                totalMan:10
            };
        }
        Resource.playerNum=num;
    },
    getCost:function(name,isEnemy){
        var team=Number(Boolean(isEnemy));
        var cost;
        [Zerg,Terran,Protoss,Building.ZergBuilding,Building.TerranBuilding,Building.ProtossBuilding,Magic,Upgrade].forEach(function(Type){
            for (var item in Type){
                //Filter out noise
                if (item=='inherited' || item=='super' || item=='extends') continue;
                if (item==name){
                    cost=(typeof(Type[item])=='function')?Type[item].prototype.cost:Type[item].cost;
                    //Resolve array cost
                    if (cost) {
                        //Clone fetched cost object, but sometimes undefined
                        cost=_$.clone(cost);
                        ['mine','gas','man','magic','time'].forEach(function(res){
                            if(cost[res] && (cost[res] instanceof Array)) {
                                cost[res]=cost[res][Type[item].level[team]];
                            }
                        });
                    }
                }
            }
        });
        return cost;
    },
    //Check if paid successfully
    paypal:function(cost){
        if (cost){
            var oweFlag=false, msg='';
            if (Cheat.gathering) cost.magic=0;
            if(cost['mine'] && cost['mine']>Resource[0].mine){
                oweFlag=true;
                msg+='Not enough minerals...mine more minerals<br>';
                //Advisor voice
                Referee.voice.resource[Game.race.selected].mine.play();
            }
            if(cost['gas'] && cost['gas']>Resource[0].gas){
                oweFlag=true;
                msg+='Not enough Vespene gases...harvest more gas<br>';
                //Advisor voice
                Referee.voice.resource[Game.race.selected].gas.play();
            }
            if(cost['man'] && cost['man']>(Resource[0].totalMan-Resource[0].curMan)){
                oweFlag=true;
                switch(Game.race.selected){
                    case 'Zerg':
                        msg+='Too many underlings...create more Overlords<br>';
                        break;
                    case 'Terran':
                        msg+='Not enough supplies...build more Supply Depots<br>';
                        break;
                    case 'Protoss':
                        msg+='Not enough psi...build more Pylons<br>';
                        break;
                }
                //Advisor voice
                Referee.voice.resource[Game.race.selected].man.play();
            }
            if(cost['magic'] && cost['magic']>this.magic){
                oweFlag=true;
                msg+='Not enough energy<br>';
                //Advisor voice
                Referee.voice.resource[Game.race.selected].magic.play();
            }
            if (oweFlag){
                Game.showMessage(msg);
                //Payment failed
                return false;
            }
            else {
                if (!Resource.creditBill){
                    //Pay immediately
                    if(cost['mine']){
                        Resource[0].mine-=cost['mine'];
                    }
                    if(cost['gas']){
                        Resource[0].gas-=cost['gas'];
                    }
                    if(cost['magic']){
                        this.magic-=cost['magic'];
                    }
                }
                //Already paid
                return true;
            }
        }
        //No bill
        else return true;
    },
    //Pay credit card bill
    payCreditBill:function(){
        var cost=Resource.creditBill;
        //Paid credit bill, no longer owe money this time
        delete Resource.creditBill;
        return Resource.paypal.call(this,cost);
    }
};