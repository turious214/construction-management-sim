class MainScene extends Phaser.Scene {
    
    constructor() {
        super('MainScene');

        // game controls
        this.control = null;
        this.cursor = null;

        // remaining funds the player has 
        this.funds = null;

        // weather forecast for duration of project - implement
        this.weather = [];

        // text bubble shown to viewer at beginning of day
        this.narration = [];

        // complications - add game complexity - v2
        this.complications = [];

    }

    preload() {
        this.control = new Control(this);
        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');
        
    }

    create() {
       
        let graphics = this.add.graphics({
            fillStyle: {
                color: 0xc066f2a,
                alpha: 1,
                pattern: '../assets/images/Arkanos.png'
            }
            //0xc06f2a - original color
        });
        graphics.fillRect(0, 0, Config.WindowWidth, Config.WindowHeight);

        let startOption = this.add.text(200, 100, 'GAME', {
            color: '#fcd498',
            fontSize: 100,
            align: 'center'

        }).setFixedSize(400, 400);

        const INIT_MAIN_UI_X = 200;
        const INIT_MAIN_UI_Y = 50;
        const HUD_BUTTON_TEXT_SIZE = 30

        // projectButton
        // create button and add to scene
        
        const projectButton = new CustomButton(this, INIT_MAIN_UI_X, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Project', HUD_BUTTON_TEXT_SIZE);
        this.add.existing(projectButton);

        // program button to do something

        // contractorsButton
        const contractorsButton = new CustomButton(this, projectButton.x + projectButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Contractors', HUD_BUTTON_TEXT_SIZE);
        this.add.existing(contractorsButton);

        // materialsButton
        const materialsButton = new CustomButton(this, contractorsButton.x + contractorsButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Materials', HUD_BUTTON_TEXT_SIZE);
        this.add.existing(materialsButton);

        materialsButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.scene.stop('MainScene')
                    this.scene.launch('Materials')
        });

        // personnelButton
        const personnelButton = new CustomButton(this, materialsButton.x + materialsButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Personnel', HUD_BUTTON_TEXT_SIZE);
        this.add.existing(personnelButton);

        // ContractsButton
        const contractButton = new CustomButton(this, personnelButton.x + personnelButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Contract', HUD_BUTTON_TEXT_SIZE);
        this.add.existing(contractButton);

        // endWeekButton - change to dynamically allow different weeks
        const endWeekButton = new CustomButton(this, contractButton.x + contractButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'END WEEK 1', HUD_BUTTON_TEXT_SIZE);
        this.add.existing(endWeekButton);





    }

    update() {
        
        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEsc);
        if (isSelectDown) {
            this.scene.stop('MainScene');
            this.scene.launch('GameMenu');
        }
    }



    
}