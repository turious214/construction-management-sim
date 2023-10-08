// import Control from "../gameinput/Control.ts"
import Config from "../config/Config.ts"
import Task from "../gameobject/Task.js";
import Week from "../gameobject/Week.js";
import Contractor from "../gameobject/contractor/Contractor.js";
import Material from "../gameobject/material/Material.js";
import Event from "../gameobject/event/Event.js";
import RiskManagementTool from "../gameobject/RiskManagementTool.js";
// import CustomButton from "../button/CustomButton.ts"


export default class ProjectScene extends Phaser.Scene {


    // @ts-ignore
    private _funds: number;
    private _tasks?: Map<number, Task>;
    private _weeks?: Week[];
    private _contractors?: Map<number, Contractor>;
    private _materials?: Map<string, Material>;
    private _events?: Map<number, Event>;
    private _riskManagementTools?: Map<string, RiskManagementTool>;
    private _backgroundPath?: string;

    
 
    
    constructor() {
        super('ProjectScene');

        // game controls
        // this.cursor = null;

        // remaining funds the player has


        // weather forecast for duration of project - implement


        // text bubble shown to viewer at beginning of day


        // complications - add game complexity - v2


    }

    init(data: any) {

        console.log(data.project);
        this._funds = data.project.funds;
        this._tasks = data.project.tasks;
        this._weeks = data.project.weeks;
        this._contractors = data.project.contractors;
        this._materials = data.project.materials;
        this._events = data.project.events;
        this._riskManagementTools = data.project.riskManagementTools;

        // console.log(data.project.name);
        //     console.log(data.project.funds);

        // load background image
            this._backgroundPath = `assets/backgrounds/${data.name}.png`

        
        
    }
    

    preload() {
        // this.control = new Control(this);
        this.load.image('button1Normal', 'assets/buttons/button_normal.png');
        this.load.image('button1Hover', 'assets/buttons/button_hover.png');
        // this.load.image('background', 'assets/backgrounds/background1.png');
        this.load.image('background', this._backgroundPath);
        
    }

    create() {

        // draw background
        this.add.image(0, 0, 'background').setOrigin(0,0);


    }

    update() {
        
        // let isSelectDown = Phaser.Input.Keyboard.JustDown(this.control.keyEsc);
        // if (isSelectDown) {
        //     this.scene.stop('ProjectScene');
        //     this.scene.launch('GameMenu');
        // }
    }



    
}