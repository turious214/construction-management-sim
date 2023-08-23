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
    }
}
