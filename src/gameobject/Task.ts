import List = Phaser.Structs.List;
import Phaser from "phaser";
import Contractor from "./contractor/Contractor.ts";

export default class Task {

    private _taskID: number;
    private _complete: boolean;
    private _description: string;
    private _nextTasks: Task[];
    private _personnel: Map<number, Contractor>;

    constructor(taskID: number, description: string, nextTasks: Task[]) {

        if (taskID < 0) {
            throw new RangeError("taskID must be non-negative");
        }

        this._taskID = taskID;
        this._description = description;
        this._nextTasks = nextTasks;
        this._complete = false;
        this._personnel = new Map();
    }

    get taskID(): number {
        return this._taskID;
    }

    set taskID(value: number) {
        if (value < 0) {
            throw new RangeError("taskID must be non-negative");
        }

        this._taskID = value;
    }

    get complete(): boolean {
        return this._complete;
    }

    set complete(value: boolean) {
        this._complete = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get nextTasks(): Task[] {
        return this._nextTasks;
    }

    set nextTasks(value: Task[]) {
        this._nextTasks = value;
    }

    get personnel(): Map<number, Contractor> {
        return this._personnel;
    }

    set personnel(value: Map<number, Contractor>) {
        this._personnel = value;
    }

    addPersonnel(contractor: Contractor): void {
        this._personnel.set(contractor.contractorID, contractor);
    }


}