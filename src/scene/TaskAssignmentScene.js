"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskAssignmentScene = void 0;
const Control_1 = require("../gameinput/Control");
const Config_1 = require("../config/Config");
const CustomButton_1 = require("../button/CustomButton");
class TaskAssignmentScene extends Phaser.Scene {
    constructor() {
        super('TaskAssignmentScene');
    }
    preload() {
        this.control = new Control_1.Control(this);
        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');
        this.load.json('data', 'assets/project/bridge1.json');
        this.load.image('card2', 'assets/cards/card2/Card X2.png');
        this.load.image('checkbox', 'assets/images/checkbox.jpg');
        this.load.image('tick', 'assets/images/checkmark.png');
    }
    create() {
        const INIT_MAIN_UI_X = 88;
        const INIT_MAIN_UI_Y = 22;
        // draw background
        this.add.image(Config_1.Config.WindowWidth / 2, Config_1.Config.WindowHeight / 2, 'card2').setScale(2.5, 2.3);
        // add done button
        const doneButton = new CustomButton_1.CustomButton(this, INIT_MAIN_UI_X * 11, INIT_MAIN_UI_Y * 39, 'button1Normal', 'button1Hover', 'Done', 25);
        this.add.existing(doneButton);
        doneButton.setDepth(1);
        // go main scene
        doneButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.stop('TaskAssignmentScene');
            this.scene.launch('ContractorsScene');
        });
        // add title 
        this.add.text(Config_1.Config.WindowWidth / 2.25, Config_1.Config.WindowHeight / 5, 'TASKS', {
            color: '#fcd498',
            fontSize: 75,
            align: 'top',
        });
        const CONTENT_BUFFER_X = 540;
        const HEADING_SPACE_Y = 250;
        // add scroll view 
        this.scrollView = this.add.container(INIT_MAIN_UI_X * 1.05, INIT_MAIN_UI_Y * 6);
        // lists to store task, clickAreas
        let tasks = []; // change to Task[]
        let clickAreas = [];
        let infoNum = this.cache.json.get('data').infoGenerateNum;
        // generate random info 
        this.generateContent(INIT_MAIN_UI_X, INIT_MAIN_UI_Y, CONTENT_BUFFER_X, HEADING_SPACE_Y, tasks, clickAreas, infoNum);
        // add scroll bar
        this.scrollbar = this.add.graphics();
        this.scrollbar.fillStyle(0x666666, 1);
        this.scrollbar.fillRect(INIT_MAIN_UI_X * 15, INIT_MAIN_UI_Y * 16, 30, 200);
    }
    update() {
        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEnter);
        if (isSelectDown) {
            this.scene.stop('GameMenu');
            this.scene.launch('MainScene');
        }
        // set scroll bar
        this.scrollbar.setInteractive(new Phaser.Geom.Rectangle(this.scrollbar.commandBuffer[4], this.scrollbar.commandBuffer[5], 30, 200), Phaser.Geom.Rectangle.Contains);
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
            this.scrollbar.y = Phaser.Math.Clamp(offsetY, 50, 250);
            //set scroll speed
            const contentY = (this.scrollbar.y / 8) * (this.cache.json.get('data').infoGenerateNum * 2.6 + (0.65 * (this.cache.json.get('data').infoGenerateNum - 20))) - 400;
            this.scrollView.y = -contentY;
        }
    }
    generateContent(INIT_MAIN_UI_X, INIT_MAIN_UI_Y, CONTENT_BUFFER_X, HEADING_SPACE_Y, names, ratings, prices, clickAreas, infoNum) {
        // put random info[default = 20 messages]
        for (let i = 0; i < infoNum; i++) {
            const scrollViewContent = this.add.container(this.scrollView.x / 10, this.scrollView.y / 4 * i);
            this.scrollView.add(scrollViewContent);
            // name
            const generateTask = generateRandomTasks();
            const taskName = this.add.text(scrollViewContent.x + CONTENT_BUFFER_X, scrollViewContent.y + i * 22 + HEADING_SPACE_Y, generateTask, {
                fontSize: 30,
                color: '#ffffff'
            });
            scrollViewContent.add(taskName);
            // Checkbox
            const clickArea = this.add.graphics();
            clickArea.fillStyle(0xff0000); // You can use any color you like
            clickArea.setAlpha(0.5);
            clickArea.setDepth(-1);
            scrollViewContent.add(clickArea);
            const checkbox = this.add.image(scrollViewContent.x + CONTENT_BUFFER_X + 500, scrollViewContent.y + i * 22 + HEADING_SPACE_Y + 14, 'checkbox')
                .setScale(0.1, 0.1)
                .setInteractive();
            const tick = this.add.image(scrollViewContent.x + CONTENT_BUFFER_X + 500, scrollViewContent.y + i * 22 + HEADING_SPACE_Y + 14, 'tick')
                .setScale(0.1, 0.1)
                .setVisible(false); // Initially hidden
            // Add a click event to toggle the checkbox state and show/hide the tick
            checkbox.on('pointerdown', () => {
                if (tick.visible) {
                    tick.setVisible(false);
                }
                else {
                    tick.setVisible(true);
                }
            });
            scrollViewContent.add(checkbox);
            scrollViewContent.add(tick);
            // add to tasks
            tasks.push(taskName);
            // add scroll view mask
            const mask = this.make.graphics();
            mask.fillStyle(0xffffff);
            mask.fillRect(0, -1000, 1000, 1000);
            mask.fillStyle(0x000000);
            mask.fillRect(INIT_MAIN_UI_X * 1.05 + 50, INIT_MAIN_UI_Y * 4 + 210, 1382, 500);
            scrollViewContent.setMask(mask.createGeometryMask());
        }
    }
}
exports.TaskAssignmentScene = TaskAssignmentScene;
function generateRandomTasks() {
    const prefixes = [
        'Install',
        'Test',
        'Repair',
        'Apply',
        'Smooth',
        'Inspect',
        'Build',
        'Design',
        'Lay',
        'Paint',
        'Excavate',
        'Backfill',
        'Finish',
        'Measure'
    ];
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const vowels = 'aeiou';
    const taskNameLength = Phaser.Math.Between(5, 10);
    const suffixesNameNum = Phaser.Math.Between(0, 13);
    let taskName;
    string = '';
    for (let i = 0; i < taskNameLength; i++) {
        if (i % 2 === 0) {
            taskName += consonants.charAt(Phaser.Math.Between(0, consonants.length - 1));
        }
        else {
            taskName += vowels.charAt(Phaser.Math.Between(0, vowels.length - 1));
        }
    }
    return prefixes[suffixesNameNum] + ' ' + taskName;
}
