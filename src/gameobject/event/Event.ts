export default class Event {

    private _eventID: number;
    private _description: string;
    private _occurrenceRate: number;
    private _fundsMod: number;
    private _timeMod: number;

    constructor(eventID: number, description: string, occurrenceRate: number, fundsMod: number, timeMod: number) {
        this._eventID = eventID;
        this._description = description;
        this._occurrenceRate = occurrenceRate;
        this._fundsMod = fundsMod;
        this._timeMod = timeMod;
    }

    get eventID(): number {
        return this._eventID;
    }

    set eventID(value: number) {
        this._eventID = value;
    }
    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
    get occurrenceRate(): number {
        return this._occurrenceRate;
    }

    set occurrenceRate(value: number) {
        this._occurrenceRate = value;
    }
    get fundsMod(): number {
        return this._fundsMod;
    }

    set fundsMod(value: number) {
        this._fundsMod = value;
    }
    get timeMod(): number {
        return this._timeMod;
    }

    set timeMod(value: number) {
        this._timeMod = value;
    }







}