import ContractorType from "./ContractorType.js";

export default class Contractor {
    
    private _contractorID: number;
    private _type: ContractorType;
    private _rate: number;
    private _ratingPath: string;

    // Note: 1 - 5 {increments of 0.5} //
    private _rating: number;
    private _efficiency: number;
    private _performance: number;
    private _safety: number;
    private _discipline: number;
    

    constructor(contractorID: number, type: ContractorType, rate: number, ratingPath: string, efficiency: number, performance: number, safety: number, discipline: number) {
        this._contractorID = contractorID
        this._type = type;
        this._rate = rate;
        this._ratingPath = ratingPath;
        this._efficiency = efficiency;
        this._performance = performance;
        this._safety = safety;
        this._discipline = discipline;

        const NUMBER_OF_FIELDS: number = 4;

        this._rating = (efficiency + performance + safety) / NUMBER_OF_FIELDS;

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

    get efficiency(): number {
        return this._efficiency;
    }

    set efficiency(value: number) {
        this._efficiency = value;
    }

    get performance(): number {
        return this._performance;
    }

    set performance(value: number) {
        this._performance = value;
    }
    get safety(): number {
        return this._safety;
    }

    set safety(value: number) {
        this._safety = value;
    }



    get discipline(): number {
        return this._discipline;
    }

    set discipline(value: number) {
        this._discipline = value;
    }



}