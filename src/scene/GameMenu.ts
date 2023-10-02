import Config from "../config/Config.ts"
// import Control from "../gameinput/Control.ts"
import CustomButton from "../button/CustomButton.ts"
import Phaser from "phaser"



export default class GameMenu extends Phaser.Scene {

    // private control: Control;
    // private control?: Control;

    constructor() {
        super('GameMenu');
        // Game control
    

        // // // Button states
        // this.playButton = 'play_button_up';


    }

    preload(): void {
        // this.control = new Control(this);
        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');

        // load background
        this.load.image('background', 'assets/backgrounds/background1.png');

        
    }

    create(): void {

        // draw background
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');

        // let graphics = this.add.graphics({
        //     fillStyle: {
        //         color: 0xc066f2a,
        //         alpha: 1
        //     }
        //     //0xc06f2a - original color
        // });
        // graphics.fillRect(0, 0, Config.WindowWidth, Config.WindowHeight);
        // graphics.fillRect()

        const TITLE_BUFFER_X: number = 130;


        let startOption: Phaser.GameObjects.Text = this.add.text(Config.WindowWidth / 3 - TITLE_BUFFER_X, Config.WindowHeight / 8, 'PROJECT MANAGER', {
            color: '#fcd498',
            fontSize: 100,
            align: 'center',
        }).setFixedSize(Config.WindowWidth / 2, 100);


        const GUIDE_TEXT: string[] = ['Press Enter to Continue'];

        for (let i: number = 0; i < GUIDE_TEXT.length; i++) {
            this.add.text(Config.WindowWidth / 3, startOption.y + startOption.height + i * 50, GUIDE_TEXT[i], {
                align: 'center',
                fontSize: 50,
                color: '#F5F5DC'
            });
        }
        // playButton

        // ---| TEST ONLY - START |---

        // this.add.image(Config.WindowWidth / 2, 250, 'playButtonUp')
        //     .setInteractive()
        //     .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        //         console.log('pressed')
        //     })

        // ---| TEST ONLY - END |---

        const SPACING_BETWEEN_BUTTONS_Y = 100;

        // create button and add to scene
        const playButton: CustomButton = new CustomButton(this, Config.WindowWidth / 2, Config.WindowHeight / 3, 'button1Normal', 'button1Hover', 'Play', 30);
        this.add.existing(playButton);

        // program button to do something
        playButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, (): void => {
                    this.startGame();
        });

        
        // settingsButton
        const settingsButton: CustomButton = new CustomButton(this, playButton.x, playButton.y + SPACING_BETWEEN_BUTTONS_Y, 'button1Normal', 'button1Hover', 'Settings', 30);
        this.add.existing(settingsButton);

        // draggable

        this.input.setDraggable(settingsButton);

        // @ts-ignore
        this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, dragX: number, dragY: number): void =>
        {

            // @ts-ignore
            gameObject.x = dragX;


            // @ts-ignore
            gameObject.y = dragY;

        });



     
    }

    update(): void {
        // let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEnter);
        // if (isSelectDown) {
        //     this.startGame();
        // }
    }

    startGame(): void {
            this.scene.start('ProjectSelectionScene');
            // this.scene.launch("HUDScene");
    }
}
