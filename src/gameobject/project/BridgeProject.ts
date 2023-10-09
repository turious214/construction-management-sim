import Task from "../Task.ts";
import Week from "../Week.ts";
import Contractor from "../contractor/Contractor.ts";
import Material from "../material/Material.ts";
import Event from "../event/Event.ts";
import RiskManagementTool from "../RiskManagementTool.ts";

export default class BridgeProject {
    private _funds: number;
    private _tasks: Map<number, Task>;
    private _weeks: Week[];
    private _contractors: Map<number, Contractor>;
    private _materials: Map<string, Material>;
    private _events: Map<number, Event>;
    private _riskManagementTools: Map<string, RiskManagementTool>

    constructor(funds: number, tasks: Map<number, Task>, weeks: Week[], contractors: Map<number, Contractor>, materials: Map<string, Material>, events: Map<number, Event>, riskManagementTools: Map<string, RiskManagementTool>) {
        this._funds = funds;
        this._tasks = tasks;
        this._weeks = weeks;
        this._contractors = contractors;
        this._materials = materials;
        this._events = events;
        this._riskManagementTools = riskManagementTools;
    }

    get funds(): number {
        return this._funds;
    }

    set funds(value: number) {
        this._funds = value;
    }
    get tasks(): Map<number, Task> {
        return this._tasks;
    }

    set tasks(value: Map<number, Task>) {
        this._tasks = value;
    }
    get weeks(): Week[] {
        return this._weeks;
    }

    set weeks(value: Week[]) {
        this._weeks = value;
    }
    get contractors(): Map<number, Contractor> {
        return this._contractors;
    }

    set contractors(value: Map<number, Contractor>) {
        this._contractors = value;
    }
    get materials(): Map<string, Material> {
        return this._materials;
    }

    set materials(value: Map<string, Material>) {
        this._materials = value;
    }
    get events(): Map<number, Event> {
        return this._events;
    }

    set events(value: Map<number, Event>) {
        this._events = value;
    }
    get riskManagementTools(): Map<string, RiskManagementTool> {
        return this._riskManagementTools;
    }

    set riskManagementTools(value: Map<string, RiskManagementTool>) {
        this._riskManagementTools = value;
    }

}