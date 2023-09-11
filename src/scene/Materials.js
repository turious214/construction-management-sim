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

        // add card
        const card = this.add.image(Config.WindowWidth / 2 - 200, Config.WindowHeight / 2 + 100, 'card').setScale(2, 2);;

        //add exit button
        const exitButton = new CustomButton(this, Config.WindowWidth - 235, card.y + 100, 'button1Normal', 'button1Hover', 'Exit', 30);
        this.add.existing(exitButton);

        //go main scene
        exitButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.scene.stop('Materials')
                this.scene.launch('MainScene')
            });

        //shop button
        const shopButton = new CustomButton(this, Config.WindowWidth - 235, card.y - 100, 'button1Normal', 'button1Hover', 'Shop', 30);
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
            align: 'left'

        }).setFixedSize(1000, 400);
        
        // add scroll view
        this.scrollView = this.add.container(card.x/7 - 25, card.y/5 + 150);
        const scrollViewContent = null;

        // put random info
        for (let i = 0; i < 10; i++) {
            const scrollViewContent = this.add.container(this.scrollView.x , this.scrollView.y / 4 * i + 76 + i * 35);
            this.scrollView.add(scrollViewContent);

            // name
            const generateName = generateRandomMaterial();
            const material = this.add.text(0, 0, generateName, {
                fontSize: 30,
                color: '#ffffff'
            });
            scrollViewContent.add(material);

            // units
            const generateUnits = Phaser.Math.Between(0, 2000);
            const price = this.add.text(card.x - 200, 0, `${generateUnits}`, {
                fontSize: 30,
                color: '#ffffff'
            });
            scrollViewContent.add(price); 

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

        const filterButton= new CustomButton(this, 100, 100, 'filter_up', 'filter_down', 30);
        this.add.existing(filterButton);
        filterButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                filter(this.scrollView);
            });
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
            console.log(this.scrollView.y);
        }
    }
}

//also add parameter for increase or decrease
function filter(scrollView){
    var i, shouldSwitch;
    listView = scrollView.list;
    switching = true;

    while (switching) {
        switching = false;
        for (i = 0; i < listView.length - 1; i++) {
            shouldSwitch = false;
            //have switch statement for numbers and asc and desc
            if(listView[i].list[0].text > listView[i + 1].list[0].text) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            tmp_text = listView[i].list[0].text
            tmp_quan = listView[i].list[1].text
            listView[i].list[0].text = listView[i + 1].list[0].text;
            listView[i].list[1].text = listView[i + 1].list[1].text;
            listView[i + 1].list[0].text = tmp_text;
            listView[i + 1].list[1].text = tmp_quan;
            switching = true;
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

