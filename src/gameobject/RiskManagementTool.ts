import Event from './event/Event.ts';
import {name} from "ts-jest/dist/transformers/hoist-jest.js";

export default class RiskManagementTool {

    private _name: string;
    private _price: number;
    private _uses: number;
    private _event: Event;
    private _rateMod: number;
    private _fundsMod: number;
    private _timeMod: number;

    constructor(name: string, price: number, uses: number, event: Event,  rateMod: number, fundsMod: number, timeMod: number) {
        this._name = name;
        this._price = price;
        this._uses = uses;
        this._event = event;
        this._rateMod = rateMod;
        this._fundsMod = fundsMod;
        this._timeMod = timeMod;
    }

    activate (): void {
        this._event.occurrenceRate = this._rateMod;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
    get price(): number {
        return this._price;
    }

    set price(value: number) {
        if (value < 0) {
            throw new RangeError("price must be non-negative");
        }
        this._price = value;
    }
    get uses(): number {
        return this._uses;
    }

    set uses(value: number) {
        if (value < 0) {
            throw new RangeError("uses must be non-negative");
        }
        this._uses = value;
    }
    get event(): Event {
        return this._event;
    }

    set event(value: Event) {
        this._event = value;
    }
    get rateMod(): number {
        return this._rateMod;
    }

    set rateMod(value: number) {
        this._rateMod = value;
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