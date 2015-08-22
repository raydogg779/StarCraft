var Levels=[
    {
        level:1,
        load:function(){
            //Load map
            Map.setCurrentMap('Switchback');
            Map.offsetX=50;
            Map.offsetY=50;
            //Apply race style
            Game.race.choose('Terran');
            //Load units
            new Terran.BattleCruiser({x:100,y:100});
            new Terran.Wraith({x:200,y:100});
            new Terran.BattleCruiser({x:100,y:200});
            new Terran.Wraith({x:200,y:200});
            new Terran.BattleCruiser({x:100,y:300});
            new Terran.Wraith({x:200,y:300});
            new Terran.SCV({x:100,y:400});
            new Zerg.Drone({x:150,y:400});
            new Protoss.Probe({x:200,y:400});
            //Add enemy
            new Terran.SCV({x:600,y:400,isEnemy:true});
            new Zerg.Mutalisk({x:700,y:100,isEnemy:true});
            new Zerg.Devourer({x:800,y:100,isEnemy:true});
            new Zerg.Guardian({x:900,y:100,isEnemy:true});
            new Zerg.Mutalisk({x:700,y:200,isEnemy:true});
            new Zerg.Devourer({x:800,y:200,isEnemy:true});
            new Zerg.Guardian({x:900,y:200,isEnemy:true});
            new Zerg.Mutalisk({x:700,y:300,isEnemy:true});
            new Zerg.Devourer({x:800,y:300,isEnemy:true});
            new Zerg.Guardian({x:900,y:300,isEnemy:true});
        }
    },
    {
        level:2,
        load:function(){
            //Load map
            Map.setCurrentMap('Volcanis');
            //Apply race style
            Game.race.choose('Zerg');
            //Load units
            new Zerg.Overlord({x:100,y:100});
            new Hero.HeroCruiser({x:100,y:200});
            new Terran.Civilian({x:100,y:300});
            new Zerg.Mutalisk({x:200,y:100});
            new Zerg.Devourer({x:200,y:200});
            new Zerg.Guardian({x:200,y:300});
            //Add enemy
            new Terran.Wraith({x:700,y:100,isEnemy:true});
            new Terran.Wraith({x:800,y:100,isEnemy:true});
            new Terran.Wraith({x:900,y:100,isEnemy:true});
            new Zerg.Mutalisk({x:700,y:200,isEnemy:true});
            new Zerg.Devourer({x:800,y:200,isEnemy:true});
            new Zerg.Guardian({x:900,y:200,isEnemy:true});
            new Zerg.Mutalisk({x:700,y:300,isEnemy:true});
            new Zerg.Devourer({x:800,y:300,isEnemy:true});
            new Zerg.Guardian({x:900,y:300,isEnemy:true});
        }
    },
    {
        level:3,
        load:function(){
            //Load map
            Map.setCurrentMap('TrenchWars');
            //Apply race style
            Game.race.choose('Zerg');
            //Load units
            new Neutral.Ragnasaur({x:100,y:100});
            new Neutral.Rhynsdon({x:200,y:100});
            new Neutral.Ursadon({x:100,y:200});
            new Neutral.Bengalaas({x:200,y:200});
            new Neutral.Scantid({x:100,y:300});
            new Neutral.Kakaru({x:200,y:300});
            new Zerg.Guardian({x:150,y:100});
            new Zerg.Guardian({x:150,y:200});
            new Zerg.Guardian({x:150,y:300});
            //Add enemy
            new Neutral.Ragnasaur({x:700,y:100,isEnemy:true});
            new Neutral.Rhynsdon({x:700,y:200,isEnemy:true});
            new Neutral.Ursadon({x:700,y:300,isEnemy:true});
            new Neutral.Bengalaas({x:800,y:100,isEnemy:true});
            new Neutral.Scantid({x:800,y:200,isEnemy:true});
            new Neutral.Kakaru({x:800,y:300,isEnemy:true});
            //new Zerg.Mutalisk({x:900,y:150,isEnemy:true});
            //new Zerg.Guardian({x:900,y:250,isEnemy:true});
        }
    },
    {
        level:4,
        load:function(){
            //Load map
            Map.setCurrentMap('BloodBath');
            //Apply race style
            Game.race.choose('Zerg');
            //Apply cheat for testing
            Cheat.execute('something for nothing');
            //Load units
            new Zerg.Drone({x:100,y:100});
            new Zerg.Zergling({x:200,y:100});
            new Zerg.Hydralisk({x:100,y:200});
            new Zerg.Scourge({x:200,y:200});
            new Zerg.Lurker({x:100,y:300});
            new Zerg.Ultralisk({x:200,y:300});
            new Zerg.Broodling({x:100,y:400});
            new Zerg.InfestedTerran({x:200,y:400});
            new Zerg.Queen({x:100,y:50});
            new Zerg.Defiler({x:200,y:50});
            new Hero.Sarah({x:100,y:150});
            new Zerg.Mutalisk({x:50,y:50});
            new Zerg.Guardian({x:50,y:150});
            new Zerg.Devourer({x:50,y:250});
            //Add enemy
            new Zerg.Drone({x:700,y:100,isEnemy:true});
            new Zerg.Zergling({x:700,y:200,isEnemy:true});
            new Zerg.Hydralisk({x:700,y:300,isEnemy:true});
            new Zerg.Scourge({x:800,y:100,isEnemy:true});
            new Zerg.Lurker({x:800,y:200,isEnemy:true});
            new Zerg.Ultralisk({x:800,y:300,isEnemy:true});
            new Zerg.Broodling({x:700,y:150,isEnemy:true});
            //new Zerg.InfestedTerran({x:700,y:250,isEnemy:true});
            new Zerg.Queen({x:800,y:150,isEnemy:true});
            new Zerg.Defiler({x:800,y:250,isEnemy:true});
        }
    },
    {
        level:5,
        load:function(){
            //Load map
            Map.setCurrentMap('OrbitalRelay');
            //Apply race style
            Game.race.choose('Terran');
            //Apply cheat for testing
            Cheat.execute('something for nothing');
            //Load units
            new Terran.Marine({x:100,y:100});
            new Terran.Firebat({x:200,y:100});
            new Terran.Ghost({x:100,y:200});
            new Terran.Vulture({x:200,y:200});
            new Terran.Tank({x:100,y:300});
            new Terran.Goliath({x:200,y:300});
            new Terran.Medic({x:100,y:400});
            new Terran.Dropship({x:200,y:400});
            new Terran.Vessel({x:100,y:50});
            new Terran.Valkyrie({x:200,y:50});
            new Hero.Kerrigan({x:100,y:150});
            new Terran.Wraith({x:200,y:150});
            new Terran.SCV({x:50,y:250});
            new Terran.BattleCruiser({x:150,y:250});
            //Add enemy
            new Terran.Marine({x:700,y:100,isEnemy:true});
            new Terran.Firebat({x:700,y:200,isEnemy:true});
            new Terran.Vulture({x:700,y:300,isEnemy:true});
            new Terran.Tank({x:800,y:100,isEnemy:true});
            new Terran.Goliath({x:800,y:200,isEnemy:true});
            new Terran.Dropship({x:800,y:300,isEnemy:true});
            new Terran.Vessel({x:700,y:150,isEnemy:true});
            new Terran.Valkyrie({x:700,y:250,isEnemy:true});
        }
    },
    {
        level:6,
        load:function(){
            //Load map
            Map.setCurrentMap('ThinIce');
            //Apply race style
            Game.race.choose('Protoss');
            //Apply cheat for testing
            Cheat.execute('something for nothing');
            //Load units
            new Protoss.Probe({x:100,y:100});
            new Protoss.Zealot({x:200,y:100});
            new Protoss.Dragoon({x:100,y:200});
            new Protoss.Templar({x:200,y:200});
            new Protoss.DarkTemplar({x:100,y:300});
            new Protoss.Reaver({x:200,y:300});
            new Protoss.Archon({x:100,y:400});
            new Protoss.DarkArchon({x:200,y:400});
            new Protoss.Shuttle({x:100,y:50});
            new Protoss.Observer({x:200,y:50});
            new Protoss.Observer({x:200,y:100});
            new Protoss.Arbiter({x:100,y:150});
            new Protoss.Scout({x:200,y:150});
            new Protoss.Carrier({x:100,y:250});
            new Protoss.Corsair({x:200,y:250});
            //Add enemy
            new Protoss.Probe({x:700,y:100,isEnemy:true});
            new Protoss.Zealot({x:700,y:200,isEnemy:true});
            new Protoss.Dragoon({x:700,y:300,isEnemy:true});
            new Protoss.Templar({x:800,y:100,isEnemy:true});
            new Protoss.DarkTemplar({x:800,y:200,isEnemy:true});
            new Protoss.Observer({x:800,y:300,isEnemy:true});
            //new Protoss.Reaver({x:800,y:300,isEnemy:true});
            new Protoss.Arbiter({x:700,y:250,isEnemy:true});
            new Protoss.Scout({x:750,y:250,isEnemy:true});
            new Protoss.Carrier({x:700,y:150,isEnemy:true});
            new Protoss.Corsair({x:700,y:200,isEnemy:true});
            //new Protoss.Carrier({x:700,y:250,isEnemy:true});
        }
    },
    {
        level:7,
        load:function(){
            //Load map
            Map.setCurrentMap('BigGameHunters');
            //Apply race style
            Game.race.choose('Protoss');
            //Add buildings
            //Zerg buildings
            new Building.ZergBuilding.Hatchery({x:0,y:520});
            new Building.ZergBuilding.Lair({x:0,y:670});
            new Building.ZergBuilding.Hive({x:0,y:820});
            new Building.ZergBuilding.CreepColony({x:150,y:520});
            new Building.ZergBuilding.SunkenColony({x:150,y:670});
            new Building.ZergBuilding.SporeColony({x:150,y:820,isEnemy:true});
            new Building.ZergBuilding.Extractor({x:300,y:520});
            new Building.ZergBuilding.SpawningPool({x:300,y:670});
            new Building.ZergBuilding.EvolutionChamber({x:300,y:820});
            new Building.ZergBuilding.HydraliskDen({x:450,y:520});
            new Building.ZergBuilding.Spire({x:450,y:670});
            new Building.ZergBuilding.GreaterSpire({x:450,y:820});
            new Building.ZergBuilding.QueenNest({x:600,y:520});
            new Building.ZergBuilding.NydusCanal({x:600,y:670});
            new Building.ZergBuilding.UltraliskCavern({x:600,y:820});
            new Building.ZergBuilding.DefilerMound({x:750,y:520});
            new Building.ZergBuilding.InfestedBase({x:750,y:670});
            new Building.ZergBuilding.OvermindI({x:750,y:820});
            new Building.ZergBuilding.OvermindII({x:900,y:520});
            //Terran buildings
            new Building.TerranBuilding.CommandCenter({x:0,y:1020});
            new Building.TerranBuilding.SupplyDepot({x:0,y:1170,isEnemy:true});
            new Building.TerranBuilding.Refinery({x:0,y:1320});
            new Building.TerranBuilding.Barracks({x:150,y:1020});
            new Building.TerranBuilding.EngineeringBay({x:150,y:1170});
            new Building.TerranBuilding.MissileTurret({x:150,y:1320});
            new Building.TerranBuilding.Academy({x:300,y:1020});
            new Building.TerranBuilding.Bunker({x:300,y:1170});
            new Building.TerranBuilding.Factory({x:300,y:1320});
            new Building.TerranBuilding.Starport({x:450,y:1020});
            new Building.TerranBuilding.ScienceFacility({x:450,y:1170});
            new Building.TerranBuilding.Armory({x:450,y:1320});
            new Building.TerranBuilding.ComstatStation({x:600,y:1020});
            new Building.TerranBuilding.NuclearSilo({x:600,y:1170});
            new Building.TerranBuilding.MachineShop({x:600,y:1320});
            new Building.TerranBuilding.ControlTower({x:750,y:1020});
            new Building.TerranBuilding.PhysicsLab({x:750,y:1170});
            new Building.TerranBuilding.ConvertOps({x:750,y:1320});
            new Building.TerranBuilding.CrashCruiser({x:900,y:1020});
            new Building.TerranBuilding.BigCannon({x:900,y:1170});
            //Protoss buildings
            new Building.ProtossBuilding.Nexus({x:0,y:20});
            new Building.ProtossBuilding.Pylon({x:0,y:170,isEnemy:true});
            new Building.ProtossBuilding.Assimilator({x:0,y:320});
            new Building.ProtossBuilding.Gateway({x:150,y:20});
            new Building.ProtossBuilding.Forge({x:150,y:170});
            new Building.ProtossBuilding.PhotonCannon({x:150,y:320});
            new Building.ProtossBuilding.CyberneticsCore({x:300,y:20});
            new Building.ProtossBuilding.ShieldBattery({x:300,y:170});
            new Building.ProtossBuilding.RoboticsFacility({x:300,y:320});
            new Building.ProtossBuilding.StarGate({x:450,y:20});
            new Building.ProtossBuilding.CitadelOfAdun({x:450,y:170});
            new Building.ProtossBuilding.RoboticsSupportBay({x:450,y:320});
            new Building.ProtossBuilding.FleetBeacon({x:600,y:20});
            new Building.ProtossBuilding.TemplarArchives({x:600,y:170});
            new Building.ProtossBuilding.Observatory({x:600,y:320});
            new Building.ProtossBuilding.ArbiterTribunal({x:750,y:20});
            new Building.ProtossBuilding.TeleportGate({x:750,y:170});
            new Building.ProtossBuilding.Pyramid({x:750,y:320});
            new Building.ProtossBuilding.TeleportPoint({x:900,y:20});
        }
    },
    {
        level:8,
        label:'Campaign',
        load:function(){
            //Load map
            Map.setCurrentMap('TheHunters');
            Map.offsetX=0;
            Map.offsetY=3424;
            //Apply race style
            Game.race.choose('Terran');
            //Apply cheat
            Cheat.execute('black sheep wall');
            //Our buildings and units
            new Building.ZergBuilding.OvermindI({x:662,y:3828});
            new Building.ZergBuilding.OvermindII({x:300,y:3694});
            new Building.TerranBuilding.CrashCruiser({x:820,y:3600});
            new Building.TerranBuilding.BigCannon({x:260,y:3560});
            new Building.ProtossBuilding.Pyramid({x:560,y:3690});
            new Building.ProtossBuilding.TeleportGate({x:560,y:3558});
            new Building.ProtossBuilding.TeleportPoint({x:534,y:3884});
            new Hero.HeroCruiser({x:300,y:3455});
            new Hero.HeroCruiser({x:690,y:3500});
            new Hero.HeroCruiser({x:866,y:3744});
            new Hero.Sarah({x:434,y:3600});
            new Hero.Sarah({x:700,y:3730});
            new Hero.Kerrigan({x:464,y:3568});
            new Hero.Kerrigan({x:694,y:3690});
            new Protoss.Observer({x:484,y:3824});
            new Protoss.Observer({x:524,y:3824});
            //Zerg
            new Building.ZergBuilding.Hatchery({x:3470,y:3720,isEnemy:true});
            new Building.ZergBuilding.Lair({x:3265,y:3795,isEnemy:true});
            new Building.ZergBuilding.Hive({x:3650,y:3700,isEnemy:true});
            new Building.ZergBuilding.CreepColony({x:3488,y:3552,isEnemy:true});
            new Building.ZergBuilding.CreepColony({x:3264,y:3552,isEnemy:true});
            new Building.ZergBuilding.SunkenColony({x:3328,y:3552,isEnemy:true});
            new Building.ZergBuilding.SunkenColony({x:3392,y:3552,isEnemy:true});
            new Building.ZergBuilding.SporeColony({x:3136,y:3552,isEnemy:true});
            new Building.ZergBuilding.Extractor({x:3420,y:3800,isEnemy:true});
            new Building.ZergBuilding.SpawningPool({x:3440,y:3616,isEnemy:true});
            new Building.ZergBuilding.EvolutionChamber({x:3248,y:3616,isEnemy:true});
            new Building.ZergBuilding.HydraliskDen({x:3344,y:3616,isEnemy:true});
            new Building.ZergBuilding.Spire({x:3744,y:3552,isEnemy:true});
            new Building.ZergBuilding.GreaterSpire({x:3808,y:3616,isEnemy:true});
            new Building.ZergBuilding.QueenNest({x:3728,y:3616,isEnemy:true});
            new Building.ZergBuilding.NydusCanal({x:3200,y:3552,isEnemy:true});
            new Building.ZergBuilding.UltraliskCavern({x:3824,y:3520,isEnemy:true});
            new Building.ZergBuilding.DefilerMound({x:3104,y:3776,isEnemy:true});
            new Building.ZergBuilding.InfestedBase({x:3264,y:3920,isEnemy:true});
            new Zerg.Drone({x:3828,y:3724,isEnemy:true});
            new Zerg.Drone({x:3832,y:3826,isEnemy:true});
            new Zerg.Drone({x:3700,y:3850,isEnemy:true});
            new Zerg.Zergling({x:3473,y:3500,isEnemy:true});
            new Zerg.Zergling({x:3541,y:3535,isEnemy:true});
            new Zerg.Hydralisk({x:3314,y:3500,isEnemy:true});
            new Zerg.Hydralisk({x:3353,y:3500,isEnemy:true});
            new Zerg.Overlord({x:3044,y:3632,isEnemy:true});
            new Zerg.Overlord({x:3522,y:3438,isEnemy:true});
            new Zerg.Mutalisk({x:3135,y:3615,isEnemy:true});
            new Zerg.Mutalisk({x:3870,y:3596,isEnemy:true});
            new Zerg.Devourer({x:3292,y:3675,isEnemy:true});
            new Zerg.Devourer({x:3644,y:3535,isEnemy:true});
            new Zerg.Guardian({x:3138,y:3675,isEnemy:true});
            new Zerg.Guardian({x:3580,y:3585,isEnemy:true});
            new Zerg.Scourge({x:3154,y:3490,isEnemy:true});
            new Zerg.Scourge({x:3213,y:3668,isEnemy:true});
            new Zerg.Lurker({x:3260,y:3500,isEnemy:true});
            new Zerg.Lurker({x:3408,y:3500,isEnemy:true});
            new Zerg.Ultralisk({x:3638,y:3463,isEnemy:true});
            new Zerg.Broodling({x:3602,y:3666,isEnemy:true});
            new Zerg.InfestedTerran({x:3184,y:3950,isEnemy:true});
            new Zerg.Queen({x:3647,y:3610,isEnemy:true});
            new Zerg.Defiler({x:3047,y:3710,isEnemy:true});
            //Terran
            new Building.TerranBuilding.CommandCenter({x:320,y:180,isEnemy:true});
            new Building.TerranBuilding.ComstatStation({x:434,y:220,isEnemy:true});
            new Building.TerranBuilding.SupplyDepot({x:368,y:416,isEnemy:true});
            new Building.TerranBuilding.SupplyDepot({x:464,y:416,isEnemy:true});
            new Building.TerranBuilding.SupplyDepot({x:368,y:480,isEnemy:true});
            new Building.TerranBuilding.SupplyDepot({x:464,y:480,isEnemy:true});
            new Building.TerranBuilding.Refinery({x:96,y:246,isEnemy:true});
            new Building.TerranBuilding.Barracks({x:576,y:432,isEnemy:true});
            new Building.TerranBuilding.EngineeringBay({x:576,y:336,isEnemy:true});
            new Building.TerranBuilding.MissileTurret({x:384,y:576,isEnemy:true});
            new Building.TerranBuilding.MissileTurret({x:544,y:576,isEnemy:true});
            new Building.TerranBuilding.Academy({x:272,y:416,isEnemy:true});
            new Building.TerranBuilding.Bunker({x:636,y:556,isEnemy:true});
            new Building.TerranBuilding.Bunker({x:764,y:460,isEnemy:true});
            new Building.TerranBuilding.Factory({x:732,y:220,isEnemy:true});
            new Building.TerranBuilding.MachineShop({x:832,y:256,isEnemy:true});
            new Building.TerranBuilding.Starport({x:732,y:316,isEnemy:true});
            new Building.TerranBuilding.ControlTower({x:832,y:352,isEnemy:true});
            new Building.TerranBuilding.ScienceFacility({x:60,y:390,isEnemy:true});
            new Building.TerranBuilding.PhysicsLab({x:160,y:416,isEnemy:true});
            new Building.TerranBuilding.Armory({x:272,y:480,isEnemy:true});
            new Terran.SCV({x:246,y:116,isEnemy:true});
            new Terran.SCV({x:400,y:114,isEnemy:true});
            new Terran.SCV({x:222,y:220,isEnemy:true});
            new Terran.Marine({x:816,y:528,isEnemy:true});
            new Terran.Marine({x:726,y:590,isEnemy:true});
            new Terran.Firebat({x:692,y:618,isEnemy:true});
            new Terran.Firebat({x:846,y:526,isEnemy:true});
            new Terran.Ghost({x:690,y:530,isEnemy:true});
            new Terran.Medic({x:725,y:528,isEnemy:true});
            new Terran.Vulture({x:918,y:373,isEnemy:true});
            new Terran.Vulture({x:920,y:512,isEnemy:true});
            new Terran.Tank({x:922,y:325,isEnemy:true});
            new Terran.Tank({x:920,y:468,isEnemy:true});
            new Terran.Goliath({x:918,y:270,isEnemy:true});
            new Terran.Goliath({x:940,y:420,isEnemy:true});
            new Terran.Wraith({x:672,y:400,isEnemy:true});
            new Terran.Wraith({x:728,y:400,isEnemy:true});
            new Terran.Dropship({x:475,y:548,isEnemy:true});
            new Terran.Vessel({x:692,y:472,isEnemy:true});
            new Terran.BattleCruiser({x:500,y:326,isEnemy:true});
            new Terran.BattleCruiser({x:580,y:510,isEnemy:true});
            new Terran.Valkyrie({x:790,y:400,isEnemy:true});
            new Terran.Valkyrie({x:854,y:400,isEnemy:true});
            new Terran.Civilian({x:400,y:350,isEnemy:true});
            new Terran.Civilian({x:580,y:250,isEnemy:true});
            //Protoss
            new Building.ProtossBuilding.Nexus({x:3614,y:222,isEnemy:true});
            new Building.ProtossBuilding.Pylon({x:3296,y:512,isEnemy:true});
            new Building.ProtossBuilding.Pylon({x:3424,y:288,isEnemy:true});
            new Building.ProtossBuilding.Pylon({x:3648,y:512,isEnemy:true});
            new Building.ProtossBuilding.Assimilator({x:3582,y:86,isEnemy:true});
            new Building.ProtossBuilding.Gateway({x:3648,y:624,isEnemy:true});
            new Building.ProtossBuilding.Forge({x:3504,y:448,isEnemy:true});
            new Building.ProtossBuilding.PhotonCannon({x:3200,y:448,isEnemy:true});
            new Building.ProtossBuilding.PhotonCannon({x:3200,y:608,isEnemy:true});
            new Building.ProtossBuilding.PhotonCannon({x:3392,y:608,isEnemy:true});
            new Building.ProtossBuilding.CyberneticsCore({x:3760,y:448,isEnemy:true});
            new Building.ProtossBuilding.ShieldBattery({x:3728,y:544,isEnemy:true});
            new Building.ProtossBuilding.RoboticsFacility({x:3344,y:224,isEnemy:true});
            new Building.ProtossBuilding.StarGate({x:3232,y:304,isEnemy:true});
            new Building.ProtossBuilding.CitadelOfAdun({x:3632,y:408,isEnemy:true});
            new Building.ProtossBuilding.RoboticsSupportBay({x:3344,y:384,isEnemy:true});
            new Building.ProtossBuilding.FleetBeacon({x:3438,y:182,isEnemy:true});
            new Building.ProtossBuilding.TemplarArchives({x:3504,y:544,isEnemy:true});
            new Building.ProtossBuilding.Observatory({x:3504,y:320,isEnemy:true});
            new Building.ProtossBuilding.ArbiterTribunal({x:3216,y:192,isEnemy:true});
            new Protoss.Probe({x:3668,y:202,isEnemy:true});
            new Protoss.Probe({x:3794,y:244,isEnemy:true});
            new Protoss.Probe({x:3796,y:338,isEnemy:true});
            new Protoss.Zealot({x:3535,y:640,isEnemy:true});
            new Protoss.Zealot({x:3635,y:736,isEnemy:true});
            new Protoss.Dragoon({x:3536,y:688,isEnemy:true});
            new Protoss.Dragoon({x:3585,y:720,isEnemy:true});
            new Protoss.Templar({x:3472,y:655,isEnemy:true});
            new Protoss.DarkTemplar({x:3730,y:712,isEnemy:true});
            new Protoss.Reaver({x:3358,y:475,isEnemy:true});
            new Protoss.Archon({x:3478,y:722,isEnemy:true});
            new Protoss.DarkArchon({x:3780,y:636,isEnemy:true});
            new Protoss.Shuttle({x:3296,y:612,isEnemy:true});
            new Protoss.Observer({x:3250,y:398,isEnemy:true});
            new Protoss.Observer({x:3378,y:692,isEnemy:true});
            new Protoss.Arbiter({x:3350,y:296,isEnemy:true});
            new Protoss.Scout({x:3132,y:390,isEnemy:true});
            new Protoss.Scout({x:3100,y:636,isEnemy:true});
            new Protoss.Carrier({x:3102,y:470,isEnemy:true});
            new Protoss.Corsair({x:3106,y:580,isEnemy:true});
            new Protoss.Corsair({x:3838,y:544,isEnemy:true});
        }
    },
    {
        level:9,
        label:'ProtectAthena',
        load:function(){
            //Load map
            Map.setCurrentMap('OrbitalRelay');
            Map.offsetX=(1536-Game.HBOUND/2)>>0;
            Map.offsetY=(1536-Game.VBOUND/2)>>0;
            Map.fogFlag=false;
            //Apply race style
            Game.race.choose('Protoss');
            //Add our buildings and units
            //Override
            Building.ProtossBuilding.Pyramid.prototype.HP=3000;
            Building.ProtossBuilding.Pyramid.prototype.SP=3000;
            Building.ProtossBuilding.Pyramid.prototype.detector=Gobj.detectorBuffer;
            //Patch: Overlord speed up
            Upgrade.EvolvePneumatizedCarapace.effect(true);
            Upgrade.IncreaseCarrierCapacity.effect(true);
            var Pyramid=new Building.ProtossBuilding.Pyramid({x:1450,y:1480});
            for (var N=0;N<6;N++){
                new Hero.HeroCruiser({x:1470,y:1500});
            }
            //Override win and lose condition
            Referee.winCondition=function(){
                return false;
            };
            Referee.loseCondition=function(){
                return Pyramid.status=='dead';//Closure
            };
            //Enemy coming
            var offsets=[{x:1536,y:36},{x:1536,y:3036},{x:36,y:1536},{x:3036,y:1536},
                {x:486,y:486},{x:486,y:2586},{x:2586,y:486},{x:2586,y:2586}];
            var num=0, wave=1;
            var interval=20000;//20 seconds per wave
            _$.traverse([Neutral,Zerg,Terran,Protoss],function(enemyType){
                setTimeout(function(){
                    offsets.forEach(function(offset){
                        offset.isEnemy=true;
                        new enemyType(offset).attackGround({x:1536,y:1536});
                    });
                    Game.showWarning('Wave '+ wave++ +': '+enemyType.prototype.name);
                },interval*num++);
            });
            //Game win when time reach
            setTimeout(function(){
                Game.win();
            },interval*num+interval);
        }
    }
];