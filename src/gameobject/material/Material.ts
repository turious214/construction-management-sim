import {MaterialCategory} from "./MaterialCategory.ts";
import {name} from "ts-jest/dist/transformers/hoist-jest.js";


export default class Material {

    private _name: string;
    private _category: MaterialCategory;
    private _price: number;
    private _quantity: number;

    constructor(name: string, category: MaterialCategory, price: number, quantity: number) {
        this._name = name;
        this._category = category;
        this._price = price;
        this._quantity = quantity;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
    get category(): MaterialCategory {
        return this._category;
    }

    set category(value: MaterialCategory) {
        this._category = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number) {
        this._quantity = value;
    }






}