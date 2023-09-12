"use strict";
/** @type {import("../typings/phaser")} */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameMenu_1 = __importDefault(require("./scene/GameMenu"));
const Config_1 = __importDefault(require("./config/Config"));
const phaser_1 = __importDefault(require("phaser"));
const config = {
    type: phaser_1.default.AUTO,
    width: Config_1.default.WindowWidth,
    height: Config_1.default.WindowHeight,
    parent: 'main-game',
    // scene: [GameMenu, HUDScene, ProjectScene, ContractorsScene, MaterialsScene, PersonnelScene, ContractScene],
    scene: [GameMenu_1.default],
    scale: {
        mode: phaser_1.default.Scale.FIT,
        autoCenter: phaser_1.default.Scale.CENTER_BOTH
    }
};
// export const game = new Phaser.Game(config);
exports.default = new phaser_1.default.Game(config);
// test-gitkraken merge tools
// addition of line for testing merge conflict
