var config = {
    type: Phaser.AUTO,
    width: Config.WindowWidth,
    height: Config.WindowHeight,
    parent: 'main-game',
    scene: [GameMenu, HUDScene, ProjectScene, ContractorsScene, MaterialsScene, PersonnelScene, ContractScene],

    scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTRE_BOTH
        }
};

var game = new Phaser.Game(config);
