import Weather from "./Weather.ts";

export default class Week {
    private _weekID: integer;
    private _weatherForecast: Weather[];
    private _events: Map<integer, Event>;

    constructor(weekID: integer, weatherForecast: Weather[], events: Map<integer, Event>) {
        this._weekID = weekID;
        this._events = events;
        this._weatherForecast = weatherForecast;
    }

    get events(): Map<integer, Event> {
        return this._events;
    }

    set events(value: Map<integer, Event>) {
        this._events = value;
    }

    get weatherForecast(): Weather[] {
        return this._weatherForecast;
    }

    set weatherForecast(value: []) {
        this._weatherForecast = value;
    }

    get weekID(): integer {
        return this._weekID;
    }

    set weekID(value: integer) {
        this._weekID = value;
    }







}