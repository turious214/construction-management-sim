import Phaser from 'phaser';

export default class CustomButton extends Phaser.GameObjects.Container {

    private upImage: Phaser.GameObjects.Image;
    private overImage: Phaser.GameObjects.Image;
    private text: Phaser.GameObjects.Text;


    constructor(scene: Phaser.Scene, x: number, y: number, upTexture: string, overTexture: string, text: string, fontSize: number) {
        super(scene, x, y)

        this.upImage = scene.add.image(0, 0, upTexture);
        this.overImage = scene.add.image(0, 0, overTexture)

        this.width = this.upImage.width;
        this.height = this.upImage.height;

        this.x = x;
        this.y = y;
        
            
        this.text = scene.add.text(0, 0, text)
            .setOrigin(0.5) // align to centre
            .setFontSize(fontSize);


        this.add(this.upImage);
        this.add(this.overImage);
        this.add(this.text)

        this.overImage.setVisible(false);

        this.setSize(this.upImage.width, this.upImage.height);

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                // console.log('over')
                this.upImage.setVisible(false);
                this.overImage.setVisible(true);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                // console.log('out')
                this.upImage.setVisible(true);
                this.overImage.setVisible(false);
            })




        }

        setTextColor(color: string) {
            this.text.setColor(color);
        }




        

        // this.button = new Button(scene, 0, 0, texture, tint)
        // this.text = scene.add
        // .text(0, 0, "Button", { color: "black" })
        // .setOrigin(0.5, 0.5)

        // this.add(this.button)
        // this.add(this.text)

//     onClick() {
//         return this.button.onClick()
//     }

//     setText(text) {
//         this.text.text = text
//         return this
//     }

//     setTextStyle(style) {
//         this.text.setStyle(style)
//         return this
//     }

//     setUpTexture(texture) {
//         this.button.setUpTexture(texture)
//         return this
//     }

//     setUpTint(tint) {
//         this.button.setUpTint(tint)
//         return this
//     }

//   //  InterfaceButton methods (to be optimised in optimisation stage)
//     setDownTint(tint) {

//     }
//     setOverTexture(texture) {

//     }
//     setOverTint(tint) {

//     }
//     setDisabledTexture(texture) {

//     }
//     setDisabledTint(tint) {

//     }

//     setDisabled(disabled) {
        
//     }

    
}