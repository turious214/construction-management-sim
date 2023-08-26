var config = {
    type: Phaser.AUTO,
    width: Config.WindowWidth,
    height: Config.WindowHeight,
    parent: 'main-game',
    scene: [GameMenu, MainScene, Personnel]
    // scene: [GameMenu]
};

var game = new Phaser.Game(config);