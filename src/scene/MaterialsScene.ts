// import Control from "../gameinput/Control.ts";
import Config from "../config/Config.ts";
import CustomButton from "../button/CustomButton.ts";
import TaskAssignmentScene from "./TaskAssignmentScene.ts";

export default class MaterialsScene extends Phaser.Scene {

    // private control?: Control;
    private scrollbar?: Phaser.GameObjects.Graphics;
    private scrollView?: Phaser.GameObjects.Container;
    private isDragging: boolean = false;
    private count: number = 0;

    constructor() {
        super('MaterialsScene')

        // game controls
    }

    preload() {
        //this.control = new Control(this);

        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');

        this.load.image('background', 'assets/backgrounds/background1.png');
        this.load.image('card', 'assets/cards/card3/Card X5.png')
    }

    create() {
        const INIT_MAIN_UI_X: number = 200;
        const INIT_MAIN_UI_Y: number = 50;

        //add background
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');

        // add card
        const card = this.add.image(INIT_MAIN_UI_X * 4.8, INIT_MAIN_UI_Y * 11.5, 'card').setScale(2.5, 2);


        //add exit button
        const exitButton: CustomButton = new CustomButton(this, INIT_MAIN_UI_X * 8, INIT_MAIN_UI_Y * 20, 'button1Normal', 'button1Hover', 'Exit', 30);
        this.add.existing(exitButton);
        exitButton.setDepth(1);

        // go main scene
        exitButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, (): void => {
                this.scene.stop('MaterialsScene');
                this.scene.launch('ProjectScene');
            });

        const CONTENT_BUFFER_X: number = 50;
        const SUBHEADING_SPACE_Y: number = 100;

        // add scroll view
        this.scrollView = this.add.container(INIT_MAIN_UI_X * 1.05, INIT_MAIN_UI_Y * 6 + SUBHEADING_SPACE_Y);

        // add subheadings
        this.add.text(this.scrollView.x, this.scrollView.y - SUBHEADING_SPACE_Y, `Material\t\t\t\t\t\t\t\tUnits\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t`, {
            fontSize: 40,
            color: '#ffffff'
        });

        // put random info
        for (let i = 0; i < 10; i++) {
            // add each contract
            // @ts-ignore
            const scrollViewContent: Phaser.GameObjects.Container = this.add.container(this.scrollView.x - 200, this.scrollView.y / 4 * i);
            // @ts-ignore
            this.scrollView.add(scrollViewContent);
            // name
            const generateName = generateRandomMaterial();
            const material = this.add.text(0, 0, generateName, {
                fontSize: 40,
                color: '#ffffff'
            });
            scrollViewContent.add(material);

            const generateUnits = Phaser.Math.Between(0, 2000);
            const price1 = this.add.text(400, 0, `${generateUnits}`, {
                fontSize: 40,
                color: '#ffffff'
            });
            scrollViewContent.add(price1);

            let generatePrice = Phaser.Math.Between(0, 2000);
            let number = 0;
            let price = 0
            let numberText;
            let priceText;

            numberText = this.add.text(card.x - 310, 0, number.toString(), {
                fontSize: '40px',
                fill: '#ffffff'
            });
            scrollViewContent.add(numberText);

            priceText = this.add.text(card.x - 180, 0, '', {
                fontSize: '40px',
                fill: '#ffffff'
            });
            scrollViewContent.add(priceText);

            const incrementButton = this.add.text(card.x - 255, 0, '+', {
                fontSize: '40px',
                fill: '#ffffff'
            });

            incrementButton.setInteractive();
            incrementButton.on('pointerdown', () => {
                number++;
                numberText.setText(number.toString())
                price = generatePrice * number
                priceText.setText('Total: $' + price.toString())
            });
            scrollViewContent.add(incrementButton);

            const decrementButton = this.add.text(card.x - 340, 0, '-', {
                fontSize: '32px',
                fill: '#ffffff'
            });
            decrementButton.setInteractive();
            decrementButton.on('pointerdown', () => {
                if (number > 0)
                    number--;
                numberText.setText(number.toString())
                price = generatePrice * number
                priceText.setText('Total: $' + price.toString())
            });
            scrollViewContent.add(decrementButton);

            const buy = new CustomButton(this, card.x + 290, 10, 'button1Normal', 'button1Hover', 'Buy', 30);
            scrollViewContent.add(buy);

            buy.setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    number = 0
                    price = 0
                    price = generatePrice * number
                    numberText.setText(number.toString())
                    priceText.setText('')
                });

            // add scroll view mask
            const mask = this.make.graphics();
            mask.fillStyle(0xffffff);
            mask.fillRect(0, -1000, 1000, 1000);
            mask.fillStyle(0x000000);
            mask.fillRect(100, 315, 1900, 600)
            scrollViewContent.setMask(mask.createGeometryMask());
        }

        // add scroll bar
        this.scrollbar = this.add.graphics();
        this.scrollbar.fillStyle(0x666666, 1);
        this.scrollbar.fillRect(INIT_MAIN_UI_X * 8.5, INIT_MAIN_UI_Y * 7.8, 30, 50);
    }

    update() {
        // @ts-ignore
        this.scrollbar.setInteractive(new Phaser.Geom.Rectangle(this.scrollbar.commandBuffer[4], this.scrollbar.commandBuffer[5], 30, 50), Phaser.Geom.Rectangle.Contains);

        // @ts-ignore
        this.scrollbar.on('pointerdown', (): void => {
            this.isDragging = true;
        });

        this.input.on('pointerup', (): void => {
            this.isDragging = false;
        });

        // set scroll view connect with scroll bar
        if (this.isDragging) {
            const pointer: Phaser.Input.Pointer = this.input.activePointer;

            // @ts-ignore
            const offsetY: number = pointer.y - this.scrollbar.commandBuffer[5];
            // @ts-ignore
            this.scrollbar.y = Phaser.Math.Clamp(offsetY, 0, 410);

            //set scroll speed
            // @ts-ignore
            const contentY: number = (this.scrollbar.y / 10) * (20 * 2.6 + (0.65 * (20 - 20))) - 400;
            // @ts-ignore
            this.scrollView.y = -contentY;
        }// @ts-ignore
        this.scrollbar.setInteractive(new Phaser.Geom.Rectangle(this.scrollbar.commandBuffer[4], this.scrollbar.commandBuffer[5], 30, 50), Phaser.Geom.Rectangle.Contains);

        // @ts-ignore
        this.scrollbar.on('pointerdown', (): void => {
            this.isDragging = true;
        });

        this.input.on('pointerup', (): void => {
            this.isDragging = false;
        });

        // set scroll view connect with scroll bar
        if (this.isDragging) {
            const pointer: Phaser.Input.Pointer = this.input.activePointer;

            // @ts-ignore
            const offsetY: number = pointer.y - this.scrollbar.commandBuffer[5];
            // @ts-ignore
            this.scrollbar.y = Phaser.Math.Clamp(offsetY, 0, 410);

            //set scroll speed
            // @ts-ignore
            const contentY: number = (this.scrollbar.y / 10) * (20 * 2.6 + (0.65 * (20 - 20))) - 400;
            // @ts-ignore
            this.scrollView.y = -contentY;
        }
    }
}

function generateRandomMaterial() {
    const materials = [
        'wood',
        'marble',
        'obsidian',
        'cobblestone',
        'sand',
    ];

    const materialsNameNum = Phaser.Math.Between(0, materials.length - 1);
    return materials[materialsNameNum]
}

