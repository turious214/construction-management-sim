import {Control} from "../gameinput/Control.js";
import {Config} from "../config/Config.js";
import {CustomButton} from "../button/CustomButton.js";

export class EstimatePointSet extends Phaser.Scene {

    constructor() {
        super('EstimatePointSet');

        // Game control
        this.control = null;
        this.scrollbar = null;
        this.isDragging = false;
        this.scrollView = null;
        this.inputMap = new Map();
    }

    preload() {
        this.control = new Control(this);
        this.param1 = this.scene.settings.data.param1;

        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');

        this.load.image('card2', 'assets/cards/card2/Card X2.png');
    }

    create() {
        const INIT_MAIN_UI_X = 88;
        const INIT_MAIN_UI_Y = 22;
        // draw background
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'card2').setScale(2.5, 2.3);

        // add scroll view
        this.scrollView = this.add.container(INIT_MAIN_UI_X * 4.8, INIT_MAIN_UI_Y * 20);

        // add done button
        const doneButton = new CustomButton(this, INIT_MAIN_UI_X * 11, INIT_MAIN_UI_Y * 39, 'button1Normal', 'button1Hover', 'Done', 25);
        this.add.existing(doneButton);
        doneButton.setDepth(1);

        // go main scene
        doneButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.events.emit('getResult', true);
                this.scene.stop('EstimatePointSet');
            });

        // add title
        this.add.text(Config.WindowWidth / 2.65, Config.WindowHeight / 5, 'Points Set', {
            color: '#fcd498',
            fontSize: 75,
            align: 'top',
        });

        // generate random info
        this.generateContent()
    }

    update() {
        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEnter);
        if (isSelectDown) {
            this.scene.stop('GameMenu');
            this.scene.launch('MainScene');
        }
    }

    generateContent() {
        for (let i = 0; i < 3; i++) {
            const scrollViewContent = this.add.container(this.scrollView.x / 10, this.scrollView.y / 8 * i);
            this.scrollView.add(scrollViewContent);

            // category
            const categoryName = generateCategoryName(i, this.param1);
            const name = this.add.text(scrollViewContent.x + 50, scrollViewContent.y, categoryName, {
                fontSize: 40,
                color: '#ffffff'
            });
            scrollViewContent.add(name);


            // input box
            const input = this.add.dom(scrollViewContent.x + 100, scrollViewContent.y + 10)
                .createFromHTML(
                    `<input type="number" step="0.01" min="0" style="width: 200px; height: 40px;">`
                );
            input.setDepth(1)
            scrollViewContent.add(input);

            this.inputMap.set(`input_${i}`, input)
        }
    }

}

function generateCategoryName(i, type) {
    // const OBS = []
    const CBS = ["Optimistic: ", "Pessimistic: ", "Most Likely: "]
    // const WBS = []

    if (type === "OBS") {
        return OBS[i];
    } else if (type === "CBS") {
        return CBS[i];
    } else{
        return WBS[i];
    }
}