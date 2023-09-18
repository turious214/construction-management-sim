import Contractor from "./Contractor.js";

export default class Mason implements Contractor {

    private _contractorID: number;
    private _rate: number;
    private _rating: number;
    private _ratingPath: string;

    constructor(contractorID: number, rate: number, rating: number, ratingPath: string) {
        this._contractorID = contractorID;
        this._rate = rate;
        this._rating = rating;
        this._ratingPath = ratingPath;
    }

    get ratingPath(): string {
        return this._ratingPath;
    }

    set ratingPath(value: string) {
        this._ratingPath = value;
    }


    get rating(): number {
        return this._rating;
    }

    set rating(value: number) {
        this._rating = value;
    }
    get rate(): number {
        return this._rate;
    }

    set rate(value: number) {
        this._rate = value;
    }
    get contractorID(): number {
        return this._contractorID;
    }

    set contractorID(value: number) {
        this._contractorID = value;
    }


}