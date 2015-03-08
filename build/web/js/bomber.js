var game = new Phaser.Game(672, 480, Phaser.AUTO, 'game',
{preload: preload, create: create, update: update, move: move, checkKeys: checkKeys, checkDirection: checkDirection, turn: turn});

var bombs;

var map = null;
var layer = null;
var marker = new Phaser.Point();
var turnPoint = new Phaser.Point();
var directions = [null, null, null, null, null];
var opposites = [Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP];
var Zombie1 = null;
var Zombie2 = null;
var Zombie3 = null;
var Zombie4 = null;
var Zombie5 = null;
var player = null;
var speed = 150;
var current = Phaser.UP;
var cursors = null;
var turning = null;
var spaceKey = null;
var detKey = null;
var bombCG = null;
var bombPointer = null;
var baddieCounter = 5;


// note: graphics copyright 2015 Photon Storm Ltd
function preload() {    
    game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tiles.png');
    this.load.image('bomb', 'assets/bomb.png');
    /*this.load.image('firstaid', 'assets/firstaid.png'); 
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);*/
    game.load.spritesheet('baddie','assets/baddie.png', 32,32);
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('explosion', 'assets/explosion17.png', 64, 64);
}

function create() {

    map = game.add.tilemap('map');
    map.addTilesetImage('tiles', 'tiles');
    layer = map.createLayer('Tile Layer 1');
    
    map.setCollision(6, true, this.layer);
    Zombie1 = game.add.sprite(32*5.5, 32*1.5, 'baddie', 2);
    Zombie2 = game.add.sprite(32*5.5, 32*7.5, 'baddie', 2);
    Zombie3 = game.add.sprite(32*5.5, 32*5.5, 'baddie', 2);
    Zombie4 = game.add.sprite(32*3.5, 32*4.5, 'baddie', 2);
    Zombie1.animations.add('left',[0,1],10,true);
    Zombie1.animations.add('right',[2,3],10,true);
    Zombie1.anchor.set(.5);
    Zombie1.scale.set(1, .50);
    Zombie2.animations.add('left',[0,1],10,true);
    Zombie2.animations.add('right',[2,3],10,true);
    Zombie2.anchor.set(.5);
    Zombie2.scale.set(1, .66);
    Zombie3.animations.add('left',[0,1],10,true);
    Zombie3.animations.add('right',[2,3],10,true);
    Zombie3.anchor.set(.5);
    Zombie3.scale.set(1, .50);
    Zombie4.animations.add('left',[0,1],10,true);
    Zombie4.animations.add('right',[2,3],10,true);
    Zombie4.anchor.set(.5);
    Zombie4.scale.set(1, .50);
    Zombie5 = game.add.sprite(32*5.5, 32*4.5, 'baddie', 2);
    Zombie5.animations.add('left',[0,1],10,true);
    Zombie5.animations.add('right',[2,3],10,true);
    Zombie5.anchor.set(.5);
    Zombie5.scale.set(1, .66);

 
    player = game.add.sprite(48, 48, 'dude', 4);
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    player.anchor.set(0.5);
    player.scale.set(1, .66);
    
    game.physics.arcade.enable(player);
    //game.physics.arcade.enable(bomb);
    player.physics.arcade.body.immovable = true;
    
    
    cursors = game.input.keyboard.createCursorKeys();
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    detKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
    game.physics.arcade.enable(Zombie1);
    game.physics.arcade.enable(Zombie2);
    game.physics.arcade.enable(Zombie3);
    game.physics.arcade.enable(Zombie4);
    game.physics.arcade.enable(Zombie5);

    Zombie1.body.velocity.x = 100;
    Zombie2.body.velocity.x = 100;
    Zombie3.body.velocity.x = 100;
    Zombie4.body.velocity.y = 100;
    Zombie5.body.velocity.y = -100;
    //move(Phaser.DOWN);
    
    

    detKey.onDown.add(function(){
        //player.destroy();
        bombPointer.destroy();
        //console.log(bombPointer);
    }, this);

    spaceKey.onDown.add(function(){
        var bomb = game.add.sprite(marker.x * 32 + 16, marker.y * 32 + 16, 'bomb', 0);
        bomb.anchor.set(0.5);
        bomb.scale.set(.40, .30);
        bombPointer = bomb;
        setTimeout(function()
        {
                
            fallout(bomb);
            boom(bomb);
            bomb.destroy();

        }, 1000);
        
    }, this);

    //player.body.collides(bombCG);
}
  
function update() {
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(Zombie1, layer);
    game.physics.arcade.collide(Zombie2, layer);
    game.physics.arcade.collide(Zombie3, layer);
    game.physics.arcade.collide(Zombie4, layer);
    game.physics.arcade.collide(Zombie5, layer);
    
    game.physics.arcade.collide(player, layer);
    /*marker.x = game.math.snapToFloor(Math.floor(player.x), 32) / 32;
    marker.y = game.math.snapToFloor(Math.floor(player.y), 32) / 32;
    
    directions[1] = map.getTileLeft(layer.index, marker.x, marker.y);
    directions[2] = map.getTileRight(layer.index, marker.x, marker.y);
    directions[3] = map.getTileAbove(layer.index, marker.x, marker.y);
    directions[4] = map.getTileBelow(layer.index, marker.x, marker.y);
    
    //checkKeys();
    if(turning !== Phaser.NONE) {
        turn();
    }*/
    
    // reset body velocity each time
    /*player.body.velocity.x = 0;
    player.body.velocity.y = 0;*/

    marker.x = game.math.snapToFloor(Math.floor(player.x), 32) / 32;
    marker.y = game.math.snapToFloor(Math.floor(player.y), 32) / 32;
    
    if(cursors.left.isDown) {
        //snapToY();
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        //snapToY();
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else if (cursors.up.isDown) {
        //snapToX();
        player.body.velocity.y = -150;
        player.animations.stop();
        player.frame = 4;
    } else if (cursors.down.isDown) {
        //snapToX();
        player.body.velocity.y = 150;
        player.animations.stop();
        player.frame = 4;
    } else {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        snapToCenter();
        player.animations.stop();
        player.frame = 4;
    }


    AnimateZombie();
    
    // check for collisions
    hitBaddie(Zombie1);
    hitBaddie(Zombie2);
    hitBaddie(Zombie3);
    hitBaddie(Zombie4);
    hitBaddie(Zombie5);
}

function hitBaddie(sprite) {
    if(sprite === Zombie1 || sprite === Zombie2 || sprite === Zombie3 ||
            sprite === Zombie4 || sprite === Zombie5) {
        game.physics.arcade.overlap(player, sprite, function() {
            player.kill();
            lose();
        }, null, game);
    }
}

function snapToCenter()
{
    marker.x = game.math.snapToFloor(Math.floor(player.x), 32) / 32;
    marker.y = game.math.snapToFloor(Math.floor(player.y), 32) / 32;

    player.body.x = (marker.x * 32);
    player.body.y = (marker.y * 32);
}

function getTileCoord(o){
    var pz = new Phaser.Point();
    pz.x = game.math.snapToFloor(Math.floor(o.x), 32) / 32;
    pz.y = game.math.snapToFloor(Math.floor(o.y), 32) / 32;
    return pz;
}

//Pass this function a bomb!!!
function boom(b){
	var fireSprites = [];
	var x = getTileCoord(b).x;
	var y = getTileCoord(b).y;
	var hitTiles = [new Phaser.Point(x,y), new Phaser.Point(x+1,y), new Phaser.Point(x-1,y), new Phaser.Point(x,y+1),new Phaser.Point(x, y-1)];
	for(var i = 0; i<5; ++i){
		fireSprites.push(game.add.sprite(hitTiles[i].x * 32 + 16, hitTiles[i].y * 32 + 16, 'explosion', 0));
		fireSprites[i].anchor.set(0.5);
		fireSprites[i].scale.set(.40, .30);  
    	fireSprites[i].animations.add('left',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],10,true);
        fireSprites[i].animations.play('left');
		
	}
	
    setTimeout(function(){fireSprites.forEach(function(s){
            s.destroy();
        } ); }, 2000);

    for(var x = 0; x < 5; x++)
    {
        setTimeout(function(){fireSprites.forEach(function(s){
            fallout(b);
        } ); }, x * 400);
    }


	//Call the fallout function after this comment!!!!
	

}





function AnimateZombie(){
    var point = getTileCoord(Zombie1);
    var point2 = getTileCoord(Zombie2);
    var point3 = getTileCoord(Zombie3);
    var point4 = getTileCoord(Zombie4);
    var point5 = getTileCoord(Zombie5);
    if(point.x===1){
    Zombie1.animations.play('right');
        Zombie1.body.velocity.x = 150;
    }
    if(point.x===12)
    {
    Zombie1.animations.play('left');
        Zombie1.body.velocity.x = -150;
    }
    if(point2.x===1){
    Zombie2.animations.play('right');
        Zombie2.body.velocity.x = 150;
    }
    if(point2.x===12)
    {
    Zombie2.animations.play('left');
        Zombie2.body.velocity.x = -150;
    }
    if(point3.x===3){
    Zombie3.animations.play('right');
        Zombie3.body.velocity.x = 150;
    }
    if(point3.x===7)
    {
    Zombie3.animations.play('left');
        Zombie3.body.velocity.x = -150;
    }
    if(point4.y===1){
    Zombie4.animations.play('right');
        Zombie4.body.velocity.y = 150;
    }
    if(point4.y===12)
    {
    Zombie4.animations.play('left');
        Zombie4.body.velocity.y = -150;
    }
    if(point5.y===4){
    Zombie5.animations.play('right');
        Zombie5.body.velocity.y = 150;
    }
    if(point5.y===12)
    {
    Zombie5.animations.play('left');
        Zombie5.body.velocity.y = -150;
    }
}

function snapToY()
{
    marker.y = game.math.snapToFloor(Math.floor(player.y), 32) / 32;

    player.body.y = (marker.y * 32);
}

function snapToX()
{
    marker.x = game.math.snapToFloor(Math.floor(player.x), 32) / 32;

    player.body.x = (marker.x * 32);
}

function move(direction) {
    var velocity = speed;
    
    if(direction === Phaser.LEFT || direction === Phaser.UP) {
        velocity = -velocity;
    }
    if(direction === Phaser.LEFT || direction === Phaser.RIGHT) {
        player.body.velocity.x = velocity;
    } else {
        player.body.velocity.y = velocity;
    }
    
    current = direction;
}

function checkKeys() {
    if(cursors.left.isDown && current !== Phaser.LEFT) {
        checkDirection(Phaser.LEFT);
        player.animations.play('left');
    } else if(cursors.right.isDown && current !== Phaser.RIGHT) {
        checkDirection(Phaser.RIGHT);
        player.animations.play('right');
    } else if(cursors.up.isDown && current !== Phaser.UP) {
        checkDirection(Phaser.UP);
        player.animations.play('stop');
    } else if(cursors.down.isDown && current !== Phaser.DOWN) {
        checkDirection(Phaser.DOWN);
        player.animations.play('stop');
    } else {
        turning = Phaser.NONE;
        player.animations.play('stop');
    }
}

function checkDirection(direction) {
    if(current === opposites[direction]) {
        move(direction);
    } else {
        turning = direction;
        
        turnPoint.x = marker.x*32 + 32/2;
        turnPoint.y = marker.y*32 + 32/2;
    
    }
}

function distance(px, py) {
    return Math.pow((Math.pow(py.x - px.x, 2) + Math.pow(py.y - px.y, 2)), 0.5);
}

function turn() {
    var px = Math.floor(player.x);
    var py = Math.floor(player.y);
    
    var playerPoint = new Phaser.Point(px, py);
    
    if(distance(playerPoint, turnPoint) > 3) {
        return false;
    } else {
        player.x = turnPoint.x;
        player.y = turnPoint.y;
        player.body.reset(turnPoint.x, turnPoint.y);
        move(turning);
        turning = Phaser.NONE;
        return true;
    }
}

function lose() {
    var text = this.game.add.text(game.camera.wisth / 2, game.camera.height / 2, "", {
        font: "129px Arial",
        fill: "#ffffff",
        align: "center"
    });
    text.fixedToCamera = false;
    text.setText("Game Over");
}

function win() {
    var text = this.game.add.text(game.camera.wisth / 2, game.camera.height / 2, "", {
        font: "154px Arial",
        fill: "#ffffff",
        align: "center"
    });
    text.fixedToCamera = false;
    text.setText("You Won!");
}

function fallout(b)
{

    marker.x = game.math.snapToFloor(Math.floor(b.x), 32);
    marker.y = game.math.snapToFloor(Math.floor(b.y), 32);
    //Check Zombie 1
    if(Zombie1.body.y >= marker.y && Zombie1.y <= (marker.y + 32))
    {
        if(Zombie1.body.x >= (marker.x - 32) && Zombie1.body.x <= (marker.x + 64))
        {
            Zombie1.destroy();
            baddieCounter--;
        }

    }
    if(Zombie1.body.x >= marker.x && Zombie1.x <= (marker.x + 32))
    {
        if(Zombie1.body.y >= (marker.y - 32) && Zombie1.body.y <= (marker.y + 64))
        {
            Zombie1.destroy();
            baddieCounter--;
        }
    }

    //Check Zombie 2
    if(Zombie2.body.y >= marker.y && Zombie2.y <= (marker.y + 32))
    {
        if(Zombie2.body.x >= (marker.x - 32) && Zombie2.body.x <= (marker.x + 64))
        {
            Zombie2.destroy();
            baddieCounter--;
        }
    }
    if(Zombie2.body.x >= marker.x && Zombie2.x <= (marker.x + 32))
    {
        if(Zombie2.body.y >= (marker.y - 32) && Zombie2.body.y <= (marker.y + 64))
        {
            Zombie2.destroy();
            baddieCounter--;
        }
    }

    //Check Zombie 3
    if(Zombie3.body.y >= marker.y && Zombie3.y <= (marker.y + 32))
    {
        if(Zombie3.body.x >= (marker.x - 32) && Zombie3.body.x <= (marker.x + 64))
        {
            Zombie3.destroy();
            baddieCounter--;
        }
    }
    if(Zombie3.body.x >= marker.x && Zombie3.x <= (marker.x + 32))
    {
        if(Zombie3.body.y >= (marker.y - 32) && Zombie3.body.y <= (marker.y + 64))
        {
            Zombie3.destroy();
            baddieCounter--;
        }
    }

    //Check Zombie 4
    if(Zombie4.body.y >= marker.y && Zombie4.y <= (marker.y + 32))
    {
        if(Zombie4.body.x >= (marker.x - 32) && Zombie4.body.x <= (marker.x + 64))
        {
            Zombie4.destroy();
            baddieCounter--;
        }
    }
    if(Zombie4.body.x >= marker.x && Zombie4.x <= (marker.x + 32))
    {
        if(Zombie4.body.y >= (marker.y - 32) && Zombie4.body.y <= (marker.y + 64))
        {
            Zombie4.destroy();
            baddieCounter--;
        }
    }

    //Check Zombie 5
    if(Zombie5.body.y >= marker.y && Zombie5.y <= (marker.y + 32))
    {
        if(Zombie5.body.x >= (marker.x - 32) && Zombie5.body.x <= (marker.x + 64))
        {
            Zombie5.destroy();
            baddieCounter--;
        }
    }
    if(Zombie5.body.x >= marker.x && Zombie5.x <= (marker.x + 32))
    {
        if(Zombie5.body.y >= (marker.y - 32) && Zombie5.body.y <= (marker.y + 64))
        {
            Zombie5.destroy();
            baddieCounter--;
        }
    }

    if(player.body.y >= marker.y && player.y <= (marker.y + 32))
    {
        if(player.body.x >= (marker.x - 32) && player.body.x <= (marker.x + 64))
        {
            player.destroy();
            alert("Gam Over!\nRefresh to play again");
        }


    }
    if(player.body.x >= marker.x && player.x <= (marker.x + 32))
    {
        if(player.body.y >= (marker.y - 32) && player.body.y <= (marker.y + 64))
         {
            player.destroy();
            alert("Gam Over!\nRefresh to play again");
        }
    }


}

//game.state.add('Game', PhaserGame, true);
