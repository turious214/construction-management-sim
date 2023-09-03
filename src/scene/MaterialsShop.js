

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

        //add background
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');

        //add title
        let startOption = this.add.text(200, 100, 'SHOP', {
            color: '#fcd498',
            fontSize: 100,
            align: 'left'
        }).setFixedSize(1000, 400);

        // add card
        const card = this.add.image(Config.WindowWidth / 2 - 200, Config.WindowHeight / 2 + 100, 'card').setScale(2, 2);

        //add back button
        const backButton = new CustomButton(this, Config.WindowWidth - 235, card.y + 100, 'button1Normal', 'button1Hover', 'Back', 30);
        this.add.existing(backButton);

        //go main scene
        backButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('MaterialsShop')
                this.scene.launch('Materials')
            });

        // add scroll view
        this.scrollView = this.add.container(card.x / 7 - 25, card.y / 5 + 150);
        const scrollViewContent = null;

        // put random info
        for (let i = 0; i < 10; i++) {
            const scrollViewContent = this.add.container(this.scrollView.x, this.scrollView.y / 4 * i + 76 + i * 35);
            this.scrollView.add(scrollViewContent);

            // name
            const generateName = generateRandomMaterial();
            const material = this.add.text(0, 0, generateName, {
                fontSize: 30,
                color: '#ffffff'
            });
            scrollViewContent.add(material);
            
            
            
            /*
            const price = this.add.text(card.x - 200, 0, `$${generatePrice}`, {
                fontSize: 30,
                color: '#ffffff'
            });
            scrollViewContent.add(price);
            */

            

            //units

            let generatePrice = Phaser.Math.Between(0, 2000);
            let number = 0;
            let price = 0
            let numberText;
            let priceText;

            numberText = this.add.text(card.x - 200, 0, number.toString(), {
                fontSize: '32px',
                fill: '#ffffff'
            });
            scrollViewContent.add(numberText);

            priceText = this.add.text(card.x - 100, 0, '', {
                fontSize: '32px',
                fill: '#ffffff'
            });
            scrollViewContent.add(priceText);

            const incrementButton = this.add.text(card.x - 155, 0, '+', {
                fontSize: '32px',
                fill: '#ffffff'
            });

            incrementButton.setInteractive();
            incrementButton.on('pointerdown', () => {
                number++;
                numberText.setText(number.toString())
                price = generatePrice * number
                priceText.setText('Total: $' + price.toString())
            });
            scrollViewContent.add(incrementButton);

            const decrementButton = this.add.text(card.x - 230, 0, '-', {
                fontSize: '32px',
                fill: '#ffffff'
            });
            decrementButton.setInteractive();
            decrementButton.on('pointerdown', () => {
                if (number>0)
                    number--;
                numberText.setText(number.toString())
                price = generatePrice * number
                priceText.setText('Total: $' + price.toString())
            });
            scrollViewContent.add(decrementButton);

            const buy = new CustomButton(this, card.x + 290, 10, 'button1Normal', 'button1Hover', 'Buy', 30);
            scrollViewContent.add(buy);

            buy.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                number = 0
                price = 0
                price = generatePrice * number
                numberText.setText(number.toString())
                priceText.setText('')
            });

            // add scroll view mask
            const mask = this.make.graphics();
            mask.fillStyle(0xffffff);
            mask.fillRect(0, -1000, 1000, 1000);
            mask.fillStyle(0x000000);
            mask.fillRect(100, 315, 1300, 680)
            scrollViewContent.setMask(mask.createGeometryMask());
        }

        // add scroll bar
        this.scrollbar = this.add.graphics();
        this.scrollbar.fillStyle(0x666666, 1);
        this.scrollbar.fillRect(1380, 315, 20, 50);
    }

    update() {
        // set scroll bar
        this.scrollbar.setInteractive(new Phaser.Geom.Rectangle(1380, 315, 20, 50), Phaser.Geom.Rectangle.Contains);

        this.scrollbar.on('pointerdown', () => {
            this.isDragging = true;
        });

        this.input.on('pointerup', () => {
            this.isDragging = false;
        });

        // set scroll view connect with scroll bar
        if (this.isDragging) {
            const pointer = this.input.activePointer;

            const offsetY = pointer.y - 315;
            this.scrollbar.y = Phaser.Math.Clamp(offsetY, 0, 600);

            const contentY = (this.scrollbar.y - 315) / (600 - 50) * (1030 - 600);
            this.scrollView.y = -contentY;
        }
    }

}

function updateNumberText(numberText, number) {
    numberText.setText(number.toString());
}




