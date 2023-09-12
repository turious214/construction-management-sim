export default function(filter, option, scene, xPos, yPos) {
    var dropDownList = scene.rexUI.add.dropDownList({
        x: xPos, y: yPos,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),
        text: CreateTextObject(scene, 'Sort By').setFixedSize(150, 0),

        //padding
        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
            icon: 10,
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
                    background: scene.rexUi.add.roundRectangle(0, 0, 2, 2, 0),
                    text: CreateTextObject(scene, text),
                    space: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 10,
                        icon: 10,
                    }
                });
                button.text = option.text;
                //testing
                button.setInteractive()
                    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                        //
                        filter();
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

function CreateTextObject(scene, text) {
    return scene.add.text(0, 0, text, { fontSize: 20 })
}

function filter(scrollView, alpha_num, asc_des) {
    var i;
    var shouldSwitch;
    var valueCmp;
    var valueCmpOther;
    var alpha = alpha_num ? 0 : 1;
    listView = scrollView.list;
    switching = true;

    while (switching {
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

