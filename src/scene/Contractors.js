class Contractors extends Phaser.Scene {

    constructor() {
        super('Contractors')

        // game controls
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
        this.load.image('0 star', 'assets/images/0 star.png')
        this.load.image('1 star', 'assets/images/1 star.png')
        this.load.image('2 star', 'assets/images/2 star.png')
        this.load.image('3 star', 'assets/images/3 star.png')
        this.load.image('4 star', 'assets/images/4 star.png')
        this.load.image('5 star', 'assets/images/5 star.png')
    }

    create() {
        const INIT_MAIN_UI_X = 55;
        const INIT_MAIN_UI_Y = 20;

        // add background
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');

        // add exist button
        const existButton = new CustomButton(this, INIT_MAIN_UI_X * 11, INIT_MAIN_UI_Y * 36, 'button1Normal', 'button1Hover', 'Exist');
        this.add.existing(existButton);

        // go main scene
        existButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('Contractors');
                this.scene.launch('MainScene');
            });

        // add title
        this.add.text(Config.WindowWidth / 16, Config.WindowHeight / 16, lang['contractor'], {
            color: '#fcd498',
            fontSize: 50,
            align: 'top',
        }).setFixedSize(450, 50);

        // add card
        const card = this.add.image(INIT_MAIN_UI_X * 7, INIT_MAIN_UI_Y * 20, 'card').setScale(1, 1.5);

        // add scroll view
        this.scrollView = this.add.container(card.x / 7, card.y / 4);
        const scrollViewContent = null;

        // put random info[default = 20 messages]
        for (let i = 0; i < 20; i++) {
            const scrollViewContent = this.add.container(this.scrollView.x , this.scrollView.y / 4 * i + 76 + i * 35);
            this.scrollView.add(scrollViewContent);

            // name
            const generateName = generateRandomCompanyName();
            const companyName = this.add.text(0, 0, generateName, {
                fontSize: 18,
                color: '#ffffff'
            });
            scrollViewContent.add(companyName);

            // rating
            const generateRating = generateRandomRating();
            const ratingImage5 = this.add.image(400, 8.5,  generateRating)
                .setScale(0.04, 0.04)
            scrollViewContent.add(ratingImage5);

            // price
            const generatePrice = generateRandomPrice(ratingImage5.texture.key);
            const price = this.add.text(475, 1, `$${generatePrice}`, {
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

function generateRandomCompanyName() {
    const suffixes = [
        'Inc.',
        'Corporation',
        'Industries',
        'Innovators',
        'Ventures',
        'Ltd.',
        'Group',
        'Services',
        'Builders',
        'Partners',
        'Enterprises'
    ];
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const vowels = 'aeiou';
    const companyNameLength = Phaser.Math.Between(5, 10);
    const suffixesNameNum = Phaser.Math.Between(0, 10);

    let companyName = '';
    for (let i = 0; i < companyNameLength; i++) {
        if (i % 2 === 0) {
            companyName += consonants.charAt(Phaser.Math.Between(0, consonants.length - 1));
        } else {
            companyName += vowels.charAt(Phaser.Math.Between(0, vowels.length - 1));
        }
    }
    return companyName.charAt(0).toUpperCase()
        + companyName.slice(1)
        + " "
        + suffixes[suffixesNameNum];
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

function generateRandomRating() {
    const randomValue = Math.random();

    if (randomValue < 0.05) {
        return "5 star";
    } else if (randomValue < 0.15) {
        return "4 star";
    } else if (randomValue < 0.35) {
        return "3 star";
    } else if (randomValue < 0.60) {
        return "2 star";
    } else if (randomValue < 0.90) {
        return "1 star";
    } else {
        return "0 star";
    }

    // Added line for merge conflict
}