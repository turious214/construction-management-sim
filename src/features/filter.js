import { DropDownList } from '../../node_modules/phaser3-rex-plugins/templates/ui/ui-components.js';

function dropDown(scene, ) {
    //var dropDownList = this.rexUI.add.dropDownList({
    var config = ({
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
    return newDropDownList(scene, config);
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

export function dropDown();
