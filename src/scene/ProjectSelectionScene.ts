import Config from "../config/Config.ts";
import Phaser from "phaser";

export default class ProjectSelectionScene extends Phaser.Scene {

    constructor() {
        super('ProjectSelectionScene');
    }

    preload(): void {
        this.load.image('sticky-note', 'assets/images/sticky_note.png');
        this.load.image('pin-board', 'assets/images/pin_board.jpg');
        this.load.image('bridge1', 'assets/images/bridge1.jpg');
        this.load.image('railway1', 'assets/images/railway1.jpg');

    }

    create() : void {
        // add background
        this.add.image(Config.WindowWidth / 2, Config.WindowHeight / 2, 'pin-board');

        // project groups
        const projectGroup1: Phaser.GameObjects.Group = this.add.group({
            classType: Phaser.GameObjects.Sprite,
            defaultKey: null,
            defaultFrame: null,
            active: true,
            maxSize: -1,
            runChildUpdate: true,
            createCallback: null,
            removeCallback: null,
            createMultipleCallback: null,
        });

        // add projects
        const stickyNote1: Phaser.GameObjects.Image = this.add.image(600, 500, 'sticky-note').setScale(0.5, 0.5);
        projectGroup1.add(stickyNote1);

        const bridge1: Phaser.GameObjects.Image = this.add.image(stickyNote1.x, stickyNote1.y, 'bridge1').setScale(0.2, 0.2);
        projectGroup1.add(bridge1);

        let IMAGE_TEXT_BUFFER_X: number = 110;
        let IMAGE_TEXT_BUFFER_Y: number = bridge1.displayHeight / 2 + 30;

        const bridge1Caption: string = 'Bridge 1';
        const bridge1CaptionText: Phaser.GameObjects.Text = this.add.text(bridge1.x - IMAGE_TEXT_BUFFER_X, bridge1.y + IMAGE_TEXT_BUFFER_Y, bridge1Caption, {
            align: 'center',
            fontSize: 75,
            color: '#000',
            fontFamily: 'Satisfy'
        });
        projectGroup1.add(bridge1CaptionText);

        // group interactivity
        this.input.setHitArea(projectGroup1.getChildren())
            // hover
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

                projectGroup1.getChildren().forEach(child => {
                    // @ts-ignore
                    child.setScale(child.scaleX * 1.2, child.scaleY * 1.2);
                });
            })

            //
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {

                projectGroup1.getChildren().forEach(child => {
                    // @ts-ignore
                    child.setScale(child.scaleX * (1.0/1.2), child.scaleY * (1.0/1.2));
                });
            });




        // project groups
        const projectGroup2: Phaser.GameObjects.Group = this.add.group({
            "classType": Phaser.GameObjects.Sprite,
            defaultKey: null,
            defaultFrame: null,
            active: true,
            maxSize: -1,
            runChildUpdate: true,
            createCallback: null,
            removeCallback: null,
            createMultipleCallback: null,
        });

        // add projects
        const stickyNote2: Phaser.GameObjects.Image = this.add.image(1300, 500, 'sticky-note').setScale(0.5, 0.5);
        projectGroup2.add(stickyNote2);

        const railway1: Phaser.GameObjects.Image = this.add.image(stickyNote2.x, stickyNote2.y, 'railway1').setScale(0.2, 0.2);
        projectGroup2.add(railway1);

        IMAGE_TEXT_BUFFER_X = 110;
        IMAGE_TEXT_BUFFER_Y = railway1.displayHeight / 2 + 30;

        const railway1Caption: string = 'Railway 1';
        const railway1CaptionText: Phaser.GameObjects.Text = this.add.text(railway1.x - IMAGE_TEXT_BUFFER_X, railway1.y + IMAGE_TEXT_BUFFER_Y, railway1Caption, {
            align: 'center',
            fontSize: 75,
            color: '#000',
            fontFamily: 'Satisfy'
        });
        projectGroup2.add(railway1CaptionText);


    }

    update() : void {

    }
}