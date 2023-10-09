/** @type {import("../typings/phaser")} */

import GameMenu from "./scene/GameMenu.ts";
import HUDScene from "./scene/HUDScene.ts";
import ProjectScene from "./scene/ProjectScene.ts";
import ContractorsScene from "./scene/ContractorsScene.ts";
import MaterialsScene from "./scene/MaterialsScene.ts";
import PersonnelScene from "./scene/PersonnelScene.ts";
import ContractScene from "./scene/ContractScene.ts";
import Config from "./config/Config.ts";
import Phaser from "phaser";
import ProjectSelectionScene from "./scene/ProjectSelectionScene.ts";


const config:Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: Config.WindowWidth,
    height: Config.WindowHeight,
    parent: 'main-game',
    scene: [GameMenu, ProjectSelectionScene, HUDScene, ProjectScene, ContractorsScene, MaterialsScene, PersonnelScene, ContractScene],
    // scene: [GameMenu],


    scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
};

// export const game = new Phaser.Game(config);

export default new Phaser.Game(config);


// test-gitkraken merge tools

// addition of line for testing merge conflict
