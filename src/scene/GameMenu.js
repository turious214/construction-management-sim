class GameMenu extends Phaser.Scene {

    constructor() {
        super('GameMenu');
        // super('custom-button')
        // Game control
        this.control = null;
    
        // Guide on screen
        this.guideText = [lang['start.screen.guide.1']];

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


        let startOption = this.add.text(Config.WindowWidth / 4, Config.WindowHeight / 8, lang['start.screen.enter'], {
            color: '#fcd498',
            fontSize: 50,
            align: 'center',
        }).setFixedSize(450, 50);

        for (var i = 0; i < this.guideText.length; i++) {
            let guide = this.add.text(300, 160 + i * 40, this.guideText[i], {
                align: 'center',
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

        // create button and add to scene
        const playButton = new CustomButton(this, 400, 250, 'button1Normal', 'button1Hover', 'Play');
        this.add.existing(playButton);

        // program button to do something
        playButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.startGame();
        });
        
        // settingsButton
        const settingsButton = new CustomButton(this, 400, 350, 'button1Normal', 'button1Hover', 'Settings');
        this.add.existing(settingsButton);
    }

    update() {
        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEnter);
        if (isSelectDown) {
            this.startGame();
        }
    }

    startGame() {
            this.scene.start('ProjectScene');
            this.scene.launch("HudScene");
    }
}
