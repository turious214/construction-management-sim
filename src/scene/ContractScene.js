class ContractScene extends Phaser.Scene {

    constructor() {
        super('ContractScene');
        this.control = null;
        this.cursor = null;
    }

    preload() {
        this.control = new Control(this);
    }

    create() {
    }
}
