import List = Phaser.Structs.List;
import Phaser from "phaser";

export default class Task {
    private _taskID: integer;
    private _complete: boolean;
    private _description: string;
    private _nextTasks: List<Task>

    constructor(taskID: integer, description: string, nextTasks: List<Task>) {
        this._taskID = taskID;
        this._description = description;
        this._nextTasks = nextTasks;
        this._complete = false;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
    get complete(): boolean {
        return this._complete;
    }

    set complete(value: boolean) {
        this._complete = value;
    }
    get taskID(): integer {
        return this._taskID;
    }

    set taskID(value: integer) {
        this._taskID = value;
    }

    get nextTasks(): Phaser.Structs.List<Task> {
        return this._nextTasks;
    }

    set nextTasks(value: Phaser.Structs.List<Task>) {
        this._nextTasks = value;
    }


}