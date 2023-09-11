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
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
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


        const COLOR_PRIMARY = 0x4e342e;
        const COLOR_LIGHT = 0x7b5e57;
        const COLOR_DARK = 0x260e04;

        var dropDownList = this.rexUI.add.dropDownList({
            x: 1250, y: 350,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),
            text: CreateTextObject(this, 'Sort by').setFixedSize(150, 0),

            //padding
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
                icon: 10
            },

            //drop down menu options
            options: [
                { text: 'Ascend Alphabetical' },
                { text: 'Descend Alphabetical' },
                { text: 'Ascend Numerical' },
                { text: 'Descend Numerical' },
            ],

        list: {
                createBackgroundCallback: function (scene) {
                    return scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_DARK);
                },
                createButtonCallback: function (scene, option, index, options) {
                    var text = option.text;
                    var button = scene.rexUI.add.label({
                        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0),

                        //text box
                        text: CreateTextObject(scene, text),

                        //padding
                        space: {
                            left: 10,
                            right: 10,
                            top: 10,
                            bottom: 10,
                            icon: 10
                        }
                    });
                    button.text= option.text;

                    var alpha_num;
                    var asc_des;

                    //set variables for filter based on case
                    switch(button.text) {
                        case "Ascend Alphabetical":
                            alpha_num = true;
                            asc_des = true;
                            break;
                        case "Descend Alphabetical":
                            alpha_num = true;
                            asc_des = false;
                            break;
                        case "Ascend Numerical":
                            alpha_num = false;
                            asc_des = true;
                            break;
                        case "Descend Numerical":
                            alpha_num = false;
                            asc_des = false;
                            break;
                        default:
                            alpha_num = true;
                            asc_des = true;
                            break;
                    }

                    //make button filter based on selection
                    button.setInteractive()
                        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                            filter(scene.scrollView, alpha_num, asc_des);
                    });
                
                    return button;
                },

                // scope: dropDownList
                onButtonOver: function (button, index, pointer, event) {
                    button.getElement('background').setStrokeStyle(1, 0xffffff);
                },

                // scope: dropDownList
                onButtonOut: function (button, index, pointer, event) {
                    button.getElement('background').setStrokeStyle();
                },
            },
            value: undefined

        }).layout();
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

function CreateTextObject(scene, text) {
    return scene.add.text(0, 0, text, { fontSize: 20 })
}

//also add parameter for increase or decrease
function filter(scrollView, alpha_num, asc_des){
    var i;
    var shouldSwitch;
    var valueCmp;
    var valueCmpOther;
    var alpha = alpha_num ? 0 : 1;
    listView = scrollView.list;
    switching = true;

    while (switching) {
        switching = false;
        for (i = 0; i < listView.length - 1; i++) {
            shouldSwitch = false;
            valueCmp = listView[i].list[alpha].text;
            valueCmpOther = listView[i+1].list[alpha].text;

            if(alpha) {
                valueCmp = parseInt(valueCmp);
                valueCmpOther = parseInt(valueCmpOther);
            }

            if(asc_des) {
                if(valueCmp > valueCmpOther) {
                    shouldSwitch = true;
                    break;
                }
            } else {
                if(valueCmp < valueCmpOther) {
                    shouldSwitch = true;
                    break;
                }
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

