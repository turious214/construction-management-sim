class MaterialsShop extends Phaser.Scene {
    
    constructor() {
        super('MaterialsShop');

        // game controls
        this.control = null;
        this.cursor = null;

    }

    preload() {
        this.control = new Control(this);
        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');

        this.load.image('background', 'assets/backgrounds/background1.png');
        this.load.image('card', 'assets/cards/card3/Card X5.png')
    }

    create() {      
        
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');
       
       // add card
       const card = this.add.image(Config.WindowWidth / 2 - 200, Config.WindowHeight / 2 + 100, 'card').setScale(2, 2);;

       //add back button
       const backButton = new CustomButton(this, Config.WindowWidth - 200, card.y + 100, 'button1Normal', 'button1Hover', 'Back', 30);
       this.add.existing(backButton);

       //go main scene
       backButton.setInteractive()
           .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
               this.scene.stop('MaterialsShop')
               this.scene.launch('Materials')
           });

       //add title
       let startOption = this.add.text(200, 100, 'MATERIALS SHOP', {
           color: '#fcd498',
           fontSize: 100,
           align: 'center'

       }).setFixedSize(400, 400);

    }

    update() {
        
        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEsc);
        if (isSelectDown) {
            this.scene.stop('MaterialsShop');
            this.scene.launch('GameMenu');
        }
    }



    
}