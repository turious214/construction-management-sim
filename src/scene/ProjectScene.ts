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

    private taskButtonContainers: Phaser.GameObjects.Container[] = [];

    private scrollBar?: Phaser.GameObjects.Graphics;
    private scrollY = 0;
    private maxY = 0;
    
    constructor() {
        super('ProjectScene');

        this.tasks = [
            [
                new Task("task 1", "description 1", false),
                
            ],
            [
                new Task("task 2", "description 2", false),
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
                new Task("task 8", "description 8", false),
                new Task("task 9", "description 9", false),
                new Task("task 10", "description 10", false),
            ],

        ];
    }

    preload() {
        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');
        this.load.image('background', 'assets/backgrounds/background1.png');

        this.load.image('taskCard', 'assets/cards/card3/Card X5.png');
        this.load.image('background', 'assets/backgrounds/background1.png');

        this.load.image('leftArrow', 'assets/icons/09.png');
        this.load.image('rightArrow', 'assets/icons/10.png');
        
    }

    create() {
        
        
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');
        const TASK_SCALE_FACTOR = 0.5;
        const TASK_X_START_POS = 200;
        const XPOS_DIFF_FACTOR = 450;
        const TASK_Y_START_POS = 300;
        const YPOS_DIFF_FACTOR = 300;

        this.taskButtonContainers = [];
        for (let i = 0; i < this.tasks.length; i++) {

            // Draw a vertical white line between each task
            const graphics = this.add.graphics();
            graphics.lineStyle(2, 0xffffff); 
            graphics.beginPath();
            graphics.moveTo((TASK_X_START_POS + XPOS_DIFF_FACTOR * i) + 220, 1000);
            graphics.lineTo((TASK_X_START_POS + XPOS_DIFF_FACTOR * i) + 220, 200); 
            graphics.strokePath();
            graphics.closePath();

            for (let j = 0; j < this.tasks[i].length; j++) {
                const task = this.tasks[i][j];
                if(j > this.maxY) {
                    this.maxY = j;
                }
                // Create a container for the task button
                const taskButtonContainer = this.add.container(
                    TASK_X_START_POS + XPOS_DIFF_FACTOR * i,
                    TASK_Y_START_POS + YPOS_DIFF_FACTOR * j
                );
                
                taskButtonContainer.setData('startingYPos', TASK_Y_START_POS + YPOS_DIFF_FACTOR*i);
                // Create a task button as an image
                const taskButtonImage = this.add.image(0, 0, 'taskCard');
                taskButtonImage.setScale(TASK_SCALE_FACTOR, TASK_SCALE_FACTOR);
                taskButtonContainer.add(taskButtonImage);
        
                // Set the size of the container to match the task button image
                taskButtonContainer.setSize(taskButtonImage.width, taskButtonImage.height);
        
                

                // Create text and add it to the container
                const taskText = this.add.text(-110, -50, task.Title, { fontSize: '70px', color: '#ffffff', wordWrap: { width: 10 } }).setOrigin(0, 0);
                taskButtonContainer.add(taskText);
        
                // Set the container as interactive
                taskButtonContainer.setInteractive();
        
                // Define a callback function when the container is clicked
                taskButtonContainer.on('pointerdown', () => {
                    // Handle the task button click here, e.g., show task details
                    console.log(`Task ${i + 1}-${j + 1} (${task.Title}) clicked.`);
                    this.openPopup(task);
                });
                // Give the container a unique name for later reference
                taskButtonContainer.setName(`taskButtonContainer_${i}_${j}`);
                this.taskButtonContainers.push(taskButtonContainer);
            }
        }

        //scrollbar
        this.scrollBar = this.add.graphics();
        this.scrollBar.fillStyle(0x888888, 1);
        this.scrollBar.fillRect(Config.WindowWidth - 20, 0, 20, Config.WindowHeight);


        const leftArrowButton = this.add.image(50, 50, 'leftArrow');
        leftArrowButton.setInteractive();
        leftArrowButton.on('pointerdown', () => {
            // Shift the taskButton container to the right by the width of a task button
            console.log(`left clicked.`);
            this.shiftTaskButtons(XPOS_DIFF_FACTOR);
        });

        // Create right arrow button
        const rightArrowButton = this.add.image(Config.WindowWidth - 50, 50, 'rightArrow');
        rightArrowButton.setInteractive();
        rightArrowButton.on('pointerdown', () => {
            // Shift the taskButton container to the left by the width of a task button
            console.log(`right clicked.`);
            this.shiftTaskButtons(-XPOS_DIFF_FACTOR);
        });

        this.input.on('wheel', (pointer: Phaser.Input.Pointer, gameObjects: Phaser.GameObjects.GameObject[], deltaX: number, deltaY: number, deltaZ: number) => {
            this.scrollTasks(-deltaY * 0.1); // Adjust the scrolling speed as needed
        });

    }

    update() {
    }

    private scrollTasks(scrollAmount: number): void {
        this.scrollY += scrollAmount;
    
        const minY = 0;
    
        this.scrollY = Phaser.Math.Clamp(this.scrollY, minY, this.maxY);

        if (this.taskButtonContainers[0].y - scrollAmount > 300) {
            return;
        }
        if (this.taskButtonContainers[this.taskButtonContainers.length -1].y -scrollAmount < this.maxY + 900) {
            return;
        }
    
        for (let i = 0; i < this.taskButtonContainers.length; i++) {

            const taskButtonContainer = this.taskButtonContainers[i];
            taskButtonContainer.y -= scrollAmount;
        }
    }
    

    private shiftTaskButtons(shiftAmount: number): void {
        //set the bounds of horizontal scroll
        if (this.taskButtonContainers[this.taskButtonContainers.length - 1].x + shiftAmount < 1500){
            return;
        }
        if (this.taskButtonContainers[0].x + shiftAmount > 200){
            return;
        }

        for (let i = 0; i < this.taskButtonContainers.length; i++) {
            // Get the current taskButtonContainer
            const taskButtonContainer = this.taskButtonContainers[i];
    
            // Update the x position of the container by the shiftAmount
            taskButtonContainer.x += shiftAmount;
            
        }
    }

    private openPopup(task: Task): void {

        if (this.popupContainer) {
            return;
        }

        // Create the popup container
        this.popupContainer = this.add.container(Config.WindowWidth / 2, Config.WindowHeight / 2);
    
        // Create an image and add it to the popup container
        const popupImage = this.add.image(0, 0, 'taskCard'); 
        popupImage.setScale(2.5); // Adjust the scale as needed
        this.popupContainer.add(popupImage);

        // Set the size of the container to match the popupImage
        this.popupContainer.setSize(popupImage.width*2.5, popupImage.height*2.5);

        // Make the popup container non-clickable through
        this.popupContainer.setInteractive({ inputEnabled: true });

        //const popupBackground = this.add.rectangle(0, 0, 400, 200, 0x000000, 0.8);
        //this.popupContainer.add(popupBackground);
    
        // Create text to overlay on the image
        const TaskDescriptionText = this.add.text(0, 0, task.description, {
            fontSize: '48px',
            color: '#ffffff',
            wordWrap: { width: popupImage.width },
        });
        TaskDescriptionText.setOrigin(0, 0); // Center the text on the image
        
        // Position the image and text as needed
        TaskDescriptionText.setPosition(-popupImage.width, -popupImage.height );
        this.popupContainer.add(TaskDescriptionText);

        // Create a close button using the 'taskCard' image
        const closeButton = this.add.image(
            popupImage.width + 10, 
            popupImage.height , 
            'taskCard'
        ).setScale(0.25); 

        closeButton.setOrigin(1, 1); 
        closeButton.setInteractive();

        // Add "Exit" text to the close button
        const exitText = this.add.text(
            closeButton.x - 100, 
            closeButton.y - 55, 
            'Exit',
            {
                fontSize: '24px',
                color: '#ffffff',
            }
        );

        closeButton.on('pointerdown', () => {
            // Close the popup when the close button is clicked
            this.closePopup();
        });

        // Add the close button and text to the popup container
        this.popupContainer.add([closeButton, exitText]);
        
    }
      
    
      private closePopup(): void {
        if (this.popupContainer) {
          this.popupContainer.destroy();
          this.popupContainer = undefined;
        }
      }
    
    
    
}