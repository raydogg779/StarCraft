var mouseController={
    down:false,
    drag:false,
    startPoint:{x:0,y:0},
    endPoint:{x:0,y:0},
    isMultiSelect:function(){
      return keyController.shift;
    },
    isJoinTeam:function(){
        return keyController.ctrl;
    },
    leftClick:function(event){
        //Mouse at (clickX,clickY)
        var offset=$('#frontCanvas').offset();
        var clickX=event.pageX-offset.left;
        var clickY=event.pageY-offset.top;
        //Intercept event inside infoBox
        if (clickY>Game.infoBox.y) return;
        //Selection mode
        if (Button.callback==null) {
            //Find selected one, convert position
            var selectedOne=Game.getSelectedOne(clickX+Map.offsetX,clickY+Map.offsetY);
            //Cannot select enemy invisible unit
            if (selectedOne.isInvisible && selectedOne.isEnemy) return;
            //Single select will unselect all units and only choose selected one
            //Multi select will keep selected status and do nothing
            if (!mouseController.isMultiSelect())
                Game.unselectAll();
            //If has selected one
            if (selectedOne instanceof Gobj) {
                //Sound effect
                selectedOne.sound.selected.play();
                //Cannot multiSelect with enemy
                if (selectedOne.isEnemy || Game.selectedUnit.isEnemy)
                    Game.unselectAll();
                //Only selected one to show portrait
                Game.changeSelectedTo(selectedOne);
                //Add into allSelected if not included
                Game.addIntoAllSelected(selectedOne);
            }
            else {
                //Click null
                Game.changeSelectedTo({});
                Game.unselectAll();
            }
        }
        //Button mode
        else {
            //Callback
            Button.execute(event);
        }
    },
    rightClick:function(event,unlock){
        //Mouse at (clickX,clickY)
        var offset=$('#frontCanvas').offset();
        var clickX=event.pageX-offset.left;
        var clickY=event.pageY-offset.top;
        //Intercept event inside infoBox
        if (clickY>Game.infoBox.y) return;
        //Show right click cursor
        new Burst.RightClickCursor({x:clickX+Map.offsetX,y:clickY+Map.offsetY});
        //Find selected one or nothing
        var selectedEnemy=Game.getSelectedOne(clickX+Map.offsetX,clickY+Map.offsetY,true);//isEnemy
        Unit.allOurUnits().concat(Building.ourBuildings).forEach(function(chara){
            //Cannot control dead man
            if (chara.status=="dead") return;
            //Control chara moving if it's selected
            if (chara.selected) {
                //Sound effect
                if (chara.sound.moving) chara.sound.moving.play();
                //Interrupt old destination routing
                if (chara.destination) {
                    //Break possible dead lock
                    if (chara.destination.next) chara.destination.next=null;
                    delete chara.destination;
                }
                //Cancel possible hold
                if (chara.hold) {
                    delete chara.AI;
                    delete chara.findNearbyTargets;
                    delete chara.hold;
                    Button.reset();
                }
                //Unit cannot attack will always choose move mode
                var attackOrMove=(chara.attack)?(selectedEnemy instanceof Gobj):false;
                //Attack mode
                if (attackOrMove) {
                    if (chara.cannotMove() && !(chara.isInAttackRange(selectedEnemy))) return;
                    //Intercept invisible enemy
                    if (selectedEnemy.isInvisible) {
                        Referee.voice.pError.play();
                        return;
                    }
                    chara.targetLock=true;
                    chara.attack(selectedEnemy);
                }
                //Move mode
                else {
                    if (chara.cannotMove()) return;
                    //Only attackable units can stop attack
                    if (chara.attack) chara.stopAttack();
                    //Lock destination by default
                    chara.targetLock=!unlock;
                    chara.moveTo(clickX+Map.offsetX,clickY+Map.offsetY);
                    //Record destination
                    if (Button.callback=='attack') {
                        chara.destination={x:clickX+Map.offsetX,y:clickY+Map.offsetY};
                    }
                    if (Button.callback=='patrol') {
                        //Patrol dead lock
                        chara.destination={x:clickX+Map.offsetX,y:clickY+Map.offsetY};
                        chara.destination.next={x:chara.posX(),y:chara.posY(),next:chara.destination};
                    }
                }
            }
        });
    },
    dblClick:function(){
        //Multi select same type units
        if (!Game.selectedUnit.isEnemy) {
            var charas=Unit.allOurUnits().filter(function(chara){
                return (chara.insideScreen()) && (chara.name==Game.selectedUnit.name);
            });
            Game.addIntoAllSelected(charas);
        }
    },
    //Can control all units
    toControlAll:function(){
        //Mouse left click
        $('#frontCanvas')[0].onclick=function(event){
            event.preventDefault();
            if (mouseController.drag) {
                //End drag, onclick triggered after onmouseup, don't do default left click action
                mouseController.drag=false;
            }
            else {
                mouseController.leftClick(event);
            }
        };
        //Mouse right click
        $('#frontCanvas')[0].oncontextmenu=function(event){
            //Prevent context menu show
            event.preventDefault();
            mouseController.rightClick(event);
            //Cancel pointer
            $('div.GameLayer').removeAttr('status');
            //Cancel callback
            Button.callback=null;
            //Cancel credit bill
            if (Resource.creditBill) delete Resource.creditBill;
        };
        //Double click
        $('#frontCanvas')[0].ondblclick=function(event){
            //Prevent screen select
            event.preventDefault();
            mouseController.dblClick();
        };
        //Mouse click start
        $('#frontCanvas')[0].onmousedown=function(event){
            event.preventDefault();
            if (!mouseController.down) {
                //Mouse at (clickX,clickY)
                var clickX=event.pageX-$('#frontCanvas').offset().left;
                var clickY=event.pageY-$('#frontCanvas').offset().top;
                mouseController.startPoint={x:clickX,y:clickY};
                mouseController.down=true;
            }
        };
        //Mouse drag
        $('#frontCanvas')[0].onmousemove=function(event){
            event.preventDefault();
            //Mouse at (clickX,clickY)
            var clickX=event.pageX-$('#frontCanvas').offset().left;
            var clickY=event.pageY-$('#frontCanvas').offset().top;
            if (mouseController.down) {
                mouseController.endPoint={x:clickX,y:clickY};
                if (Math.abs(clickX-mouseController.startPoint.x)>5 &&
                    Math.abs(clickY-mouseController.startPoint.y)>5) {
                    mouseController.drag=true;
                }
            }
        };
        //Global client refresh map
        window.onmousemove=function(event){
            event.preventDefault();
            //Mouse at (clickX,clickY)
            var clickX=event.clientX;
            var clickY=event.clientY;
            //Refresh
            if (clickX<Map.triggerMargin) Map.needRefresh="LEFT";
            if (clickX>(Game.HBOUND-Map.triggerMargin)) Map.needRefresh="RIGHT";
            if (clickY<Map.triggerMargin) Map.needRefresh="TOP";
            if (clickY>(Game.VBOUND-Map.triggerMargin)) Map.needRefresh="BOTTOM";
        };
        //Mouse click end
        $('#frontCanvas')[0].onmouseup=function(event){
            event.preventDefault();
            mouseController.down=false;
            if (mouseController.drag) {
                //Multi select inside rect
                Game.multiSelectInRect();
            }
        };
        //For mobile
        $('#frontCanvas')[0].ontouchstart=function(event){
            event.preventDefault();
            //Prevent desktop event
            $('#frontCanvas')[0].onclick=undefined;
            mouseController.leftClick(event.touches[0]);
        };
        $('#frontCanvas')[0].ontouchend=function(event){
            //Prevent context menu show
            event.preventDefault();
            //Prevent desktop event
            $('#frontCanvas')[0].oncontextmenu=undefined;
            mouseController.rightClick(event.changedTouches[0]);
            //Cancel handler
            $('div.GameLayer').removeAttr('status');
            Button.callback=null;
        };

        $('div#GamePlay div').on('contextmenu',function(event){
            event.preventDefault();
        });
        $('canvas[name="mini_map"]').on('click',function(event){
            event.preventDefault();
            Map.clickHandler(event);
        });
        $('canvas[name="mini_map"]').on('contextmenu',function(event){
            event.preventDefault();
            Map.dblClickHandler(event);
        });
    }
};