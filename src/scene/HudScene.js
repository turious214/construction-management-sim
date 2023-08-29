class HUDScene extends Phaser.Scene {

    constructor() {
        super('HudScene');
        this.control = null;
        this.cursor = null;
        this.currentScene = 'ProjectScene';
    }

    preload() {
        this.control = new Control(this);
        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');
    }

    create() {

        // draw background
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');

        const INIT_MAIN_UI_X = 200;
        const INIT_MAIN_UI_Y = 50;
        const HUD_BUTTON_TEXT_SIZE = 30

        // projectButton
        // create button and add to scene
        
        const projectButton = new CustomButton(this, INIT_MAIN_UI_X, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Project', HUD_BUTTON_TEXT_SIZE);
        this.add.existing(projectButton);

        // contractorsButton
        const contractorsButton = new CustomButton(this, projectButton.x + projectButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Contractors', HUD_BUTTON_TEXT_SIZE);
        // contractorsButton.setTextColor('#fcd498');
        this.add.existing(contractorsButton);
        

        // materialsButton
        const materialsButton = new CustomButton(this, contractorsButton.x + contractorsButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Materials', HUD_BUTTON_TEXT_SIZE);
        this.add.existing(materialsButton);

        // personnelButton
        const personnelButton = new CustomButton(this, materialsButton.x + materialsButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Personnel', HUD_BUTTON_TEXT_SIZE);
        this.add.existing(personnelButton);

        // ContractsButton
        const contractButton = new CustomButton(this, personnelButton.x + personnelButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Contract', HUD_BUTTON_TEXT_SIZE);
        this.add.existing(contractButton);

        // event to go to ContractScene
        contractButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('MainScene');
                this.scene.start('ContractScene');
            });
        
        // event to go to ContractorsScene
        contractorsButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('MainScene');
                this.scene.start('ContractorsScene');
            });

        // endWeekButton - change to dynamically allow different weeks
        const endWeekButton = new CustomButton(this, contractButton.x + contractButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'END WEEK 1', HUD_BUTTON_TEXT_SIZE);
        this.add.existing(endWeekButton);

        projectButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        this.changeScene('ProjectScene');

        });

        contractorsButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        this.changeScene('ContractorsScene');
                        // this.scene.stop(`${this.currentScene}`)
                        // this.scene.run('ContractorsScene');
                        // this.currentScene = 'ContractorsScene';

                        // // contractorsButton.disableInteractive();
                        // console.log("contractor");
        });

        materialsButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        this.changeScene('MaterialScene');
        });

        personnelButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        this.changeScene('PersonnelScene');
                    
        });

        contractButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        this.changeScene('ContractScene');
        });

        endWeekButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        console.log("end week");
        });

        this.scene.bringToTop();
    }

    changeScene(newScene) {
        this.scene.stop(`${this.currentScene}`)
        this.scene.run(newScene);
        this.currentScene = newScene;
        console.log(newScene);
    }

}
