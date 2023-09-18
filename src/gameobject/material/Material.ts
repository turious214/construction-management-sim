import MaterialCategory from "./MaterialCategory.js";

export default class Material {

    private _name: string;
    private _category: MaterialCategory;

    constructor(name: string, category: MaterialCategory) {
        this._name = name;
        this._category = category;
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






}