class HUDScene extends Phaser.Scene {

    constructor() {
        super('HUDScene');
        this.control = null;
        this.cursor = null;
        this.currentScene = 'ProjectScene';
        this.currentButton = null;
    }

    preload() {
        this.control = new Control(this);
        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');
    }

    create() {

        const INIT_MAIN_UI_X = 200;
        const INIT_MAIN_UI_Y = 50;
        const HUD_BUTTON_TEXT_SIZE = 30

        // projectButton
        // create button and add to scene
        
        const projectButton = new CustomButton(this, INIT_MAIN_UI_X, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Project', HUD_BUTTON_TEXT_SIZE);
        this.add.existing(projectButton);
        this.currentButton = projectButton;
        projectButton.setTextColor('#fcd498');

        // contractorsButton
        const contractorsButton = new CustomButton(this, projectButton.x + projectButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Contractors', HUD_BUTTON_TEXT_SIZE);
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

        // endWeekButton - change to dynamically allow different weeks
        const endWeekButton = new CustomButton(this, contractButton.x + contractButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'END WEEK 1', HUD_BUTTON_TEXT_SIZE);
        this.add.existing(endWeekButton);

        projectButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        this.changeScene('ProjectScene', projectButton);

        });


        contractorsButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        this.changeScene('ContractorsScene', contractorsButton);

        });

        materialsButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        this.changeScene('MaterialScene', materialsButton);
        });

        personnelButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        this.changeScene('PersonnelScene', personnelButton);
                    
        });

        contractButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        this.changeScene('ContractScene', contractButton);
        });

        endWeekButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        console.log("end week");
        });

        this.scene.bringToTop();
    }

    changeScene(newScene, button) {
        this.scene.stop(`${this.currentScene}`)
        this.scene.run(newScene);
        this.currentScene = newScene;

        // change text color of current button 
        this.currentButton.setTextColor('#F5F5DC');

        // change text color of next button
        button.setTextColor('#fcd498');

        // update current button
        this.currentButton = button;

        // console.log(newScene);
    }



}
