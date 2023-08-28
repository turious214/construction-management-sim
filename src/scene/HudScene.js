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
        const INIT_MAIN_UI_X = 55;
        const INIT_MAIN_UI_Y = 20;



        // projectButon
        const projectButton = new CustomButton(this, INIT_MAIN_UI_X, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Project');
        this.add.existing(projectButton);

        // contractorsButton
        const contractorsButton = new CustomButton(this, projectButton.x + projectButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Contractors');
        this.add.existing(contractorsButton);

        // materialsButton
        const materialsButton = new CustomButton(this, contractorsButton.x + contractorsButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Materials');
        this.add.existing(materialsButton);

        // personnelButton
        const personnelButton = new CustomButton(this, materialsButton.x + materialsButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Personnel');
        this.add.existing(personnelButton);

        // ContractsButton
        const contractButton = new CustomButton(this, personnelButton.x + personnelButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Contract');
        this.add.existing(contractButton);

        // endWeekButton - change to dynamically allow different weeks
        const endWeekButton = new CustomButton(this, contractButton.x + contractButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'END WEEK 1');
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
