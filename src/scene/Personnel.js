class Personnel extends Phaser.Scene {
    constructor() {
        super('Personnel');

        // game controls
        this.control = null;
        this.cursor = null;
        this.snapZones = []; // Array to store snap zones
        this.panels = []; // Array to store panels
    }

    preload() {
        this.control = new Control(this);

        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');

        this.load.image('cardBackground', 'assets/cards/card3/Card X5.png');
        this.load.image('panel', 'assets/cards/card1/Panel Empty Green.png');
        this.load.image('background', 'assets/backgrounds/background1.png');
    }

    create() {
        const BOX_Y_POS = 100;

        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'background');
        const card = this.add.image(this.cameras.main.width / 2, BOX_Y_POS, 'cardBackground').setScale(1.1, 0.5);
        const cardText = this.add.text(card.x - card.width / 2 + 10, card.y - card.height / 2 + 10, 'Card Title', { fontSize: '20px', color: '#FFFFFF' }).setDepth(2);
        cardText.setOrigin(50, 50);
        // Create snap positions
        const snapPositions = [200, 400, 600];

        // Create snap zones and panels
        for (const xPos of snapPositions) {
            const snapZone = this.add.zone(xPos, BOX_Y_POS, 150, card.height);
            this.snapZones.push(snapZone);

            const panel = this.add.image(snapZone.x, snapZone.y, 'panel').setInteractive({ draggable: true });
            this.panels.push(panel);

            this.input.setDraggable(panel);

            // Add drag event listeners
            panel.on('drag', (pointer, dragX, dragY) => {
                panel.x = dragX;
                panel.y = dragY;
            });

            panel.on('dragend', () => {
                const closestSnapZone = this.getClosestSnapZone(panel);

                if (closestSnapZone) {
                    panel.x = closestSnapZone.x;
                    panel.y = closestSnapZone.y;
                }
            });
        }
    }

    update() {
        let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEsc);
        if (isSelectDown) {
            this.scene.stop('Personnel');
            this.scene.launch('MainScene');
        }
    }

    getClosestSnapZone(panel) {
        let minDistance = Number.MAX_VALUE;
        let closestZone = null;

        for (const snapZone of this.snapZones) {
            const distance = Phaser.Math.Distance.Between(panel.x, panel.y, snapZone.x, snapZone.y);

            if (distance < minDistance) {
                minDistance = distance;
                closestZone = snapZone;
            }
        }

        return closestZone;
    }
}
