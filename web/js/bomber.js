var game = new Phaser.Game(672, 480, Phaser.AUTO, 'game',
{preload: preload, create: create, update: update, move: move, checkKeys: checkKeys, checkDirection: checkDirection, turn: turn});

var bombs;

var map = null;
var layer = null;
var marker = new Phaser.Point();
var turnPoint = new Phaser.Point();
var directions = [null, null, null, null, null];
var opposites = [Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP];
var player = null;
var speed = 150;
var current = Phaser.UP;
var cursors = null;
var turning = null;
var spaceKey = null;
var detKey = null;
var bombCG = null;
var bombPointer = null;


// note: graphics copyright 2015 Photon Storm Ltd
function preload() {    
    game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tiles.png');
    this.load.image('bomb', 'assets/bomb.png');
    /*this.load.image('firstaid', 'assets/firstaid.png'); 
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);*/
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {

    bombs = game.add.group();
    bombs.enableBody = true;
    bombs.physicsBodyType = Phaser.Physics.Arcade;
    bombs.createMultiple(3, 'bomb');
    bombs.setAll('anchor.x', 0.5);
    bombs.setAll('anchor.y', 0.5);

    map = game.add.tilemap('map');
    map.addTilesetImage('tiles', 'tiles');
    layer = map.createLayer('Tile Layer 1');
    
    map.setCollision(6, true, this.layer);
    
    player = game.add.sprite(48, 48, 'dude', 4);
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    player.anchor.set(0.5);
    player.scale.set(1, .66);
    
    game.physics.arcade.enable(player);
     //game.physics.arcade.enable(bomb);

    
    cursors = game.input.keyboard.createCursorKeys();
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    detKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
    //move(Phaser.DOWN);


    //player.body.collides(bombCG);
}
  
function update() {
    
    game.physics.arcade.collide(player, layer);
    /*if(bombCount)
    {
        game.physics.arcade.collide(player, bomb);
    }*/
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


    detKey.onDown.add(function(){
        player.destroy();
    }, this);

    spaceKey.onDown.add(function(){
        bomb = bombs.getFirstExists(false);
        if(bomb)
        {
            bomb.reset(marker.x * 32 + 16, marker.y * 32 + 16)
        }


        /*var bomb = bombs.create(marker.x * 32 + 16, marker.y * 32 + 16, 'bomb', 0);
        bomb.anchor.setTo(0.5, .05);*/
        //bomb.destroy();
    }, this);

    function dBomb(obj)
    {
        alert("hello");
    }








}



function snapToCenter()
{
    marker.x = game.math.snapToFloor(Math.floor(player.x), 32) / 32;
    marker.y = game.math.snapToFloor(Math.floor(player.y), 32) / 32;

    player.body.x = (marker.x * 32);
    player.body.y = (marker.y * 32);
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

//game.state.add('Game', PhaserGame, true);