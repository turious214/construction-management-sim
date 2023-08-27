class Materials extends Phaser.Scene {

    constructor() {
        super('Materials')

        //game controls
        this.control = null;
        this.scrollbar = null;
        this.isDragging = false;
        this.scrollView = null;
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

        //add exist button
        const existButton = new CustomButton(this, Config.WindowWidth - 200, Config.WindowHeight - 100, 'button1Normal', 'button1Hover', 'Exist', 30);
        this.add.existing(existButton);

        //go main scene
        existButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('Materials')
                this.scene.launch('MainScene')
            });

        //shop button
        const shopButton = new CustomButton(this, Config.WindowWidth - 200, 100, 'button1Normal', 'button1Hover', 'Shop', 30);
        this.add.existing(shopButton);

        //go shop
        shopButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('Materials')
                this.scene.launch('MaterialsShop')
            });

        //add title
        let startOption = this.add.text(200, 100, 'MATERIALS', {
            color: '#fcd498',
            fontSize: 100,
            align: 'center'

        }).setFixedSize(400, 400);

        // add card
        const card = this.add.image(Config.WindowWidth / 2 - 200, Config.WindowHeight / 2 + 100, 'card').setScale(2, 2);;

        // add scroll view
        this.scrollView = this.add.container(card.x / 7, card.y / 4);
        const scrollViewContent = null;

        // put random info
        for (let i = 0; i < 20; i++) {
            const scrollViewContent = this.add.container(this.scrollView.x, this.scrollView.y / 4 * i + 76 + i * 35);
            this.scrollView.add(scrollViewContent);

            // name
            const generateName = generateRandomMaterial();
            const material = this.add.text(0, 0, generateName, {
                fontSize: 18,
                color: '#ffffff'
            });
            scrollViewContent.add(companyName);

            // price
            const generatePrice = generateRandomPrice(ratingImage5.texture.key);
            const price = this.add.text(475, 1, `$${generatePrice} / kg`, {
                fontSize: 18,
                color: '#ffffff'
            });
            scrollViewContent.add(price);

            // add scroll view mask
            const mask = this.make.graphics();
            mask.fillStyle(0xffffff);
            mask.fillRect(0, -1000, 1000, 1000);
            mask.fillStyle(0x000000);
            mask.fillRect(100, 150, 800, 500)
            scrollViewContent.setMask(mask.createGeometryMask());
        }

        // add scroll bar
        this.scrollbar = this.add.graphics();
        this.scrollbar.fillStyle(0x666666, 1);
        this.scrollbar.fillRect(680, 175, 8, 50);
    }

    update() {
        // set scroll bar
        this.scrollbar.setInteractive(new Phaser.Geom.Rectangle(680, 175, 8, 50), Phaser.Geom.Rectangle.Contains);

        this.scrollbar.on('pointerdown', () => {
            this.isDragging = true;
        });

        this.input.on('pointerup', () => {
            this.isDragging = false;
        });

        // set scroll view connect with scroll bar
        if (this.isDragging) {
            const pointer = this.input.activePointer;

            const offsetY = pointer.y - 200;
            this.scrollbar.y = Phaser.Math.Clamp(offsetY, 0, 400);

            //51.5*n+n/10 scrollView height - scrollbar height = scroll speed
            const contentY = (this.scrollbar.y / (400 - 50)) * (1030 - 400) - 100;
            this.scrollView.y = -contentY;
            console.log(this.scrollView.y);
        }
    }
}

function generateRandomMaterial() {
    const materials = [
        'wood',
        'marble',
        'obsidian',
        'cobblestone',
        'sand',
    ];

    const materialsNameNum = Phaser.Math.Between(0, materials.length - 1);
    return materials[materialsNameNum]
}

function generateRandomPrice(ratingImageName) {
    const priceRanges = [
        { min: 50, max: 150 },
        { min: 151, max: 250 },
        { min: 251, max: 350 },
        { min: 351, max: 450 },
        { min: 451, max: 550 },
        { min: 551, max: 650 }
    ];

    const star = parseInt(ratingImageName.charAt(0))
    return Phaser.Math.Between(priceRanges[star].min, priceRanges[star].max);
}