import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

var config = {
    type: Phaser.AUTO,
    width: Config.WindowWidth,
    height: Config.WindowHeight,
    parent: 'main-game',
    scene: [GameMenu, MainScene, Materials, MaterialsShop],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTRE_BOTH
    },
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: RexUIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);
