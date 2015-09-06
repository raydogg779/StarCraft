var Map={
    currentMap:'Switchback',//By default
    offsetX:0,
    offsetY:0,
    speed:40,
    triggerMargin:20,
    //To synchronize drawing map and units, will not refresh immediately
    needRefresh:false,
    fogFlag:true,
    fogType:true,//If true using gradient shadow, if false use 3 circles
    miniCxt:$('canvas[name="mini_map"]')[0].getContext('2d'),
    fogCanvas:document.createElement('canvas'),
    miniFogCanvas:document.createElement('canvas'),
    shadowCanvas:document.createElement('canvas'),//Pre-render for fog shadow
    insideStroke:{
        width:0,
        height:0
    },
    //Init map
    setCurrentMap:function(name){
        Map.currentMap=name;
        $('canvas[name="mini_map"]').attr('class',name);
        //Init inside stroke size
        Map.insideStroke.width=(130*Game.HBOUND/Map.getCurrentMap().width)>>0;
        Map.insideStroke.height=(130*Game.VBOUND/Map.getCurrentMap().height)>>0;
        //Init fog relative
        Map.fogCxt=Map.fogCanvas.getContext('2d');
        Map.miniFogCanvas.width=Map.miniFogCanvas.height=130;
        Map.miniFogCxt=Map.miniFogCanvas.getContext('2d');
        Map.shadowCanvas.width=Map.shadowCanvas.height=100;
        Map.shadowCxt=Map.shadowCanvas.getContext('2d');
        //Prepared fog shadow for quick render
        var radial=Map.shadowCxt.createRadialGradient(50,50,25,50,50,50);
        radial.addColorStop(0,'rgba(0,0,0,1)');
        radial.addColorStop(1,'rgba(0,0,0,0)');
        Map.shadowCxt.fillStyle=radial;
        Map.shadowCxt.beginPath();
        Map.shadowCxt.arc(50,50,50,0,Math.PI*2);
        Map.shadowCxt.fill();
    },
    getCurrentMap:function(){
        return sourceLoader.sources['Map_'+Map.currentMap];
    },
    refreshFog:function(){
        if (Map.fogFlag && Map.fogCxt && Map.miniFogCxt){
            //Brush black fog to clean old fog
            Map.fogCxt.fillStyle=Map.miniFogCxt.fillStyle='rgba(0,0,0,1)';
            Map.fogCxt.fillRect(0,0,Map.fogCanvas.width,Map.fogCanvas.height);
            Map.miniFogCxt.fillRect(0,0,130,130);
            //Other things have sight
            var parasitedEnemies=Unit.allEnemyUnits().filter(function(chara){
                return chara.buffer.Parasite;
            });
            var scannerSweeps=Burst.allEffects.filter(function(anime){
                return Animation.getName(anime)=="ScannerSweep";
            });
            var addInObjs=parasitedEnemies.concat(scannerSweeps);
            //Clear fog
            Map.fogCxt.globalCompositeOperation=Map.miniFogCxt.globalCompositeOperation='destination-out';
            //Draw fog
            Unit.allOurUnits().concat(Building.ourBuildings).concat(addInObjs).forEach(function(chara){
                //Clear fog on screen for our units inside screen
                if (chara.insideScreen()){
                    Map.fogCxt.fillStyle='rgba(0,0,0,1)';
                    var centerX=chara.posX()-Map.offsetX;
                    var centerY=chara.posY()-Map.offsetY;
                    if (Map.fogType){
                        var radius=chara.get('sight')<<1;//*2
                        Map.fogCxt.drawImage(Map.shadowCanvas,0,0,100,100,centerX-radius,centerY-radius,radius<<1,radius<<1);
                    }
                    else {
                        Map.fogCxt.beginPath();
                        Map.fogCxt.arc(centerX,centerY,chara.get('sight'),0,2*Math.PI);
                        Map.fogCxt.fill();
                        Map.fogCxt.fillStyle='rgba(0,0,0,0.6)';
                        Map.fogCxt.beginPath();
                        Map.fogCxt.arc(chara.posX()-Map.offsetX,chara.posY()-Map.offsetY,chara.get('sight')+100,0,2*Math.PI);
                        Map.fogCxt.fill();
                        Map.fogCxt.beginPath();
                        Map.fogCxt.arc(chara.posX()-Map.offsetX,chara.posY()-Map.offsetY,chara.get('sight')+200,0,2*Math.PI);
                        Map.fogCxt.fill();
                    }
                }
                //Clear fog on mini-map for all our units
                var offsetX=(chara.posX()*130/Map.getCurrentMap().width)>>0;
                var offsetY=(chara.posY()*130/Map.getCurrentMap().height)>>0;
                var sight=(chara.get('sight')*130/Map.getCurrentMap().height)>>0;
                Map.miniFogCxt.beginPath();
                if (Map.fogType){
                    Map.miniFogCxt.drawImage(Map.shadowCanvas,0,0,100,100,offsetX-(sight<<1),offsetY-(sight<<1),sight<<2,sight<<2);
                }
                else {
                    Map.miniFogCxt.beginPath();
                    Map.miniFogCxt.arc(offsetX,offsetY,sight,0,2*Math.PI);
                    Map.miniFogCxt.fill();
                }
            });
            Map.fogCxt.globalCompositeOperation=Map.miniFogCxt.globalCompositeOperation='source-over';
        }
    },
    drawFog:function(){
        if (Map.fogFlag && Map.fogCxt && Map.miniFogCxt){
            //Reduce calculation frequency for performance, every 1 sec
            if (Game._clock%10==0) Map.refreshFog();
            //Draw fog on main map, high frequency
            Game.frontCxt.drawImage(Map.fogCanvas,0,0);
        }
    },
    drawMiniFog:function(){
        if (Map.fogFlag && Map.miniFogCxt){
            //Draw fog on mini-map
            Map.miniCxt.drawImage(Map.miniFogCanvas,0,0);
        }
    },
    drawMud:function(){
        var _increments=[[0,1],[-1,0],[0,-1],[1,0]];
        //var _offsets=[[1,1],[-1,1],[1,-1],[-1,-1]];//4 circles radius
        /*var shadowOffsets=_$.mapTraverse(_offsets,function(x){
         return x*3;
         });*/
        var mudRadius=120;
        var mudIncrements=_$.mapTraverse(_increments,function(x){
            return x*mudRadius/2;
        });
        /*var mudOffsets=_$.mapTraverse(_offsets,function(x){
            return x*mudRadius/2;
        });*/
        Game.backCxt.save();
        Game.backCxt.beginPath();
        //Create fill style for mud
        var mudPattern=Game.backCxt.createPattern(sourceLoader.sources['Mud'],"repeat");
        Game.backCxt.fillStyle=mudPattern;
        /*Game.backCxt.shadowColor="#212";//"rgba(0,0,0,0.7)"
        Game.backCxt.shadowBlur=8;*/
        Building.allBuildings.filter(function(chara){
            return (chara instanceof Building.ZergBuilding) && !chara.noMud && chara.insideScreen();
        }).forEach(function(chara){
            var centerX=chara.posX()-Map.offsetX;
            var centerY=chara.posY()-Map.offsetY;
            var pos=[centerX+mudRadius,centerY-mudRadius];
            Game.backCxt.moveTo(pos[0],pos[1]);
            for(var M=0,angle=-Math.PI/4;M<4;M++,angle+=Math.PI/2){
                for(var N=0;N<5;N++){
                    Game.backCxt.arc(pos[0],pos[1],mudRadius/4,angle,angle+Math.PI/2);
                    if (N<4) {
                        pos[0]+=mudIncrements[M][0];
                        pos[1]+=mudIncrements[M][1];
                    }
                }
            }
            /*//Mud shape mixed by 4 circles
            mudOffsets.forEach(function(offset){
                Game.backCxt.moveTo(centerX+offset[0]+mudRadius,centerY+offset[1]);
                Game.backCxt.arc(centerX+offset[0],centerY+offset[1],mudRadius,0,Math.PI*2);
            });*/
        });
        //Stroke edge clearly
        Game.backCxt.strokeStyle="#212";
        Game.backCxt.lineWidth=3;
        Game.backCxt.stroke();
        //Fill mud
        Game.backCxt.fill();
        /*//Radius shadow
        shadowOffsets.forEach(function(offset){
            Game.backCxt.offsetX=offset[0];
            Game.backCxt.offsetY=offset[1];
            Game.backCxt.fill();
         });*/
        Game.backCxt.restore();
    },
    draw:function(){
        //Clear background
        Game.backCxt.clearRect(0,0,Game.HBOUND,Game.VBOUND);
        //Draw map as background
        Game.backCxt.drawImage(Map.getCurrentMap(),Map.offsetX,Map.offsetY,Game.HBOUND,Game.VBOUND-Game.infoBox.height+5,
            0,0,Game.HBOUND,Game.VBOUND-Game.infoBox.height+5);
        //Draw mud for ZergBuildings
        Map.drawMud();
    },
    refresh:function(direction){
        var edgeX=Map.getCurrentMap().width-Game.HBOUND;
        var edgeY=Map.getCurrentMap().height-Game.VBOUND+Game.infoBox.height-5;
        var onlyMap;
        switch (direction){
            case "LEFT":
                Map.offsetX-=Map.speed;
                if (Map.offsetX<0) Map.offsetX=0;
                break;
            case "RIGHT":
                Map.offsetX+=Map.speed;
                if (Map.offsetX>edgeX) Map.offsetX=edgeX;
                break;
            case "TOP":
                Map.offsetY-=Map.speed;
                if (Map.offsetY<0) Map.offsetY=0;
                break;
            case "BOTTOM":
                Map.offsetY+=Map.speed;
                if (Map.offsetY>edgeY) Map.offsetY=edgeY;
                break;
            case "MAP":
                onlyMap=true;
                break;
        }
        Map.draw();
        //Need re-calculate fog when screen moves
        if (!onlyMap) Map.refreshFog();
    },
    refreshMiniMap:function(){
        //Selected map size
        var mapWidth=Map.getCurrentMap().width;
        var mapHeight=Map.getCurrentMap().height;
        //Clear mini-map
        Map.miniCxt.clearRect(0,0,130,130);
        //Re-draw mini-map points
        var miniX,miniY,rectSize;
        Building.allBuildings.concat(Unit.allUnits).forEach(function(chara){
            miniX=(130*chara.x/mapWidth)>>0;
            miniY=(130*chara.y/mapHeight)>>0;
            Map.miniCxt.fillStyle=(chara.isEnemy)?'red':'lime';
            rectSize=(chara instanceof Building)?4:3;
            Map.miniCxt.fillRect(miniX,miniY,rectSize,rectSize);
        });
        //Re-draw fog on mini-map
        Map.drawMiniFog();
        //Re-draw inside stroke
        Map.miniCxt.strokeStyle='white';
        Map.miniCxt.lineWidth=2;
        Map.miniCxt.strokeRect((130*Map.offsetX/mapWidth)>>0,(130*Map.offsetY/mapHeight)>>0,Map.insideStroke.width,Map.insideStroke.height);
    },
    clickHandler:function(event){
        //Mouse at (clickX,clickY)
        var clickX=event.pageX-$('canvas[name="mini_map"]').offset().left;
        var clickY=event.pageY-$('canvas[name="mini_map"]').offset().top;
        //Relocate map center
        Map.relocateAt(Map.getCurrentMap().width*clickX/130,Map.getCurrentMap().height*clickY/130);
    },
    dblClickHandler:function(event){
        //Mouse at (clickX,clickY)
        var clickX=event.pageX-$('canvas[name="mini_map"]').offset().left;
        var clickY=event.pageY-$('canvas[name="mini_map"]').offset().top;
        //Map (clickX,clickY) to position (mapX,mapY) on map
        var mapX=Map.getCurrentMap().width*clickX/130;
        var mapY=Map.getCurrentMap().height*clickY/130;
        //Move selected units to (mapX,mapY)
        Unit.allOurUnits().filter(function(chara){
            return chara.selected;
        }).forEach(function(chara){
            if (chara.attack) chara.stopAttack();
            chara.targetLock=true;
            chara.moveTo(mapX,mapY);
        });
    },
    relocateAt:function(centerX,centerY){
        //Get map edge
        var edgeX=Map.getCurrentMap().width-Game.HBOUND;
        var edgeY=Map.getCurrentMap().height-Game.VBOUND+Game.infoBox.height-5;
        //Map (centerX,centerY) to position (offsetX,offsetY) on top-left in map
        var offsetX=(centerX-Game.HBOUND/2)>>0;
        if (offsetX<0) offsetX=0;
        if (offsetX>edgeX) offsetX=edgeX;
        var offsetY=(centerY-(Game.VBOUND-Game.infoBox.height+5)/2)>>0;
        if (offsetY<0) offsetY=0;
        if (offsetY>edgeY) offsetY=edgeY;
        //Relocate map
        Map.offsetX=offsetX;
        Map.offsetY=offsetY;
        Map.needRefresh=true;//For synchronize
    }
};