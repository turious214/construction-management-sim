import ContractorType from "./ContractorType.js";

export default class Contractor {

    private _contractorID: number;
    private _type: ContractorType;
    private _rate: number;
    private _efficiency: number;
    private _rating: number;
    private _ratingPath: string;

    constructor(contractorID: number, type: ContractorType, rate: number, rating: number, efficiency: number, ratingPath: string) {
        this._contractorID = contractorID
        this._type = type;
        this._rate = rate;
        this._efficiency = efficiency;
        this._rating = rating;
        this._ratingPath = ratingPath;
    }

    get contractorID(): number {
        return this._contractorID;
    }

    set contractorID(value: number) {
        this._contractorID = value;
    }

    get type(): ContractorType {
        return this._type;
    }

    set type(value: ContractorType) {
        this._type = value;
    }
    get rate(): number {
        return this._rate;
    }

    set rate(value: number) {
        this._rate = value;
    }

    get efficiency(): number {
        return this._efficiency;
    }

    set efficiency(value: number) {
        this._efficiency = value;
    }
    get rating(): number {
        return this._rating;
    }

    set rating(value: number) {
        this._rating = value;
    }
    get ratingPath(): string {
        return this._ratingPath;
    }

    set ratingPath(value: string) {
        this._ratingPath = value;
    }



}