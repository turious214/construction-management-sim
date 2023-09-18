import Weather from "./Weather.ts";

export default class Week {
    private _weekID: number;
    private _weatherForecast: Weather[];
    private _events: Map<number, Event>;

    constructor(weekID: number, weatherForecast: Weather[], events: Map<number, Event>) {
        this._weekID = weekID;
        this._events = events;
        this._weatherForecast = weatherForecast;
    }

    get events(): Map<number, Event> {
        return this._events;
    }

    set events(value: Map<number, Event>) {
        this._events = value;
    }

    get weatherForecast(): Weather[] {
        return this._weatherForecast;
    }

    set weatherForecast(value: []) {
        this._weatherForecast = value;
    }

    get weekID(): number {
        return this._weekID;
    }

    set weekID(value: number) {
        this._weekID = value;
    }







}