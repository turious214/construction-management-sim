class Personnel extends Phaser.Scene{
    constructor() {
        super('Personnel');

        // Initialize your scene-specific variables here
        // ...
    }

    preload() {
        // Load assets for your new scene here
        // ...
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
            this.scene.stop('Personnel');
            this.scene.launch('MainScene');
        }
    }
}