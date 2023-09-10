import { Config } from "../config/Config.js"
import { Control } from "../gameinput/Control.js"
import { CustomButton } from "../button/CustomButton.js"
// import {}



export class GameMenu extends Phaser.Scene {

    constructor() {
        super('GameMenu');
        // super('custom-button')
        // Game control
        this.control = null;
    

        // // // Button states
        // this.playButton = 'play_button_up';
    
        
        // color
        // this.orange = 0xFFAD00;

    }

    preload() {
        this.control = new Control(this);
        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');

        // load background
        this.load.image('background', 'assets/backgrounds/background1.png');
        
    }

    create() {

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

        const TITLE_BUFFER_X = 130;


        let startOption = this.add.text(Config.WindowWidth / 3 - TITLE_BUFFER_X, Config.WindowHeight / 8, 'PROJECT MANAGER', {
            color: '#fcd498',
            fontSize: 100,
            align: 'center',
        }).setFixedSize(Config.WindowWidth / 2, 100);


        const GUIDE_TEXT = ['Press Enter to Continue'];

        for (var i = 0; i < GUIDE_TEXT.length; i++) {
            let guide = this.add.text(Config.WindowWidth / 3, startOption.y + startOption.height + i * 50, GUIDE_TEXT[i], {
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
        const playButton = new CustomButton(this, Config.WindowWidth / 2, Config.WindowHeight / 3, 'button1Normal', 'button1Hover', 'Play', 30);
        this.add.existing(playButton);

        // program button to do something
        playButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.startGame();
        });

        
        // settingsButton
        const settingsButton = new CustomButton(this, playButton.x, playButton.y + SPACING_BETWEEN_BUTTONS_Y, 'button1Normal', 'button1Hover', 'Settings', 30);
        this.add.existing(settingsButton);

        // draggable

        this.input.setDraggable(settingsButton);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) =>
        {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });



     
    }

    update() {
        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEnter);
        if (isSelectDown) {
            this.startGame();
        }
    }

    startGame() {
            this.scene.start('ProjectScene');
            this.scene.launch("HUDScene");
    }
}
