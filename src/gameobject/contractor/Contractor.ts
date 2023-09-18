export default interface Contractor {

    get ratingPath(): string;
    set ratingPath(value: string)
    get rating(): integer;
    set rating(value: integer);
    get rate(): integer;
    set rate(value: integer);
    get contractorID(): integer;
    set contractorID(value: integer);

}