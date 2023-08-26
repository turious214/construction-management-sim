class Personnel extends Phaser.Scene{
    constructor() {
        super('Personnel');

        // game controls
        this.control = null;
        this.cursor = null;

    }

    preload() {
        this.control = new Control(this);

        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');

        this.load.image('cardBackground', 'assets/cards/card3/Card X5.png');
        this.load.image('background', 'assets/backgrounds/background1.png');

    }

    create() {

        const MAT_BOX_Y = 200;

        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');
        this.add.image(this.cameras.main.width / 2, MAT_BOX_Y, 'cardBackground');
        
    }

    update() {
        
        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEsc);
        if (isSelectDown) {
            this.scene.stop('Personnel');
            this.scene.launch('MainScene');
        }
    }
}