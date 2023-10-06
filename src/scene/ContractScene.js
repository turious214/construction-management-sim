"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractScene = void 0;
class ContractScene extends Phaser.Scene {
    constructor() {
        super('ContractScene');
        // game controls
        // this.control = null;
        // this.scrollbar = null;
        // this.isDragging = false;
        // this.scrollView = null;
        // this.contractors = ['Plumbers', 'Electricians', 'Plasterers', 'Carpenter', 'Painters', 'Masons', 'Landscapers', 'Excavators', 'Concreters', 'Framers', 'HVAC'];
        // this.contractorsWindow = [0, 1, 2];
    }
    preload() {
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
    }
    create() {
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
        // this.scrollbar = this.add.graphics();
        // this.scrollbar.fillStyle(0x666666, 1);
        // this.scrollbar.fillRect(INIT_MAIN_UI_X * 8.5, INIT_MAIN_UI_Y * 7.8, 30, 50);
    }
    update() {
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
