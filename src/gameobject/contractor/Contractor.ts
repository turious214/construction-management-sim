export default interface Contractor {

    get ratingPath(): string;
    set ratingPath(value: string)
    get rating(): number;
    set rating(value: number);
    get rate(): number;
    set rate(value: number);
    get contractorID(): number;
    set contractorID(value: number);

}