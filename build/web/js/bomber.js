var game = new Phaser.Game(672, 480, Phaser.AUTO, 'game');

var PhaserGame = function(game) {
    this.player = null;
}

PhaserGame.prototype = {
    
    init: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
    },
    
    // note: graphics copyright 2015 Photon Storm Ltd
    preload: function() {    
        this.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/tiles.png');
        /*this.load.image('firstaid', 'assets/firstaid.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        this.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);*/
        this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },
            
    create: function() {
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('tiles', 'tiles');
        this.layer = this.map.createLayer('Tile Layer 1');
        player = game.add.sprite(48, 48, 'dude', 4);
        player.anchor.set(0.5);
        player.scale.set(.8, .58);
    }
        
};


game.state.add('Game', PhaserGame, true);