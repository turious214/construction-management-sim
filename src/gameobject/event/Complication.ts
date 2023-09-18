import Event from "./Event.ts";
export default class Complication implements Event {

    private _eventID: integer;
    private _description: string;
    private _occurrenceRate: number;
    constructor (eventID: integer, description: string, occurrenceRate: number) {
        this._eventID = eventID;
        this._description = description;
        this._occurrenceRate = occurrenceRate;
    }
    get occurrenceRate(): number {
        return this._occurrenceRate;
    }

    set occurrenceRate(value: number) {
        this._occurrenceRate = value;
    }
    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
    get eventID(): integer {
        return this._eventID;
    }

    set eventID(value: integer) {
        this._eventID = value;
    }













}