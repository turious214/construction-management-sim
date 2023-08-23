class MaterialScene extends Phaser.Scene {

    constructor() {
        super('MaterialScene');
        this.control = null;
        this.cursor = null;
    }

    preload() {
        this.control = new Control(this);
    }

    create() {
    }
}
