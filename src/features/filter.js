export function dropDown(scene, config, options, xPos, yPos) {
    var dropDownList = scene.rexUI.add.dropDownList(config);

    dropDownList.setOptions(options);

    dropDownList.on('button.click', function(dropDownList, listPanel, button, index, pointer, event) {
        dropDownList.setText(button.text);
        button.setInteractive(options.function());
    }, scope);


    dropDownList.on('button.over', function(dropDownList, listPanel, button, index, pointer, event) {
        button.getElement('background').setStrokeStyle(1, 0xffffff);
    }, scope);

    dropDownList.on('button.out', function(dropDownList, listPanel, button, index, pointer, event) {
        button.getElement('background').setStrokeStyle();
    }, scope);
}

/*
function CreateTextObject(scene, text) {
    return scene.add.text(0, 0, text, { fontSize: 20 })
}*/
