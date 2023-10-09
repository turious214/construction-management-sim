"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
class CustomButton extends phaser_1.default.GameObjects.Container {
    constructor(scene, x, y, upTexture, overTexture, text, fontSize) {
        super(scene, x, y);
        this.upImage = scene.add.image(0, 0, upTexture);
        this.overImage = scene.add.image(0, 0, overTexture);
        this.width = this.upImage.width;
        this.height = this.upImage.height;
        this.x = x;
        this.y = y;
        this.text = scene.add.text(0, 0, text)
            .setOrigin(0.5) // align to centre
            .setFontSize(fontSize);
        this.add(this.upImage);
        this.add(this.overImage);
        this.add(this.text);
        this.overImage.setVisible(false);
        this.setSize(this.upImage.width, this.upImage.height);
        this.setInteractive()
            .on(phaser_1.default.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                // console.log('over')
                this.upImage.setVisible(false);
                this.overImage.setVisible(true);
            })
            .on(phaser_1.default.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                // console.log('out')
                this.upImage.setVisible(true);
                this.overImage.setVisible(false);
            });
    }
    setTextColor(color) {
        this.text.setColor(color);
    }
}
exports.default = CustomButton;
