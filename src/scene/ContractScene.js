
// import * as mlregression from "ml-regression";
// import * as fs from "fs";

import {Control} from "../gameinput/Control.js";
import {Config} from "../config/Config.js";
import {CustomButton} from "../button/CustomButton.js";
export class ContractScene extends Phaser.Scene {

    constructor() {
        super('ContractScene')

        // game controls
        this.control = null;
        this.scrollbar = null;
        this.isDragging = false;
        this.scrollView = null;
        this.contractors = ['OBS', 'CBS', 'WBS'];
        this.contractorsWindow = [0, 1, 2];

        //game data
        this.weather = "summer"
        this.temperature = 32;
        this.weekDay = 5;
    }

    preload() {
        this.control = new Control(this);

        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');

        this.load.image('background', 'assets/backgrounds/background1.png');
        this.load.image('card', 'assets/cards/card3/Card X5.png')
        this.load.image('0 star', 'assets/images/0 star.png')
        this.load.image('1 star', 'assets/images/1 star.png')
        this.load.image('2 star', 'assets/images/2 star.png')
        this.load.image('3 star', 'assets/images/3 star.png')
        this.load.image('4 star', 'assets/images/4 star.png')
        this.load.image('5 star', 'assets/images/5 star.png')

        this.load.json('data', 'assets/project/bridge1.json')

        this.load.image('red-panel', 'assets/cards/card1/Panel Red.png')

        this.load.image('left-arrow', 'assets/icons/09.png');
        this.load.image('right-arrow', 'assets/icons/10.png');

    }

    create() {

        // add background
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');

        // add card
        const card = this.add.image(INIT_MAIN_UI_X * 4.8, INIT_MAIN_UI_Y * 11.5, 'card').setScale(2.5, 2);

        // add arrows
        const ARROW_DIST = 500;
        const leftArrow = this.add.image(card.x - ARROW_DIST, 150, 'left-arrow');
        const rightArrow = this.add.image(card.x + ARROW_DIST, 150, 'right-arrow');

        // add contractor-type heading
        const HEADING_DIST = 20;
    
        let middleHeading = new CustomButton(this, card.x, 150,'button1Normal', 'button1Hover', 'CBS', 30).setScale(1.2, 1.2);
        this.add.existing(middleHeading);
        middleHeading.setDepth(1);

        let leftHeading = new CustomButton(this, middleHeading.x - middleHeading.width - HEADING_DIST, 150,'button1Normal', 'button1Hover', 'OBS', 30).setScale(0.75, 0.75);
        this.add.existing(leftHeading);
        leftHeading.setDepth(1);

        let rightHeading = new CustomButton(this, middleHeading.x + middleHeading.width + HEADING_DIST, 150,'button1Normal', 'button1Hover', 'WBS', 30).setScale(0.75, 0.75);
        this.add.existing(rightHeading);
        rightHeading.setDepth(1);

        // add scroll view
        this.scrollView = this.add.container(INIT_MAIN_UI_X * 1.05, INIT_MAIN_UI_Y * 6 + SUBHEADING_SPACE_Y);

        const subHeadings = this.add.text(this.scrollView.x, this.scrollView.y - SUBHEADING_SPACE_Y, `\t\t\t\tCost Category\t\t\t\t\t\t\t\t\t\t\t\t\tPredicted Cost(week)\t\t\t\t\t\t\tActual Cost(week)`, {
            fontSize: 40,
            color: '#ffffff'
        });

        let infoNum = this.cache.json.get('data').infoGenerateNum;

        // generate random info
        this.generateContent(infoNum)

        // move between contractors
        leftArrow.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.shiftHeading(leftHeading, middleHeading, rightHeading, 'left', card.x, HEADING_DIST);
                    this.scrollView.removeAll(true);
                    this.generateContent(infoNum)
        });

        rightArrow.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.shiftHeading(leftHeading, middleHeading, rightHeading, 'right', card.x, HEADING_DIST);
                    this.scrollView.removeAll(true);
                    this.generateContent(infoNum)
        });

        // add scroll bar
        this.scrollbar = this.add.graphics();
        this.scrollbar.fillStyle(0x666666, 1);
        this.scrollbar.fillRect(INIT_MAIN_UI_X * 8.5, INIT_MAIN_UI_Y * 7.8, 30, 50);
    }

    update() {

        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEsc);
        if (isSelectDown) {
            this.scene.stop('ContractScene');
            this.scene.launch('MainScene');
        }

        // set scroll bar
        this.scrollbar.setInteractive(new Phaser.Geom.Rectangle(this.scrollbar.commandBuffer[4], this.scrollbar.commandBuffer[5], 30, 50), Phaser.Geom.Rectangle.Contains);

        this.scrollbar.on('pointerdown', () => {
            this.isDragging = true;
        });

        this.input.on('pointerup', () => {
            this.isDragging = false;
        });

        // set scroll view connect with scroll bar
        if (this.isDragging) {
            const pointer = this.input.activePointer;

            const offsetY = pointer.y - this.scrollbar.commandBuffer[5];
            this.scrollbar.y = Phaser.Math.Clamp(offsetY, 0, 410);

            //set scroll speed
            const contentY = (this.scrollbar.y / 10) * (this.cache.json.get('data').infoGenerateNum * 2.6 + (0.65 * (this.cache.json.get('data').infoGenerateNum - 20))) - 400;
            this.scrollView.y = -contentY;
        }
    }


    generateContent(infoNum, type) {
        // put OBS/CBS/WBS info
        for (let i = 0; i < infoNum; i++) {
            // add each contract
            const scrollViewContent = this.add.container((INIT_MAIN_UI_X * 1.05) / 10, (INIT_MAIN_UI_Y * 6 + SUBHEADING_SPACE_Y) / 6 * i);
            this.scrollView.add(scrollViewContent);

            // category
            const categoryName = generateCategoryName();
            const name = this.add.text(scrollViewContent.x + CONTENT_BUFFER_X, scrollViewContent.y, categoryName, {
                fontSize: 40,
                color: '#ffffff'
            });
            scrollViewContent.add(name);

            // predicted cost
            const predictedCost = generatePredictedCost();
            const pCost = this.add.text(scrollViewContent.x + 300, scrollViewContent.y + 18,  `$${predictedCost}`, {
                fontSize: 40,
                color: '#ffffff'
            });
            scrollViewContent.add(pCost);

            // actual cost
            const actualCost = generateActualCost();
            const aCost = this.add.text(scrollViewContent.x + 600, scrollViewContent.y + 3, `$${actualCost}`, {
                fontSize: 40,
                color: '#ffffff'
            });
            scrollViewContent.add(aCost);

            // graph button
            const graphButton = new graphButton(scrollViewContent.x + 1200, scrollViewContent.y, 'button1Normal', 'button1Hover', 'Graph', 30);

            // generate Graph
            graphButton.setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {

                });

            // add scroll view mask
            const mask = this.make.graphics();
            mask.fillStyle(0xffffff);
            mask.fillRect(0, -1000, 1000, 1000);
            mask.fillStyle(0x000000);
            mask.fillRect(INIT_MAIN_UI_X * 1.05 + 40, INIT_MAIN_UI_Y * 6 + 80, 1382, 470)
            scrollViewContent.setMask(mask.createGeometryMask());

            // add each container's touchable area
            const clickArea = this.add.graphics();
            clickArea.fillStyle(0xff0000);
            clickArea.fillRoundedRect(scrollViewContent.x, scrollViewContent.y - 10, 1380, 60, 10);
            clickArea.setAlpha(0.5);
            clickArea.setDepth(-1);
            scrollViewContent.add(clickArea);

            // set each clickArea open window
            // const areaCheck1 = new Phaser.Geom.Rectangle(scrollViewContent.x, scrollViewContent.y - 10, 1380, 60)
            // const areaCheck2 = new Phaser.Geom.Rectangle(INIT_MAIN_UI_X * 1.05 + 40, INIT_MAIN_UI_Y * 6 - 10, 1382, 571)

            // clickArea.setInteractive(areaCheck1, Phaser.Geom.Rectangle.Contains)
            //     .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, function (pointer) {
            //         // ensure click in two area
            //         if (Phaser.Geom.Rectangle.Contains(areaCheck2, pointer.x, pointer.y)) {
            //             // prevent misuse
            //             this.input.enabled = false;
            //             const taskAssignmentScene = this.scene.get('TaskAssignmentScene');
            //             this.scene.launch('TaskAssignmentScene');
            //
            //             // set listener to get option of TaskAssignmentScene
            //             this.scene.get('TaskAssignmentScene').events.on('getResult', (result) => {
            //                 if (result) {
            //                     this.scrollView.remove(scrollViewContent, true);
            //                     this.generateContent(infoNum, i);
            //                 }
            //
            //                 taskAssignmentScene.events.off('getResult');
            //                 this.input.enabled = true;
            //             });
            //         }
            // }, this)
        }
    }

    shiftHeading(leftHeading, middleHeading, rightHeading, direction, cardxPos, HEADING_DIST) {
        let left = this.contractorsWindow[0];
        let middle = this.contractorsWindow[1];
        let right = this.contractorsWindow[2];

        if (direction === 'left') {
            // check for shifting past beginning
            // console.log('left');
            if (left - 1 < 0) {
                left = this.contractors.length - 1;
            } else {
                left--;
            }

            if (middle - 1 < 0) {
                middle = this.contractors.length - 1;
            } else {
                middle--;
            }

            if (right - 1 < 0) {
                right = this.contractors.length - 1;
            } else {
                right--;
            }

        } else {

            // check for shifting past end
            if (left + 1 === this.contractors.length) {
                left = 0;
            } else {
                left++;
            }

            if (middle + 1 === this.contractors.length) {
                middle = 0;
            } else {
                middle++;
            }

            if (right + 1 === this.contractors.length) {
                right = 0;
            } else {
                right++;
            }
        }

        // set indices of new window
        this.contractorsWindow[0] = left;
        this.contractorsWindow[1] = middle;
        this.contractorsWindow[2] = right;

        // remove previous buttons
        middleHeading.destroy();
        leftHeading.destroy();
        rightHeading.destroy();

        // make new buttons

        middleHeading = new CustomButton(this, cardxPos, 150,'button1Normal', 'button1Hover', `${this.contractors[this.contractorsWindow[1]]}`, 30).setScale(1.2, 1.2);
        this.add.existing(middleHeading);

        leftHeading = new CustomButton(this, middleHeading.x - middleHeading.width - HEADING_DIST, 150,'button1Normal', 'button1Hover', `${this.contractors[this.contractorsWindow[0]]}`, 30).setScale(0.75, 0.75);
        this.add.existing(leftHeading);

        rightHeading = new CustomButton(this, middleHeading.x + middleHeading.width + HEADING_DIST, 150,'button1Normal', 'button1Hover', `${this.contractors[this.contractorsWindow[2]]}`, 30).setScale(0.75, 0.75);
        this.add.existing(rightHeading);

    }
}

function generateCategoryName(i, type) {
    const OBS = []
    const CBS = ["Material Cost", "Labor Cost", "Contractor Cost"]
    const WBS = []

    if (type === "OBS") {
        return OBS[i];
    } else if (type === "CBS") {
        return CBS[i];
    } else{
        return WBS[i];
    }
}

function generatePredictedCost() {
    // const mlregression = require('ml-regression');
    // simple Linear Regression
    const SLR = mlregression.SLR;

    // read the JSON file
    const dataset = JSON.parse(fs.readFileSync('assets/project/CBS.json', 'utf-8'));
    const materialTrainingData = dataset.material;

    // prepare the training data
    const factor = materialTrainingData.map(item => item.features);
    const cost = materialTrainingData.map(item => item.output);

    // train the model
    const regression = new SLR(factor, cost);
    const newFactor = [this.temperature, this.weather, this.weekDay];

    return regression.predict(newFactor);
}

function generateActualCost() {
    // read the JSON file
    const jsonData = JSON.parse(fs.readFileSync('assets/project/expense.json', 'utf-8'));
    const materialExpenses = jsonData.weeklyExpenses[0].actualExpenses.filter(expense => expense.type === "material");
    return materialExpenses.reduce((total, expense) => total + expense.expense, 0)
}