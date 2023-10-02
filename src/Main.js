import { GameMenu } from "./scene/GameMenu.js";
import { HUDScene } from "./scene/HUDScene.js";
import { ProjectScene } from "./scene/ProjectScene.js";
import { ContractorsScene } from "./scene/ContractorsScene.js";
import { MaterialsScene } from "./scene/MaterialsScene.js";
import { PersonnelScene } from "./scene/PersonnelScene.js";
import { ContractScene } from "./scene/ContractScene.js";
import { TaskAssignmentScene } from "./scene/TaskAssignmentScene.js"
import { Config } from "./config/Config.js"
import {EstimatePointSet} from "./scene/EstimatePointSet.js";


const config = {
    type: Phaser.AUTO,
    width: Config.WindowWidth,
    height: Config.WindowHeight,
    parent: 'main-game',
    scene: [GameMenu, HUDScene, ProjectScene, ContractorsScene, MaterialsScene, PersonnelScene, ContractScene, TaskAssignmentScene, EstimatePointSet],

    scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTRE_BOTH
        }
};

const game = new Phaser.Game(config);


// test-gitkraken merge tools

// addition of line for testing merge conflict
