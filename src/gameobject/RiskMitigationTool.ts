import Event from './event/Event.ts';

export default class RiskMitigationTool {
    private _name: string;
    private _rateModifier: number;
    private _price: number;
    private _uses: number;
    private _event: Event;

    constructor(name: string, rateModifier: number, price: number, uses: number, event: Event) {
        this._name = name;
        this._rateModifier = rateModifier;
        this._price = price;
        this._uses = uses;
        this._event = event;
    }

    activate (): void {
        this._event.occurrenceRate = this._rateModifier;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
    get rateModifier(): number {
        return this._rateModifier;
    }

    set rateModifier(value: number) {
        this._rateModifier = value;
    }
    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }
    get uses(): number {
        return this._uses;
    }

    set uses(value: number) {
        this._uses = value;
    }
    get event(): Event {
        return this._event;
    }

    set event(value: Event) {
        this._event = value;
    }


}