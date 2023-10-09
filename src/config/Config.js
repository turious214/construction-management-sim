"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    static get ASSET_PATH() {
        return 'assets/';
    }
    static get FRAME_WIDTH() {
        return 16;
    }
    static get FRAME_HEIGHT() {
        return 16;
    }
    // static get SPRITE_FILE() {
    //     return 'Toens_Medieval_v.1.0';
    // }
    static get SPRITE_EXT() {
        return '.png';
    }
    static get WindowWidth() {
        // return 50 * 16;
        return 1920;
    }
    static get WindowHeight() {
        // return 50 * 16;
        return 1080;
    }
    static get DialogTransitionTime() {
        return 1000;
    }
}
exports.default = Config;
