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
        this.contractors = ['Plumbers', 'Electricians', 'Plasterers', 'Carpenter', 'Painters', 'Masons', 'Landscapers', 'Excavators', 'Concreters', 'Framers', 'HVAC'];
        this.contractorsWindow = [0, 1, 2];
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
        const INIT_MAIN_UI_X = 200;
        const INIT_MAIN_UI_Y = 50;

        // add background
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');

        // add exist button
        const exitButton = new CustomButton(this, INIT_MAIN_UI_X * 8, INIT_MAIN_UI_Y * 20,'button1Normal', 'button1Hover', 'Exit', 30);
        this.add.existing(exitButton);
        exitButton.setDepth(1);

        // go main scene
        exitButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('ContractScene');
                this.scene.launch('MainScene');
            });

        // add title
        this.add.text(Config.WindowWidth / 16, Config.WindowHeight / 16, 'CONTRACT', {
            color: '#fcd498',
            fontSize: 100,
            align: 'top',
        });

        // add card
        const card = this.add.image(INIT_MAIN_UI_X * 4.8, INIT_MAIN_UI_Y * 11.5, 'card').setScale(2.5, 2);

        // add arrows
        const ARROW_DIST = 500;
        const leftArrow = this.add.image(card.x - ARROW_DIST, 150, 'left-arrow');
        const rightArrow = this.add.image(card.x + ARROW_DIST, 150, 'right-arrow');

        // add contractor-type heading
        const HEADING_DIST = 20;
    
        let middleHeading = new CustomButton(this, card.x, 150,'button1Normal', 'button1Hover', 'Electricians', 30).setScale(1.2, 1.2);
        this.add.existing(middleHeading);

        let leftHeading = new CustomButton(this, middleHeading.x - middleHeading.width - HEADING_DIST, 150,'button1Normal', 'button1Hover', 'Plumbers', 30).setScale(0.75, 0.75);
        this.add.existing(leftHeading);

        let rightHeading = new CustomButton(this, middleHeading.x + middleHeading.width + HEADING_DIST, 150,'button1Normal', 'button1Hover', 'Plasterers', 30).setScale(0.75, 0.75);
        this.add.existing(rightHeading);
       
        const CONTENT_BUFFER_X = 50;
        const SUBHEADING_SPACE_Y = 100;

        // add scroll view
        this.scrollView = this.add.container(INIT_MAIN_UI_X * 1.05, INIT_MAIN_UI_Y * 6 + SUBHEADING_SPACE_Y);

        const subHeadings = this.add.text(this.scrollView.x, this.scrollView.y - SUBHEADING_SPACE_Y, `\t\t\t\tCompany Name\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tRating\t\t\t\t\t\t\tRate/Day`, {
            fontSize: 40,
            color: '#ffffff'
        });

        // lists to store names, price, rating, clickAreas
        let names = [];
        let ratings = [];
        let prices = [];
        let clickAreas = [];
        let infoNum = this.cache.json.get('data').infoGenerateNum;

        // generate random info
        this.generateContent(INIT_MAIN_UI_X, INIT_MAIN_UI_Y, CONTENT_BUFFER_X, SUBHEADING_SPACE_Y, names, ratings, prices, clickAreas, infoNum)

        // move between contractors
        leftArrow.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.shiftHeading(leftHeading, middleHeading, rightHeading, 'left', card.x, HEADING_DIST);
                    this.destroyWindowContents(names, ratings, prices, clickAreas);
                    this.generateContent(INIT_MAIN_UI_X, INIT_MAIN_UI_Y, CONTENT_BUFFER_X, SUBHEADING_SPACE_Y, names, ratings, prices, clickAreas, infoNum)
                    // console.log('left');
        });

        rightArrow.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.shiftHeading(leftHeading, middleHeading, rightHeading, 'right', card.x, HEADING_DIST);
                    this.destroyWindowContents(names, ratings, prices, clickAreas);
                    this.generateContent(INIT_MAIN_UI_X, INIT_MAIN_UI_Y, CONTENT_BUFFER_X, SUBHEADING_SPACE_Y, names, ratings, prices, clickAreas, infoNum)
                    // console.log('right');
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


    generateContent(INIT_MAIN_UI_X, INIT_MAIN_UI_Y, CONTENT_BUFFER_X, SUBHEADING_SPACE_Y, names, ratings, prices, clickAreas, infoNum) {
        // put random info[default = 20 messages]
        for (let i = 0; i < infoNum; i++) {
            // add each contract
            const scrollViewContent = this.add.container(this.scrollView.x / 10, this.scrollView.y / 6 * i);
            this.scrollView.add(scrollViewContent);

            // name
            const generateName = generateRandomCompanyName();
            const companyName = this.add.text(scrollViewContent.x + CONTENT_BUFFER_X, scrollViewContent.y, generateName, {
                fontSize: 40,
                color: '#ffffff'
            });
            scrollViewContent.add(companyName);

            // add to names
            names.push(companyName);

            // rating
            const generateRating = generateRandomRating();
            const ratingImage = this.add.image(scrollViewContent.x + 1000, scrollViewContent.y + 18,  generateRating)
                .setScale(0.1, 0.1)
            scrollViewContent.add(ratingImage);

            // add to ratings
            ratings.push(ratingImage);

            // price
            const generatePrice = generateRandomPrice(ratingImage.texture.key);
            const price = this.add.text(scrollViewContent.x + 1200, scrollViewContent.y+3, `$${generatePrice}`, {
                fontSize: 40,
                color: '#ffffff'
            });
            scrollViewContent.add(price);

            // add to prices
            prices.push(price);

            // add each container's touchable area
            const clickArea = this.add.graphics();
            clickArea.fillStyle(0xff0000);
            clickArea.fillRoundedRect(scrollViewContent.x, scrollViewContent.y - 10, 1380, 60, 10);
            clickArea.setAlpha(0.5);
            clickArea.setDepth(-1);
            scrollViewContent.add(clickArea);

            // add clickArea
            clickAreas.push(clickArea);

            // set each clickArea open window
            const areaCheck1 = new Phaser.Geom.Rectangle(scrollViewContent.x, scrollViewContent.y - 10, 1380, 60)
            const areaCheck2 = new Phaser.Geom.Rectangle(INIT_MAIN_UI_X * 1.05 + 40, INIT_MAIN_UI_Y * 6 - 10, 1382, 571)

            clickArea.setInteractive(areaCheck1, Phaser.Geom.Rectangle.Contains)
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, function (pointer) {
                    // unsure click in two area
                    if (Phaser.Geom.Rectangle.Contains(areaCheck2, pointer.x, pointer.y)) {
                        // console.log(companyName.text);
                        // this.createWindow(TaskAssignmentScene);

                        // remove contractor entry - potentially change this until after selection has been made
                        companyName.destroy();
                        ratingImage.destroy();
                        price.destroy();
                        clickArea.destroy();

                        this.createWindow(TaskAssignmentScene); 

                    }
                }, this);

            // add scroll view mask
            const mask = this.make.graphics();
            mask.fillStyle(0xffffff);
            mask.fillRect(0, -1000, 1000, 1000);
            mask.fillStyle(0x000000);
            mask.fillRect(INIT_MAIN_UI_X * 1.05 + 40, INIT_MAIN_UI_Y * 6 + 80, 1382, 470)
            scrollViewContent.setMask(mask.createGeometryMask());
        }

    }

    createWindow (func)
    {
        var handle = 'window' + this.count++;
        var win = this.add.zone(400, 400, func.WIDTH, func.HEIGHT).setInteractive().setOrigin(0);
        var demo = new func(handle, win);
        this.input.setDraggable(win);

        win.on('drag', function (pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
            demo.refresh()
        });
        this.scene.add(handle, demo, true);
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

        // console.log('left: ' + left);
        // console.log('middle: ' + middle);
        // console.log('right: ' + right);

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

    destroyWindowContents(names, ratings, prices, clickAreas) {
        for (let i = 0; i < names.length; i++) {
            names[i].destroy();
            ratings[i].destroy();
            prices[i].destroy();
            clickAreas[i].destroy();
        }
    }

}

function generateRandomCompanyName() {
    const suffixes = [
        'Inc.',
        'Corporation',
        'Industries',
        'Innovators',
        'Ventures',
        'Ltd.',
        'Group',
        'Services',
        'Builders',
        'Partners',
        'Enterprises'
    ];
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const vowels = 'aeiou';
    const companyNameLength = Phaser.Math.Between(5, 10);
    const suffixesNameNum = Phaser.Math.Between(0, 10);

    let companyName = '';
    for (let i = 0; i < companyNameLength; i++) {
        if (i % 2 === 0) {
            companyName += consonants.charAt(Phaser.Math.Between(0, consonants.length - 1));
        } else {
            companyName += vowels.charAt(Phaser.Math.Between(0, vowels.length - 1));
        }
    }
    return companyName.charAt(0).toUpperCase()
        + companyName.slice(1)
        + " "
        + suffixes[suffixesNameNum];
}

function generateRandomPrice(ratingImageName) {
    const priceRanges = [
        { min: 50, max: 150 },
        { min: 151, max: 250 },
        { min: 251, max: 350 },
        { min: 351, max: 450 },
        { min: 451, max: 550 },
        { min: 551, max: 650 }
    ];

    const star = parseInt(ratingImageName.charAt(0))
    return Phaser.Math.Between(priceRanges[star].min, priceRanges[star].max);
}

function generateRandomRating() {
    const randomValue = Math.random();

    if (randomValue < 0.05) {
        return "5 star";
    } else if (randomValue < 0.15) {
        return "4 star";
    } else if (randomValue < 0.35) {
        return "3 star";
    } else if (randomValue < 0.60) {
        return "2 star";
    } else if (randomValue < 0.90) {
        return "1 star";
    } else {
        return "0 star";
    }
}
