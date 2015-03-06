var game = new Phaser.Game(672, 480, Phaser.AUTO, 'game', {preload: preload, create: create, update: update, move: move});

var map = null;
var layer = null;
var player = null;
var speed = 150;
var current = Phaser.UP;

// note: graphics copyright 2015 Photon Storm Ltd
function preload() {    
    game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tiles.png');
    /*this.load.image('firstaid', 'assets/firstaid.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);*/
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
    map = game.add.tilemap('map');
    map.addTilesetImage('tiles', 'tiles');
    layer = map.createLayer('Tile Layer 1');
    
    map.setCollision(6, true, this.layer);
    
    player = game.add.sprite(48, 48, 'dude', 4);
    player.anchor.set(0.5);
    player.scale.set(.8, .58);
    
    game.physics.arcade.enable(player);
    move(Phaser.DOWN);
}
  
function update() {
    game.physics.arcade.collide(player, layer);
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

//game.state.add('Game', PhaserGame, true);