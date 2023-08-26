class Personnel extends Phaser.Scene {
    constructor() {
        super('Personnel');

        // game controls
        this.control = null;
        this.cursor = null;
        this.snapZones = []; // Array to store snap zones
        this.panels = []; // Array to store panels
    }

    preload() {
        this.control = new Control(this);
        this.load.json('data', 'assets/project/bridge1.json');

        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');

        this.load.image('cardBackground', 'assets/cards/card3/Card X5.png');
        this.load.image('taskCard', 'assets/cards/card1/Card X1.png');
        this.load.image('panel', 'assets/cards/card1/Panel Empty Green.png');
        this.load.image('background', 'assets/backgrounds/background1.png');
    }

    create() {
        const jsonData = this.cache.json.get('data');
        if (jsonData) {
            const numTasks = jsonData.numTasks;
            const personnelPerTask = jsonData.PersonnelPerTask;
            const personnelNames = jsonData.personnelNames;

            const BOX_Y_POS = 100;
        const TaskXPos = [];
        const TASK_1_X_POS = 130;
        const TASK_SEPERATION_FACTOR = 200;
        let i = 0;
        while (i < numTasks) {
            if (i == 0) {
                TaskXPos[i] = TASK_1_X_POS;
            }
            else {
                TaskXPos[i] = TaskXPos[i-1] + TASK_SEPERATION_FACTOR;
            }
            i++;
        }
        
        

        const TASK_Y_POS = 500;


        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');
        const card = this.add.image(this.cameras.main.width / 2, BOX_Y_POS, 'cardBackground').setScale(1.1, 0.5);

        const cardText = this.add.text(75, BOX_Y_POS-70, 'Available Personnel', {
             fontSize: 20, 
             color: '#ffffff' 
            });
        //card.add(cardText);
        cardText.setOrigin(0,0);

        //make tasks
        const tasks = [];
        i = 0;
        while(i < numTasks) {
            tasks[i] = this.add.image(TaskXPos[i], TASK_Y_POS, 'taskCard').setScale(0.5, 0.7);
            i++;
            this.add.text(TaskXPos[i-1] - 40, TASK_Y_POS-225, `Task ${i}`, { fontSize: '20px', color: '#ffffff' });
        }

        // const cardTextTask1 = this.add.text(TASK_1_X_POS - 40 , TASK_Y_POS-225, 'Task 1', { fontSize: '20px', color: '#ffffff' });
        // cardTextTask1.setOrigin(0, 0);
    
        // const cardTextTask2 = this.add.text(TASK_2_X_POS - 40 , TASK_Y_POS-225, 'Task 2', { fontSize: '20px', color: '#ffffff' });
        // cardTextTask2.setOrigin(0, 0);
    
        // const cardTextTask3 = this.add.text(TASK_3_X_POS - 40, TASK_Y_POS-225, 'Task 3', { fontSize: '20px', color: '#ffffff' });
        // cardTextTask3.setOrigin(0, 0);

        // Create snap positions
        const snapPositions = [200, 400, 600];
        //const Task1snapPositions = [200, 400, 600];

        // Create snap zones and panels
        for (const xPos of snapPositions) {
            const snapZone = this.add.zone(xPos, BOX_Y_POS, 150, card.height);
            this.snapZones.push(snapZone);

            const panel = this.add.image(snapZone.x, snapZone.y, 'panel').setInteractive({ draggable: true });
            this.panels.push(panel);

            this.input.setDraggable(panel);

            // Add drag event listeners
            panel.on('drag', (pointer, dragX, dragY) => {
                panel.x = dragX;
                panel.y = dragY;
            });

            panel.on('dragend', () => {
                const closestSnapZone = this.getClosestSnapZone(panel);

                if (closestSnapZone) {
                    panel.x = closestSnapZone.x;
                    panel.y = closestSnapZone.y;
                }
            });
        }
        } else {
            console.error('Failed to load JSON data.');
        }
        
    }

    update() {
        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEsc);
        if (isSelectDown) {
            this.scene.stop('Personnel');
            this.scene.launch('MainScene');
        }
    }

    getClosestSnapZone(panel) {
        let minDistance = Number.MAX_VALUE;
        let closestZone = null;

        for (const snapZone of this.snapZones) {
            const distance = Phaser.Math.Distance.Between(panel.x, panel.y, snapZone.x, snapZone.y);

            if (distance < minDistance) {
                minDistance = distance;
                closestZone = snapZone;
            }
        }

        return closestZone;
    }
}
