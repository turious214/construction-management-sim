import Task from "../Task.ts";
import Contractor from "../contractor/Contractor.ts";
import Material from "../material/Material.ts";
import Event from "../event/Event.ts";

export default class BridgeProject {

    private _funds: number;
    private _tasks: Map<number, Task>;
    private _contractors: Map<number, Contractor>;
    private _materials: Map<string, Material>;
    private _events: Map<number, Event>

    constructor(funds: number, tasks: Map<number, Task>, contractors: Map<number, Contractor>, materials: Map<string, Material>, events: Map<number, Event>) {
        this._funds = funds;
        this._tasks = tasks;
        this._contractors = contractors;
        this._materials = materials;
        this._events = events;
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

}