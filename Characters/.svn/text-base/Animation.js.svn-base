//Alias
var Animation=Burst;
Animation.getAllAnimations=function(){
    var allAnimes=[];
    for (var attr in Animation){
        if (Animation[attr].super===Animation) allAnimes.push(Animation[attr]);
    }
    return allAnimes;
};
Animation.getName=function(anime){
    for (var attr in Animation){
        //Should be animation constructor firstly
        if (Animation[attr].super===Animation && (anime instanceof Animation[attr])) return attr;
    }
};

Animation.RightClickCursor=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Burst",
        imgPos:{
            burst:{
                left:[0, 44, 88, 132],
                top:[1087,1087,1087,1087]
            }
        },
        width:44,
        height:28,
        frame:{
            burst:4
        }
    }
});
Animation.PsionicStorm=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[0, 188, 376, 564, 0, 188, 376, 564, 0, 188, 376, 564, 0, 188],
                top:[0, 0, 0, 0, 153, 153, 153, 153, 306, 306, 306, 306, 459, 459]
            }
        },
        width:188,
        height:153,
        scale:1.2,
        duration:7000,
        frame:{
            burst:14
        }
    }
});
Animation.Hallucination=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[752, 815, 878, 941, 1004, 1067, 1130, 1193, 1256, 752, 815, 878, 941, 1004, 1067, 1130, 1193, 1256],
                top:[0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 63, 63, 63, 63, 63, 63, 63, 63]
            }
        },
        width:63,
        height:63,
        above:true,
        frame:{
            burst:18
        }
    }
});
Animation.Consume=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[752, 826, 900, 974, 1048, 1122, 1196, 1270, 1344, 752, 826, 900, 974, 1048, 1122, 1196, 1270, 1344],
                top:[126, 126, 126, 126, 126, 126, 126, 126, 126, 196, 196, 196, 196, 196, 196, 196, 196, 196]
            }
        },
        width:74,
        height:70,
        above:true,
        autoSize:true,
        frame:{
            burst:18
        }
    }
});
Animation.StasisField=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:376,
                top:459
            }
        },
        width:130,
        height:110,
        above:true,
        autoSize:'MAX',
        scale:1.25,
        duration:30000,
        frame:{
            burst:1
        }
    }
});
Animation.Lockdown=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[330, 0, 110, 220, 330, 0, 0, 0, 110, 220, 330, 0, 110, 220],
                top:[723, 834, 834, 834, 834, 945, 0, 612, 612, 612, 612, 723, 723, 723]
            }
        },
        width:110,
        height:111,
        above:true,
        autoSize:'MAX',
        duration:60000,
        frame:{
            burst:6
        }
    }
});
Animation.DarkSwarm=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[1260, 752, 1006, 1260, 752, 0, 752, 1006, 1260, 752, 1006],
                top:[456, 645, 645, 645, 834, 0, 267, 267, 267, 456, 456]
            }
        },
        width:254,
        height:189,
        scale:1.2,
        duration:60000,
        frame:{
            burst:5
        }
    }
});
Animation.Plague=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[1144, 1274, 1404, 754, 884, 1014, 1144, 1274, 1404, 754, 884, 1014, 1144, 1274],
                top:[892, 892, 892, 1022, 1022, 1022, 1022, 1022, 1022, 1152, 1152, 1152, 1152, 1152]
            }
        },
        width:130,
        height:130,
        scale:1.2,
        frame:{
            burst:14
        }
    }
});
Animation.PurpleEffect=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[440, 499, 558, 617],
                top:[902,902,902,902]
            }
        },
        width:59,
        height:60,
        above:true,
        autoSize:'MIN',
        duration:30000,
        frame:{
            burst:4
        }
    }
});
Animation.RedEffect=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[1006, 1068, 1130, 1192],
                top:[836,836,836,836]
            }
        },
        width:62,
        height:50,
        above:true,
        autoSize:'MIN',
        duration:30000,
        frame:{
            burst:4
        }
    }
});
Animation.GreenEffect=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[1256, 1313, 1370, 1427],
                top:[836,836,836,836]
            }
        },
        width:57,
        height:46,
        above:true,
        autoSize:'MIN',
        duration:30000,
        frame:{
            burst:4
        }
    }
});
Animation.Ensnare=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[0, 131, 262, 393, 524, 0, 131, 262, 393, 524, 0, 131, 262, 393, 524],
                top:[1056, 1056, 1056, 1056, 1056, 1181, 1181, 1181, 1181, 1181, 1306, 1306, 1306, 1306, 1306]
            }
        },
        width:131,
        height:125,
        scale:1.2,
        frame:{
            burst:15
        }
    }
});
Animation.ScannerSweep=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[656, 656, 656, 656, 704, 704, 704, 704],
                top:[1092, 1140, 1188, 1236, 1092, 1140, 1188, 1236]
            }
        },
        width:48,
        height:48,
        scale:3,
        duration:10000,
        frame:{
            burst:8
        }
    }
});
Animation.Feedback=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[655, 730, 805, 880, 955, 1030, 1105, 1180, 1255, 1330],
                top:[1284, 1284, 1284, 1284, 1284, 1284, 1284, 1284, 1284, 1284]
            }
        },
        width:75,
        height:75,
        above:true,
        autoSize:true,
        frame:{
            burst:10
        }
    }
});
Animation.MindControl=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[658, 720, 782, 844, 906, 968, 1030, 1092, 1154, 1216, 1278, 1340],
                top:[1378, 1378, 1378, 1378, 1378, 1378, 1378, 1378, 1378, 1378, 1378, 1378]
            }
        },
        width:62,
        height:40,
        above:true,
        autoSize:true,
        frame:{
            burst:12
        }
    }
});
Animation.RechargeShields=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[0, 64, 128, 192, 256, 320, 384, 448, 0, 64, 128, 192, 256, 320, 384, 448],
                top:[1432, 1432, 1432, 1432, 1432, 1432, 1432, 1432, 1496, 1496, 1496, 1496, 1496, 1496, 1496, 1496]
            }
        },
        width:64,
        height:64,
        above:true,
        autoSize:true,
        frame:{
            burst:16
        }
    }
});
Animation.DisruptionWeb=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[1088,1088,1242,1242,1392,1392],
                top:[1432,1432,1432,1432,1432,1432]
            }
        },
        width:154,
        height:112,
        scale:1.2,
        duration:25000,
        frame:{
            burst:6
        }
    }
});
Animation.DefensiveMatrix=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[0, 130, 260, 390, 520, 0, 130, 260, 390, 520],
                top:[1560, 1560, 1560, 1560, 1560, 1690, 1690, 1690, 1690, 1690]
            }
        },
        width:130,
        height:130,
        above:true,
        autoSize:true,
        duration:60000,
        frame:{
            burst:10
        }
    }
});
Animation.MaelStorm=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[650, 780, 910, 1040, 1170, 650, 780, 910, 1040, 1170],
                top:[1560, 1560, 1560, 1560, 1560, 1690, 1690, 1690, 1690, 1690]
            }
        },
        width:130,
        height:130,
        above:true,
        autoSize:true,
        duration:18000,//Normal 12 sec
        frame:{
            burst:10
        }
    }
});
Animation.BurningCircle=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[0, 112, 224, 336, 448, 560],
                top:[1820, 1820, 1820, 1820, 1820, 1820]
            }
        },
        width:112,
        height:126,
        above:true,
        autoSize:true,
        duration:18000,
        frame:{
            burst:6
        }
    }
});
Animation.Irradiate=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[668, 792, 916, 1042, 1172],
                top:[1820,1820,1820,1820,1820]
            }
        },
        width:126,
        height:110,
        above:true,
        autoSize:true,
        duration:30000,
        frame:{
            burst:5
        }
    }
});
Animation.Recall=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[0, 86, 188, 282, 386, 488, 588, 688, 788, 894],
                top:[1938, 1938, 1938, 1938, 1938, 1938, 1938, 1938, 1938, 1938]
            }
        },
        width:98,
        height:98,
        frame:{
            burst:10
        }
    }
});
Animation.Ice=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[1024, 1164, 1304, 1444],
                top:[1942,1942,1942,1942]
            }
        },
        width:78,
        height:88,
        above:true,
        autoSize:true,
        duration:30000,
        frame:{
            burst:4
        }
    }
});
Animation.EMPShockwave=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[0, 180, 356, 534, 708, 886, 1068],
                top:[2038, 2038, 2038, 2038, 2038, 2038, 2038]
            }
        },
        width:180,
        height:146,
        scale:1.5,
        frame:{
            burst:7
        }
    }
});
Animation.StasisFieldSpell=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[1384, 1250, 1250, 1384],
                top:[2044, 2044, 2044, 2044]
            }
        },
        width:128,
        height:84,
        frame:{
            burst:4
        }
    }
});
Animation.MaelStormSpell=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[1384, 1250, 1250, 1384],
                top:[2134, 2134, 2134, 2134]
            }
        },
        width:128,
        height:84,
        frame:{
            burst:4
        }
    }
});
Animation.Restoration=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[0, 128, 256, 384, 512, 640, 768, 896, 0, 128, 256, 384, 512, 640, 768, 896],
                top:[2190, 2190, 2190, 2190, 2190, 2190, 2190, 2190, 2318, 2318, 2318, 2318, 2318, 2318, 2318, 2318]
            }
        },
        width:128,
        height:128,
        above:true,
        autoSize:true,
        frame:{
            burst:16
        }
    }
});
Animation.Shockwave=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[0, 135, 270, 405, 540, 675, 810, 945, 1080, 1215, 1350],
                top:[2446, 2446, 2446, 2446, 2446, 2446, 2446, 2446, 2446, 2446, 2446]
            }
        },
        width:135,
        height:120,
        frame:{
            burst:11
        }
    }
});
Animation.NuclearStrike=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left:[0, 154, 308, 462, 616, 770, 924, 1078, 1232, 1386, 0, 154, 308, 462, 616, 770, 924, 1078, 1232, 1386],
                top:[2562,2562,2562,2562,2562,2562,2562,2562,2562,2562,2716,2716,2716,2716,2716,2716,2716,2716,2716,2716]
            }
        },
        width:154,
        height:154,
        scale:2.5,
        frame:{
            burst:20
        }
    }
});

Animation.EvolveGroundUnit=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left: [524, 562, 600, 638, 676, 714, 524, 562, 600, 638, 676, 714],
                top: [724, 724, 724, 724, 724, 724, 766, 766, 766, 766, 766, 766]
            }
        },
        width:38,
        height:43,
        frame:{
            burst:12
        }
    }
});
Animation.EvolveFlyingUnit=Animation.extends({
    constructorPlus:function(props){
        //Nothing
    },
    prototypePlus:{
        //Add basic unit info
        name:"Magic",
        imgPos:{
            burst:{
                left: [438, 501, 564, 627, 690, 438, 501, 564, 627],
                top: [810, 810, 810, 810, 810, 855, 855, 855, 855]
            }
        },
        width:63,
        height:46,
        frame:{
            burst:9
        }
    }
});