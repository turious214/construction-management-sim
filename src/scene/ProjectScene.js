class ProjectScene extends Phaser.Scene {
    
    constructor() {
        super('ProjectScene');

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

        let startOption = this.add.text(200, 100, lang['game.test'], {
            color: '#fcd498',
            fontSize: 100,
            align: 'center'

        }).setFixedSize(400, 400);
    }

    update() {
        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEsc);
        if (isSelectDown) {
            this.scene.start('GameMenu');
        }
    }
}
