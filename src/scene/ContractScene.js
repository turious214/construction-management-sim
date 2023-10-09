var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractScene = void 0;
const Control_1 = require("../gameinput/Control");
const Config_1 = require("../config/Config");
const CustomButton_1 = require("../button/CustomButton");
const EstimatePointSet_1 = require("./EstimatePointSet");

let INIT_MAIN_UI_X;
INIT_MAIN_UI_X = 200;
let INIT_MAIN_UI_Y;
INIT_MAIN_UI_Y = 50;
let CONTENT_BUFFER_X;
CONTENT_BUFFER_X = 50;
let SUBHEADING_SPACE_Y;
SUBHEADING_SPACE_Y = 100;

class ContractScene extends Phaser.Scene {

    constructor() {
        super('ContractScene');
        // game controls
        this.control = null;
        this.scrollbar = null;
        this.isDragging = false;
        this.scrollView = null;
        this.contractors = ['OBS', 'CBS', 'WBS'];
        this.contractorsWindow = [0, 1, 2];
    }
    preload() {
        this.control = new Control_1.Control(this);

        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');

        this.load.image('background', 'assets/backgrounds/background1.png');
        this.load.image('card', 'assets/cards/card3/Card X5.png')

        this.load.json('data', 'assets/project/bridge1.json')
        this.load.json('estimateData', 'assets/project/Estimate.json')
        this.load.json('expenseData', 'assets/project/expense.json')

        this.load.image('red-panel', 'assets/cards/card1/Panel Red.png')

        this.load.image('left-arrow', 'assets/icons/09.png');
        this.load.image('right-arrow', 'assets/icons/10.png');
    }
    create() {
        // add background
        this.add.image(Config_1.Config.WindowWidth / 2, Config_1.Config.WindowHeight / 2, 'background');

        // add card
        const card = this.add.image(INIT_MAIN_UI_X * 4.8, INIT_MAIN_UI_Y * 11.5, 'card').setScale(2.5, 2);

        // add arrows
        const ARROW_DIST = 500;
        const leftArrow = this.add.image(card.x - ARROW_DIST, 150, 'left-arrow');
        const rightArrow = this.add.image(card.x + ARROW_DIST, 150, 'right-arrow');

        // add contractor-type heading
        const HEADING_DIST = 20;
    
        let middleHeading = new CustomButton_1.CustomButton(this, card.x, 150,'button1Normal', 'button1Hover', 'CBS', 30).setScale(1.2, 1.2);
        this.add.existing(middleHeading);
        middleHeading.setDepth(1);

        let leftHeading = new CustomButton_1.CustomButton(this, middleHeading.x - middleHeading.width - HEADING_DIST, 150,'button1Normal', 'button1Hover', 'OBS', 30).setScale(0.75, 0.75);
        this.add.existing(leftHeading);
        leftHeading.setDepth(1);

        let rightHeading = new CustomButton_1.CustomButton(this, middleHeading.x + middleHeading.width + HEADING_DIST, 150,'button1Normal', 'button1Hover', 'WBS', 30).setScale(0.75, 0.75);
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
    }
    update() {
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

                this.scene.get('EstimatePointSet').events.on('getResult', () => {
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
            const graphButton = new CustomButton_1.CustomButton(this, scrollViewContent.x + 1380 , scrollViewContent.y + 20, 'button1Normal', 'button1Hover', 'Graph', 30).setDepth(1);
            scrollViewContent.add(graphButton);

            // generate Graph
            graphButton.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                console.log('Button clicked!');
            });

            // add scroll view mask
            const mask = this.make.graphics();
            mask.fillStyle(0xffffff);
            mask.fillRect(0, -1000, 1000, 1000);
            mask.fillStyle(0x000000);
            mask.fillRect(INIT_MAIN_UI_X * 1.05 + 40, INIT_MAIN_UI_Y * 6 + 60, 1500, 470)
            scrollViewContent.setMask(mask.createGeometryMask());
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
        middleHeading = new CustomButton_1.CustomButton(this, cardxPos, 150,'button1Normal', 'button1Hover', `${this.contractors[this.contractorsWindow[1]]}`, 30).setScale(1.2, 1.2);
        this.add.existing(middleHeading);

        leftHeading = new CustomButton_1.CustomButton(this, middleHeading.x - middleHeading.width - HEADING_DIST, 150,'button1Normal', 'button1Hover', `${this.contractors[this.contractorsWindow[0]]}`, 30).setScale(0.75, 0.75);
        this.add.existing(leftHeading);

        rightHeading = new CustomButton_1.CustomButton(this, middleHeading.x + middleHeading.width + HEADING_DIST, 150,'button1Normal', 'button1Hover', `${this.contractors[this.contractorsWindow[2]]}`, 30).setScale(0.75, 0.75);
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

exports.ContractScene = ContractScene;
