class MaterialsScene extends Phaser.Scene {

    constructor() {
        super('MaterialsScene');
        this.control = null;
        this.cursor = null;
    }

    preload() {
        this.control = new Control(this);
    }

    create() {
    }
}
