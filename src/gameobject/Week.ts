import {Weather} from "./Weather.ts";


export default class Week {

    private _weekID: number;
    private _weatherForecast: Weather[];
    private _narration: string;
    private _events: Map<number, Event>;

    constructor(weekID: number, weatherForecast: Weather[], narration: string, events: Map<number, Event>) {
        this._weekID = weekID;
        this._weatherForecast = weatherForecast;
        this._narration = narration;
        this._events = events;


    }

    get weekID(): number {
        return this._weekID;
    }

    set weekID(value: number) {
        this._weekID = value;
    }
    get weatherForecast(): Weather[] {
        return this._weatherForecast;
    }

    set weatherForecast(value: Weather[]) {
        this._weatherForecast = value;
    }
    get narration(): string {
        return this._narration;
    }

    set narration(value: string) {
        this._narration = value;
    }
    get events(): Map<number, Event> {
        return this._events;
    }

    set events(value: Map<number, Event>) {
        this._events = value;
    }

}