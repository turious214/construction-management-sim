<<<<<<< HEAD
import {Control} from "../gameinput/Control.js";
import {Config} from "../config/Config.js";
import {CustomButton} from "../button/CustomButton.js";

let INIT_MAIN_UI_X;
INIT_MAIN_UI_X = 200;
let INIT_MAIN_UI_Y;
INIT_MAIN_UI_Y = 50;
let CONTENT_BUFFER_X;
CONTENT_BUFFER_X = 50;
let SUBHEADING_SPACE_Y;
SUBHEADING_SPACE_Y = 100;

export class ContractScene extends Phaser.Scene {

=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractScene = void 0;
class ContractScene extends Phaser.Scene {
>>>>>>> master
    constructor() {
        super('ContractScene');
        // game controls
<<<<<<< HEAD
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
=======
        // this.control = null;
        // this.scrollbar = null;
        // this.isDragging = false;
        // this.scrollView = null;
        // this.contractors = ['Plumbers', 'Electricians', 'Plasterers', 'Carpenter', 'Painters', 'Masons', 'Landscapers', 'Excavators', 'Concreters', 'Framers', 'HVAC'];
        // this.contractorsWindow = [0, 1, 2];
>>>>>>> master
    }
    preload() {
<<<<<<< HEAD
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
        this.load.json('estimateData', 'assets/project/Estimate.json')
        this.load.json('expenseData', 'assets/project/expense.json')

        this.load.image('red-panel', 'assets/cards/card1/Panel Red.png')

        this.load.image('left-arrow', 'assets/icons/09.png');
        this.load.image('right-arrow', 'assets/icons/10.png');

=======
        // this.control = new Control(this);
        //
        // this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        // this.load.image('button1Hover', 'assets/buttons/button_hover.png');
        //
        // this.load.image('background', 'assets/backgrounds/background1.png');
        // this.load.image('card', 'assets/cards/card3/Card X5.png')
        // this.load.image('0 star', 'assets/images/0 star.png')
        // this.load.image('1 star', 'assets/images/1 star.png')
        // this.load.image('2 star', 'assets/images/2 star.png')
        // this.load.image('3 star', 'assets/images/3 star.png')
        // this.load.image('4 star', 'assets/images/4 star.png')
        // this.load.image('5 star', 'assets/images/5 star.png')
        //
        // this.load.json('data', 'assets/project/Bridge.ts')
        //
        // this.load.image('red-panel', 'assets/cards/card1/Panel Red.png')
        //
        // this.load.image('left-arrow', 'assets/icons/09.png');
        // this.load.image('right-arrow', 'assets/icons/10.png');
>>>>>>> master
    }
    create() {
<<<<<<< HEAD

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
        this.scrollView = this.add.container(INIT_MAIN_UI_X * 0.8, INIT_MAIN_UI_Y * 6.5 + SUBHEADING_SPACE_Y);

        // Add a horizontal line between view and subheading
        const line = this.add.graphics();
        line.lineStyle(2, 0xffffff); // Line thickness and color
        line.beginPath();
        line.moveTo(this.scrollView.x * 1.55, this.scrollView.y / 1.5 + 75); // Starting point
        line.lineTo(this.scrollView.x * 1.55 + 1450, this.scrollView.y / 1.5 + 75); // Ending point
        line.strokePath();

        const subHeadings = this.add.text(this.scrollView.x * 1.55, this.scrollView.y / 1.5, `Cost Category\t\t\t\tPredicted Cost\t\t\tActual Cost`, {
            fontSize: 40,
            color: '#ffffff'
        });

        let infoNum = this.cache.json.get('data').infoGenerateNum;

        // generate random info
        this.generateContent(this.contractors[this.contractorsWindow[1]])

        // move between contractors
        leftArrow.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.shiftHeading(leftHeading, middleHeading, rightHeading, 'left', card.x, HEADING_DIST);
                    this.scrollView.removeAll(true);
                    this.generateContent(this.contractors[this.contractorsWindow[1]])
        });

        rightArrow.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.shiftHeading(leftHeading, middleHeading, rightHeading, 'right', card.x, HEADING_DIST);
                    this.scrollView.removeAll(true);
                    this.generateContent(this.contractors[this.contractorsWindow[1]])
        });

        // add scroll bar
=======
        // const INIT_MAIN_UI_X = 200;
        // const INIT_MAIN_UI_Y = 50;
        //
        // // add background
        // this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');
        //
        // // add exist button
        // const exitButton = new CustomButton(this, INIT_MAIN_UI_X * 8, INIT_MAIN_UI_Y * 20,'button1Normal', 'button1Hover', 'Exit', 30);
        // this.add.existing(exitButton);
        // exitButton.setDepth(1);
        //
        // // go main scene
        // exitButton.setInteractive()
        //     .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        //         this.scene.stop('ContractScene');
        //         this.scene.launch('MainScene');
        //     });
        //
        // // add title
        // this.add.text(Config.WindowWidth / 16, Config.WindowHeight / 16, 'CONTRACT', {
        //     color: '#fcd498',
        //     fontSize: 100,
        //     align: 'top',
        // });
        //
        // // add card
        // const card = this.add.image(INIT_MAIN_UI_X * 4.8, INIT_MAIN_UI_Y * 11.5, 'card').setScale(2.5, 2);
        //
        // // add arrows
        // const ARROW_DIST = 500;
        // const leftArrow = this.add.image(card.x - ARROW_DIST, 150, 'left-arrow');
        // const rightArrow = this.add.image(card.x + ARROW_DIST, 150, 'right-arrow');
        //
        // // add contractor-type heading
        // const HEADING_DIST = 20;
        //
        // let middleHeading = new CustomButton(this, card.x, 150,'button1Normal', 'button1Hover', 'Electricians', 30).setScale(1.2, 1.2);
        // this.add.existing(middleHeading);
        //
        // let leftHeading = new CustomButton(this, middleHeading.x - middleHeading.width - HEADING_DIST, 150,'button1Normal', 'button1Hover', 'Plumbers', 30).setScale(0.75, 0.75);
        // this.add.existing(leftHeading);
        //
        // let rightHeading = new CustomButton(this, middleHeading.x + middleHeading.width + HEADING_DIST, 150,'button1Normal', 'button1Hover', 'Plasterers', 30).setScale(0.75, 0.75);
        // this.add.existing(rightHeading);
        //
        // const CONTENT_BUFFER_X = 50;
        // const SUBHEADING_SPACE_Y = 100;
        //
        // // add scroll view
        // this.scrollView = this.add.container(INIT_MAIN_UI_X * 1.05, INIT_MAIN_UI_Y * 6 + SUBHEADING_SPACE_Y);
        //
        // const subHeadings = this.add.text(this.scrollView.x, this.scrollView.y - SUBHEADING_SPACE_Y, `\t\t\t\tCompany Name\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tRating\t\t\t\t\t\t\tRate/Day`, {
        //     fontSize: 40,
        //     color: '#ffffff'
        // });
        //
        // // lists to store names, price, rating, clickAreas
        // let names = [];
        // let ratings = [];
        // let prices = [];
        // let clickAreas = [];
        // let infoNum = this.cache.json.get('data').infoGenerateNum;
        //
        // // generate random info
        // this.generateContent(INIT_MAIN_UI_X, INIT_MAIN_UI_Y, CONTENT_BUFFER_X, SUBHEADING_SPACE_Y, names, ratings, prices, clickAreas, infoNum)
        //
        // // move between contractors
        // leftArrow.setInteractive()
        //     .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        //             this.shiftHeading(leftHeading, middleHeading, rightHeading, 'left', card.x, HEADING_DIST);
        //             this.destroyWindowContents(names, ratings, prices, clickAreas);
        //             this.generateContent(INIT_MAIN_UI_X, INIT_MAIN_UI_Y, CONTENT_BUFFER_X, SUBHEADING_SPACE_Y, names, ratings, prices, clickAreas, infoNum)
        //             // console.log('left');
        // });
        //
        // rightArrow.setInteractive()
        //     .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        //             this.shiftHeading(leftHeading, middleHeading, rightHeading, 'right', card.x, HEADING_DIST);
        //             this.destroyWindowContents(names, ratings, prices, clickAreas);
        //             this.generateContent(INIT_MAIN_UI_X, INIT_MAIN_UI_Y, CONTENT_BUFFER_X, SUBHEADING_SPACE_Y, names, ratings, prices, clickAreas, infoNum)
        //             // console.log('right');
        // });
        //
        // // add scroll bar
>>>>>>> master
        // this.scrollbar = this.add.graphics();
        // this.scrollbar.fillStyle(0x666666, 1);
        // this.scrollbar.fillRect(INIT_MAIN_UI_X * 8.5, INIT_MAIN_UI_Y * 7.8, 30, 50);
    }
    update() {
<<<<<<< HEAD

        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEsc);
        if (isSelectDown) {
            this.scene.stop('ContractScene');
            this.scene.launch('MainScene');
        }
    }


    generateContent(type) {
        let infoNum = 2;
        const jsonData = this.cache.json.get('estimateData');
        // check tab
        if (type === "OBS") {

        } else  if (type === "CBS") {
            infoNum = 2

            // check estimate point set
            if (jsonData.optimistic === null && jsonData.pessimistic === null && jsonData.mostLikely === null) {
                this.input.enabled = false;
                const EstimateAssignmentScene = this.scene.get('EstimatePointSet');

                this.scene.launch('EstimatePointSet', {
                    param1: "CBS"
                });

                this.scene.get('EstimatePointSet').events.on('getResult', (result) => {
                    EstimateAssignmentScene.events.off('getResult');
                    this.input.enabled = true;
                });
            }
        } else {

        }

        // put OBS/CBS/WBS info
        for (let i = 0; i < infoNum; i++) {
            // add each contract
            const scrollViewContent = this.add.container(INIT_MAIN_UI_X / 10, (INIT_MAIN_UI_Y * 8 + SUBHEADING_SPACE_Y) / 6 * i);
            this.scrollView.add(scrollViewContent);

            // category
            const categoryName = generateCategoryName(i, type);
            const name = this.add.text(scrollViewContent.x + CONTENT_BUFFER_X, scrollViewContent.y, categoryName, {
                fontSize: 40,
                color: '#ffffff'
            });
            scrollViewContent.add(name);

            // predicted cost
            const predictedCost = generatePredictedCost(this.cache.json.get('estimateData'));
            const pCost = this.add.text(scrollViewContent.x + 500, scrollViewContent.y,  `$${predictedCost}`, {
                fontSize: 40,
                color: '#ffffff'
            });
            scrollViewContent.add(pCost);

            // actual cost
            const actualCost = generateActualCost(this.cache.json.get('expenseData'));
            const aCost = this.add.text(scrollViewContent.x + 875, scrollViewContent.y, `$${actualCost}`, {
                fontSize: 40,
                color: '#ffffff'
            });
            scrollViewContent.add(aCost);

            // graph button
            const graphButton = new CustomButton(this, scrollViewContent.x + 1380 , scrollViewContent.y + 20, 'button1Normal', 'button1Hover', 'Graph', 30).setDepth(1);
            scrollViewContent.add(graphButton);

            // generate Graph
            graphButton.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                onGraphButtonClick(type);
                console.log('Button clicked!');
            });

            // add scroll view mask
            const mask = this.make.graphics();
            mask.fillStyle(0xffffff);
            mask.fillRect(0, -1000, 1000, 1000);
            mask.fillStyle(0x000000);
            mask.fillRect(INIT_MAIN_UI_X * 1.05 + 40, INIT_MAIN_UI_Y * 6 + 60, 1500, 470)
            scrollViewContent.setMask(mask.createGeometryMask());

            // add each container's touchable area
            // const clickArea = this.add.graphics();
            // clickArea.fillStyle(0xff0000);
            // clickArea.fillRoundedRect(scrollViewContent.x, scrollViewContent.y - 10, 1380, 60, 10);
            // clickArea.setAlpha(0.5);
            // clickArea.setDepth(-1);
            // scrollViewContent.add(clickArea);

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
    const CBS = ["Material Cost", "Labor Cost"]
    const WBS = []

    if (type === "OBS") {
        return OBS[i];
    } else if (type === "CBS") {
        return CBS[i];
    } else{
        return WBS[i];
    }
}

function generatePredictedCost(jsonData) {
    // 3 point estimate
    const estimatedCost = (jsonData.optimistic + (4 * jsonData.mostLikely) + jsonData.pessimistic) / 6;
    return estimatedCost.toFixed(2);
}

function generateActualCost(jsonData) {
    let totalArchiveExpense = 0;
    for (const week of jsonData.archive) {
        totalArchiveExpense += week.totalExpense;
    }

    return totalArchiveExpense.toFixed(2);
}

// Function to display the bar chart
// function displayBarChart(type) {
//     // Create a canvas element
//     const canvas = document.createElement('canvas');
//     canvas.width = 400;
//     canvas.height = 300;
//
//     // Append the canvas to the document body
//     document.body.appendChild(canvas);
//
//     const ctx = canvas.getContext('2d');
//     ctx.fillStyle = 'white';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
=======
        // let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEsc);
        // if (isSelectDown) {
        //     this.scene.stop('ContractScene');
        //     this.scene.launch('MainScene');
        // }
        //
        // // set scroll bar
        // this.scrollbar.setInteractive(new Phaser.Geom.Rectangle(this.scrollbar.commandBuffer[4], this.scrollbar.commandBuffer[5], 30, 50), Phaser.Geom.Rectangle.Contains);
        //
        // this.scrollbar.on('pointerdown', () => {
        //     this.isDragging = true;
        // });
        //
        // this.input.on('pointerup', () => {
        //     this.isDragging = false;
        // });
        //
        // // set scroll view connect with scroll bar
        // if (this.isDragging) {
        //     const pointer = this.input.activePointer;
        //
        //     const offsetY = pointer.y - this.scrollbar.commandBuffer[5];
        //     this.scrollbar.y = Phaser.Math.Clamp(offsetY, 0, 410);
        //
        //     //set scroll speed
        //     const contentY = (this.scrollbar.y / 10) * (this.cache.json.get('data').infoGenerateNum * 2.6 + (0.65 * (this.cache.json.get('data').infoGenerateNum - 20))) - 400;
        //     this.scrollView.y = -contentY;
    }
}
exports.ContractScene = ContractScene;
>>>>>>> master
