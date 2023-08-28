class ContractorsScene extends Phaser.Scene {

    constructor() {
        super('ContractorsScene');
        this.control = null;
        this.cursor = null;
    }

    preload() {
        this.control = new Control(this);
    }

    create() {
        // draw background
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');
    }
}
