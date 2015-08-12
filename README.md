# StarCraft
HTML5 version for StarCraft game

## Version 1.0 includes below game elements:
* Different units for Zerg/Terran/Protoss complete
* All buildings for Zerg/Terran/Protoss complete
* Different maps, fog cover, ZergBuilding mud
* Different bullets and bursts from units
* Almost all magic animation and effect complete
* All upgrade effect complete
* Control panel, different buttons and icons complete
* Same cheat code as StarCraft complete
* Mouse and key control complete
* Basic level like campaign and tower defense complete
 ![image](https://github.com/gloomyson/StarCraft/raw/master/img/Demo/Demo.jpg)

## The structure of code:
### index.html
The game entrance HTML5 page

### css
All HTML styles needed to draw button/menu/portrait/map

### Characters
* **Gobj.js**  
The basic prototype for all the game types in StarCraft (move/stop/die/...)
* **Units.js**  
The basic prototype for all units, Units extends Gobj, and AttackableUnit extends Units (attack/turnTo/escape/reaction/AI/...)
* **Zerg.js**  
All Zerg units definition which extends Units
* **Terran.js**  
All Terran units definition which extends Units
* **Protoss.js**  
All Protoss units definition which extends Units
* **Hero.js**  
All heroes definition which extends Units
* **Neutral.js**  
All neutral creatures definition which extends Units
* **Building.js**  
All building definition which extends Gobj, some are attackable
* **Bullets.js**  
All bullets definition which extends Gobj
* **Burst.js**  
All burst effect definition which extends Gobj
* **Animation.js**  
All animation definition which extends Gobj
* **Magic.js**  
All magic definition
* **Upgrade.js**  
All upgrade definition
* **Button.js**  
All used button definition and bind their callbacks
* **Map.js**  
Map relative definition:  
Draw and move main map and mini map  
Draw fogs on 2 maps  
Draw special mud for Zerg buildings  
Map refresh and relocation  

### GameRule
* **Game.js**  
The intro part of this game:  
Controls the main drawing loop: draw units and bullets, draw magic animations and control panel, and will collect dead units as garbage  
Load all needed resource into memory  
Unit selection control  
Game layer switch: loading->levelSelect->Gaming->Win or Lose  
Message showing during game  
Redraw task when browser window resize  
* **Referee.js**  
Mr.Referee will continuously judge game conditions:  
  The announcement for resource insufficient or warning  
  Game win or lose judgement  
  Invisible units detect judgement  
  Unit HP/MP recover  
  Collision avoid  
  Switch between single selection and multiple selection  
* **Resource.js**  
Resource relative js: including query cost and pay bill for several types of resource (mine/gas/man/magic)
* **Cheat.js**  
Cheat code nearly the same as StarCraft, you can get resource freely or remove fog, upgrade all grades or full recovery, you can check this js by yourself
* **Levels.js**  
Basic levels to test this game, first 7 levels to test each units and buildings, campaign and Athena defence are basic RPG level

### Controller
* **mouseController.js**  
Enable user to control the game by mouse click, double click and dragging
* **keyController.js**  
Enable user to control the game by keyboard: shortcut keys, ENTER, shift and CTRL

### Utils
* **gFrame.js**  
The custom game framework for coding, use it for extends constructor, mixin objects or clone objects
* **sourceLoader.js**  
Load all needed source utility
* **jquery.min.js**  
Jquery framework

### Img
* **Charas**  
All sprite images needed to draw units/buildings/bullets/burst/magic
* **Menu**  
All sprite images needed to draw menus, icons and cursor
* **Maps**  
All background SC maps, and mini-map sprite image
* **Bg**  
Game layer background

### bgm
All needed sound effects, will later join them together and play each sound like sprite sound

## The original code version 0.1 at:
[http://www.nvhae.com/starcraft/](http://www.nvhae.com/starcraft/)
