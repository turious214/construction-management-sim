import Contractor from "./Contractor.js";

export default class Painter implements Contractor {

    private _contractorID: integer;
    private _rate: integer;
    private _rating: integer;
    private _ratingPath: string;

    constructor(contractorID: integer, rate: integer, rating: integer, ratingPath: string) {
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


    get rating(): integer {
        return this._rating;
    }

    set rating(value: integer) {
        this._rating = value;
    }
    get rate(): integer {
        return this._rate;
    }

    set rate(value: integer) {
        this._rate = value;
    }
    get contractorID(): integer {
        return this._contractorID;
    }

    set contractorID(value: integer) {
        this._contractorID = value;
    }


}