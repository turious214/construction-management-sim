// import Control from "../gameinput/Control.ts"
import Config from "../config/Config.ts"
// import CustomButton from "../button/CustomButton.ts"


export default class ProjectScene extends Phaser.Scene {

    // private control?: Control;
    // @ts-ignore
    private funds: number;
    // changes these later
    // private weather: any[];
    // private narration: any[];
    // private complications: any[];
    
    constructor() {
        super('ProjectScene');

        // game controls
        // this.cursor = null;

        // remaining funds the player has


        // weather forecast for duration of project - implement


        // text bubble shown to viewer at beginning of day


        // complications - add game complexity - v2


    }

    preload() {
        // this.control = new Control(this);
        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');
        this.load.image('background', 'assets/backgrounds/background1.png');
        
    }

    create() {

        // draw background
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');

        // const INIT_MAIN_UI_X = 200;
        // const INIT_MAIN_UI_Y = 50;
        // const HUD_BUTTON_TEXT_SIZE = 30
        //
        // // projectButton
        // // create button and add to scene
        //
        // const projectButton = new CustomButton(this, INIT_MAIN_UI_X, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Project', HUD_BUTTON_TEXT_SIZE);
        // this.add.existing(projectButton);
        //
        // // program button to do something
        //
        // // contractorsButton
        // const contractorsButton = new CustomButton(this, projectButton.x + projectButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Contractors', HUD_BUTTON_TEXT_SIZE);
        // // contractorsButton.setTextColor('#fcd498');
        // this.add.existing(contractorsButton);
        //
        //
        // // materialsButton
        // const materialsButton = new CustomButton(this, contractorsButton.x + contractorsButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Materials', HUD_BUTTON_TEXT_SIZE);
        // this.add.existing(materialsButton);
        //
        // // personnelButton
        // const personnelButton = new CustomButton(this, materialsButton.x + materialsButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Personnel', HUD_BUTTON_TEXT_SIZE);
        // this.add.existing(personnelButton);
        //
        // // ContractsButton
        // const contractButton = new CustomButton(this, personnelButton.x + personnelButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'Contract', HUD_BUTTON_TEXT_SIZE);
        // this.add.existing(contractButton);
        //
        // // event to go to ContractScene
        // contractButton.setInteractive()
        //     .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        //         this.scene.stop('MainScene');
        //         this.scene.start('ContractScene');
        //     });
        //
        // // event to go to ContractorsScene
        // contractorsButton.setInteractive()
        //     .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        //         this.scene.stop('MainScene');
        //         this.scene.start('ContractorsScene');
        //     });
        //
        // // endWeekButton - change to dynamically allow different weeks
        // const endWeekButton = new CustomButton(this, contractButton.x + contractButton.width, INIT_MAIN_UI_Y, 'button1Normal', 'button1Hover', 'END WEEK 1', HUD_BUTTON_TEXT_SIZE);
        // this.add.existing(endWeekButton);
    }

    update() {
        
        // let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEsc);
        // if (isSelectDown) {
        //     this.scene.stop('ProjectScene');
        //     this.scene.launch('GameMenu');
        // }
    }



    
}