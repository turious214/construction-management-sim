class TaskAssignmentScene extends Phaser.Scene {

    constructor() {
        super('TaskAssignmentScene');
        // Game control
        this.control = null;
    
    }

    preload() {
        this.control = new Control(this);
        this.load.image('card2', 'assets/cards/card2/Card X2.png');
        
    }

    create() {

        // draw background
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'card2').setScale(2, 2);
     
    }

    update() {
        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEnter);
        if (isSelectDown) {
            this.scene.stop('GameMenu');
            this.scene.launch('MainScene');
        }

    }
}