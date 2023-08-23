class HudScene extends Phaser.Scene {

    constructor() {
        super('HudScene');
        this.control = null;
        this.cursor = null;
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

        const container = this.add.container(
        
        projectButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        this.scene.run('ProjectScene');
                        this.enableInteractive();
                        projectButton.disableInteractive();
                        console.log("project");
        });

        contractorsButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        this.scene.run('ContractorsScene');
                        enableInteractive();
                        contractorsButton.disableInteractive();
                        console.log("contractor");
        });

        materialsButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        this.scene.run('MaterialScene');
                        enableInteractive();
                        materialsButton.disableInteractive();
                        console.log("material");
        });

        personnelButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        this.scene.run('PersonnelScene');
                        enableInteractive();
                        personnelButton.disableInteractive();
                        console.log("personnel");
        });

        contractButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        this.scene.run('ContractScene');
                        enableInteractive();
                        contractButton.disableInteractive();
                        console.log("contract");
        });

        endWeekButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        console.log("end week");
        });

        this.scene.bringToTop();
    }

}
