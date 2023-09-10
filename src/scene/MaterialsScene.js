import {Control} from "../gameinput/Control.js";
import {Config} from "../config/Config.js";
import {CustomButton} from "../button/CustomButton.js";
export class MaterialsScene extends Phaser.Scene {

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
