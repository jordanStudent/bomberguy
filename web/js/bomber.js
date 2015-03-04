var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game');

var PhaserGame = function(game) {
    
}

PhaserGame.prototype = {
    
    init: function() {
        
    },
    
    preload: function() {    
        this.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/tiles.png');
        /*this.load.image('firstaid', 'assets/firstaid.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        this.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);*/
    },
            
    create: function() {
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('tiles', 'tiles');
        this.layer = this.map.createLayer('Tile Layer 1');
    }
        
};


game.state.add('Game', PhaserGame, true);