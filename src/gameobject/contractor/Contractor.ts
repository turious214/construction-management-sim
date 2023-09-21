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
        this._contractorID = contractorID
        this._type = type;
        this._rate = rate;

        // limit between 1 - 5
        this._performance = this.setValidLimit(performance);
        this._experience = this.setValidLimit(experience);
        this._safety = this.setValidLimit(safety);
        this._discipline = this.setValidLimit(discipline);

        const NUMBER_OF_FIELDS: number = 4;

        this._rating = Math.round((experience + performance + safety + discipline) / NUMBER_OF_FIELDS);

    }

    setValidLimit(num: number): number {
        if (num < 1) {
            return 1;
        } else if (num > 5) {
            return 5;
        }
        return num;
    }

    get contractorID(): number {
        return this._contractorID;
    }

    set contractorID(value: number) {
        this._contractorID = this.setValidLimit(value);
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
        this._rate = this.setValidLimit(value);
    }

    get rating(): number {
        return this._rating;
    }

    set rating(value: number) {
        this._rating = this.setValidLimit(value);
    }

    get experience(): number {
        return this._experience;
    }

    set experience(value: number) {
        this._experience = this.setValidLimit(value);
    }

    get performance(): number {
        return this._performance;
    }

    set performance(value: number) {
        this._performance = this.setValidLimit(value);
    }
    get safety(): number {
        return this._safety;
    }

    set safety(value: number) {
        this._safety = this.setValidLimit(value);
    }

    get discipline(): number {
        return this._discipline;
    }

    set discipline(value: number) {
        this._discipline = this.setValidLimit(value);
    }

}