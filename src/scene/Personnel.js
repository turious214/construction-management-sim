class Personnel extends Phaser.Scene{
    constructor() {
        super('Personnel');

        // Initialize your scene-specific variables here
        // ...
    }

    preload() {
    }

    create() {
        
    }

    update() {
        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEsc);
        if (isSelectDown) {
            this.scene.stop('Personnel');
            this.scene.launch('MainScene');
        }
    }
}