var config = {
    type: Phaser.AUTO,
    width: Config.WindowWidth,
    height: Config.WindowHeight,
    parent: 'main-game',
    scene: [GameMenu, MainScene]
    // scene: [GameMenu]
};

var game = new Phaser.Game(config);