// import Control from "../gameinput/Control.ts"
import Config from "../config/Config.ts"
// import CustomButton from "../button/CustomButton.ts"
class Task {
    constructor(public Title: string, public description: string, public isCompleted: boolean) {}
  }

export default class ProjectScene extends Phaser.Scene {

    // @ts-ignore
    private funds: number;
    private tasks: Task[][];
    private popupContainer?: Phaser.GameObjects.Container;
    
    constructor() {
        super('ProjectScene');
        //this.popupContainer = this.add.container(0, 0);

        this.tasks = [
            [
                new Task("task 1", "description 1", false),
                new Task("task 2", "description 2", false),
            ],
            [
                new Task("task 3", "description 3", false),
            ],
            [
                new Task("task 4", "description 4", false),
                new Task("task 5", "description 5", false),
                new Task("task 6", "description 6", false),
            ],
            [
                new Task("task 7", "description 7", false),
            ],
            [
                new Task("task 8", "description 8", false),
                new Task("task 9", "description 9", false),
                new Task("task 10", "description 10", false),
            ],
            [
                new Task("task 11", "description 11", false),
                new Task("task 12", "description 12", false),
            ],

        ];
    }

    preload() {
        // this.control = new Control(this);
        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');
        this.load.image('background', 'assets/backgrounds/background1.png');

        //this.load.image('cardBackground', 'assets/cards/card3/Card X5.png');
        this.load.image('taskCard', 'assets/cards/card3/Card X5.png');
        //this.load.image('panel', 'assets/cards/card1/Panel Empty Green.png');
        this.load.image('background', 'assets/backgrounds/background1.png');
        
    }

    create() {
        
        
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');
        //this.cameras.main.setBounds(0, 0, Config.WindowWidth, Config.WindowHeight);
        const TASK_SCALE_FACTOR = 0.5;
        const TASK_X_START_POS = 200;
        const XPOS_DIFF_FACTOR = 450;
        const TASK_Y_START_POS = 300;
        const YPOS_DIFF_FACTOR = 300;

        for (let i = 0; i < this.tasks.length; i++) {
            for (let j = 0; j < this.tasks[i].length; j++) {
                const task = this.tasks[i][j];
                
                // Create a task button as an image
                const taskButton = this.add.image(
                    TASK_X_START_POS + XPOS_DIFF_FACTOR * i,
                    TASK_Y_START_POS + YPOS_DIFF_FACTOR * j,
                    'taskCard'
                ).setScale(TASK_SCALE_FACTOR, TASK_SCALE_FACTOR);
                
                this.add.text(TASK_X_START_POS + XPOS_DIFF_FACTOR * i - 110, TASK_Y_START_POS + YPOS_DIFF_FACTOR * j - 30, task.Title, { fontSize: '70px', color: '#ffffff' }).setOrigin(0,0);
                
                // Set interactive to make it clickable
                taskButton.setInteractive();

                // Define a callback function when the button is clicked
                taskButton.on('pointerdown', () => {
                    // Handle the task button click here, e.g., show task details
                    console.log(`Task ${i + 1}-${j + 1} clicked.`);

                    this.openPopup(task);
                });
            }
        }
    }

    update() {
    }

    private openPopup(task: Task): void {

        if (this.popupContainer) {
            // If a popup is open, close it before opening a new one
            //this.closePopup();
            return;
        }

        // Create the popup container
        this.popupContainer = this.add.container(Config.WindowWidth / 2, Config.WindowHeight / 2);
    
        // Create an image and add it to the popup container
        const popupImage = this.add.image(0, 0, 'taskCard'); // Replace 'taskCard' with the key of your image asset
        popupImage.setScale(2.5); // Adjust the scale as needed
        this.popupContainer.add(popupImage);

        const popupBackground = this.add.rectangle(0, 0, 400, 200, 0x000000, 0.8);
        this.popupContainer.add(popupBackground);
    
        // Create text to overlay on the image
        const popupText = this.add.text(0, 0, task.description, {
            fontSize: '24px',
            color: '#ffffff',
            wordWrap: { width: 360 },
        });
        popupText.setOrigin(1, 0.5); // Center the text on the image
        this.popupContainer.add(popupText);
    
        // Position the image and text as needed
        // Adjust the coordinates to place them correctly on the image
        popupImage.setPosition(0, 0);
        popupText.setPosition(0, popupImage.height / 2 + 20); // Adjust the Y position as needed
    
        // Create a close button
        const closeButton = this.add.text(180, 80, 'Close', {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 10, y: 5 },
        }).setInteractive();
        closeButton.on('pointerdown', () => {
            // Close the popup when the close button is clicked
            this.closePopup();
        });
        this.popupContainer.add(closeButton);
    }
      
    
      private closePopup(): void {
        if (this.popupContainer) {
          this.popupContainer.destroy();
          //this.popupContainer = this.add.container(0, 0);
          this.popupContainer = undefined;
        }
      }
    
    
    
}