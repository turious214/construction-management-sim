import {ContractorType} from "./ContractorType.ts";

export default class Contractor {
    
    private _contractorID: number;
    private _type: ContractorType;
    private _rate: number;

    // Note: 1 - 5 integers //
    private _rating: number;
    private _performance: number;
    private _experience: number;
    private _safety: number;
    private _discipline: number;
    

    constructor(contractorID: number, type: ContractorType, rate: number, performance: number, experience: number, safety: number, discipline: number) {
        // range error checking
        if (contractorID < 0) {
            throw new RangeError("contractorID must be non-negative");
        }
        if (rate < 0) {
            throw new RangeError("rate must be non-negative");
        }

        this.checkValidLimit(performance);
        this.checkValidLimit(experience);
        this.checkValidLimit(safety);
        this.checkValidLimit(discipline);

        this._contractorID = contractorID;
        this._type = type;
        this._rate = rate;

        this._performance = performance;
        this._experience = experience;
        this._safety = safety;
        this._discipline = discipline;

        const NUMBER_OF_FIELDS: number = 4;

        this._rating = Math.round((experience + performance + safety + discipline) / NUMBER_OF_FIELDS);

    }

    checkValidLimit(num: number): void {
        if (num < 1 || num > 5) {
            throw new RangeError("field must be between 1-5")
        }

    }

    get contractorID(): number {
        return this._contractorID;
    }

    set contractorID(value: number) {
        if (value < 0) {
            throw new RangeError("contractorID must be non-negative");
        }
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
        if (value < 0) {
            throw new RangeError("rate must be non-negative");
        }
        this._rate = value;
    }

    get rating(): number {
        return this._rating;
    }

    set rating(value: number) {
        this.checkValidLimit(value)
        this._rating = value;
    }

    get experience(): number {
        return this._experience;
    }

    set experience(value: number) {
        this.checkValidLimit(value);
        this._experience = value;
    }

    get performance(): number {
        return this._performance;
    }

    set performance(value: number) {
        this.checkValidLimit(value);
        this._performance = value;
    }
    get safety(): number {
        return this._safety;
    }

    set safety(value: number) {
        this.checkValidLimit(value);
        this._safety = value;
    }

    get discipline(): number {
        return this._discipline;
    }

    set discipline(value: number) {
        this.checkValidLimit(value);
        this._discipline = value;
    }

}