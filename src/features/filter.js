function dropDown(scene, option, xPos, yPos) {
    const COLOR_PRIMARY = 0x4e342e;
    const COLOR_DARK = 0x260e04;

    var dropDownList = scene.rexUI.add.dropDownList({
        x: xPos, y: yPos,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),
        text: CreateTextObject(scene, 'Sort by').setFixedSize(150, 0),

        //padding
        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
            icon: 10
        },

        //drop down menu options
        options: option,

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

                //make button filter based on selection
                button.setInteractive()
                    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        option.sort();
                });
                return button;
            },

            onButtonClick: function(button, index, pointer, event) {
                dropDownList.setText(button.text);
            },

            // scope: dropDownList
            // when selected no outline
            onButtonOver: function (button, index, pointer, event) {
                button.getElement('background').setStrokeStyle(1, 0xffffff);
            },

            // scope: dropDownList
            // when not selected no outline
            onButtonOut: function (button, index, pointer, event) {
                button.getElement('background').setStrokeStyle();
            },
        },
       value: undefined

    }).layout();
}

function CreateTextObject(scene, text) {
    return scene.add.text(0, 0, text, { fontSize: 20 })
}
