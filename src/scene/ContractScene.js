class ContractScene extends Phaser.Scene {

    constructor() {
        super('ContractScene')

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

        this.load.image('red-panel', 'assets/cards/card1/Panel Red.png')
    }

    create() {
        const INIT_MAIN_UI_X = 200;
        const INIT_MAIN_UI_Y = 50;

        // add background
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');

        // add exist button
        const existButton = new CustomButton(this, INIT_MAIN_UI_X * 8, INIT_MAIN_UI_Y * 20,'button1Normal', 'button1Hover', 'Exist', 30);
        this.add.existing(existButton);
        existButton.setDepth(1);

        // go main scene
        existButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('ContractScene');
                this.scene.launch('MainScene');
            });

        // add title
        this.add.text(Config.WindowWidth / 16, Config.WindowHeight / 16, 'CONTRACT', {
            color: '#fcd498',
            fontSize: 100,
            align: 'top',
        });

        // add card
        const card = this.add.image(INIT_MAIN_UI_X * 4.8, INIT_MAIN_UI_Y * 11.5, 'card').setScale(2.5, 2);

        // add scroll view
        this.scrollView = this.add.container(INIT_MAIN_UI_X * 1.05, INIT_MAIN_UI_Y * 6);

        // put random info[default = 20 messages]
        for (let i = 0; i < 20; i++) {
            // add each contract
            const scrollViewContent = this.add.container(this.scrollView.x / 10, this.scrollView.y / 6 * i);
            this.scrollView.add(scrollViewContent);

            // name
            const generateName = generateRandomCompanyName();
            const companyName = this.add.text(scrollViewContent.x, scrollViewContent.y, generateName, {
                fontSize: 40,
                color: '#ffffff'
            });
            scrollViewContent.add(companyName);

            // rating
            const generateRating = generateRandomRating();
            const ratingImage = this.add.image(scrollViewContent.x + 1000, scrollViewContent.y + 18,  generateRating)
                .setScale(0.1, 0.1)
            scrollViewContent.add(ratingImage);

            // price
            const generatePrice = generateRandomPrice(ratingImage.texture.key);
            const price = this.add.text(scrollViewContent.x + 1200, scrollViewContent.y+3, `$${generatePrice}`, {
                fontSize: 40,
                color: '#ffffff'
            });
            scrollViewContent.add(price);

            // add each container's touchable area
            const clickArea = this.add.graphics();
            clickArea.fillStyle(0xff0000);
            clickArea.fillRect(scrollViewContent.x, scrollViewContent.y - 10, 1380, 60);
            clickArea.setAlpha(0.5);
            clickArea.setDepth(-1);
            scrollViewContent.add(clickArea);

            // set each clickArea open window
            const areaCheck1 = new Phaser.Geom.Rectangle(scrollViewContent.x, scrollViewContent.y - 10, 1380, 60)
            const areaCheck2 = new Phaser.Geom.Rectangle(INIT_MAIN_UI_X * 1.05 + 40, INIT_MAIN_UI_Y * 6 - 10, 1382, 571)

            clickArea.setInteractive(areaCheck1, Phaser.Geom.Rectangle.Contains)
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, function (pointer) {
                    // unsure click in two area
                    if (Phaser.Geom.Rectangle.Contains(areaCheck2, pointer.x, pointer.y)) {
                        console.log(companyName.text);
                        this.createWindow(TaskAssignmentScene);
                    }
                }, this);

            // add scroll view mask
            const mask = this.make.graphics();
            mask.fillStyle(0xffffff);
            mask.fillRect(0, -1000, 1000, 1000);
            mask.fillStyle(0x000000);
            mask.fillRect(INIT_MAIN_UI_X * 1.05 + 40, INIT_MAIN_UI_Y * 6 - 10, 1382, 571)
            scrollViewContent.setMask(mask.createGeometryMask());
        }

        // add scroll bar
        this.scrollbar = this.add.graphics();
        this.scrollbar.fillStyle(0x666666, 1);
        this.scrollbar.fillRect(INIT_MAIN_UI_X * 8.5, INIT_MAIN_UI_Y * 5.8, 30, 50);
    }

    update() {

        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEsc);
        if (isSelectDown) {
            this.scene.stop('ContractScene');
            this.scene.launch('MainScene');
        }

        // set scroll bar
        this.scrollbar.setInteractive(new Phaser.Geom.Rectangle(this.scrollbar.commandBuffer[4], this.scrollbar.commandBuffer[5], 30, 50), Phaser.Geom.Rectangle.Contains);

        this.scrollbar.on('pointerdown', () => {
            this.isDragging = true;
        });

        this.input.on('pointerup', () => {
            this.isDragging = false;
        });

        // set scroll view connect with scroll bar
        if (this.isDragging) {
            const pointer = this.input.activePointer;

            const offsetY = pointer.y - this.scrollbar.commandBuffer[5];
            this.scrollbar.y = Phaser.Math.Clamp(offsetY, 0, 525);

            //set scroll speed
            const contentY = (this.scrollbar.y / 1100) * 2910 - 300;
            this.scrollView.y = -contentY;
        }
    }

    createWindow (func)
    {
        var handle = 'window' + this.count++;
        var win = this.add.zone(400, 400, func.WIDTH, func.HEIGHT).setInteractive().setOrigin(0);
        var demo = new func(handle, win);
        this.input.setDraggable(win);

        win.on('drag', function (pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
            demo.refresh()
        });
        this.scene.add(handle, demo, true);
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
}
