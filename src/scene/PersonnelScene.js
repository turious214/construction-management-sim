class PersonnelScene extends Phaser.Scene {

    constructor() {
        super('PersonnelScene');
        this.control = null;
        this.cursor = null;
    }

    preload() {
        this.control = new Control(this);
    }

    create() {
    }
}
