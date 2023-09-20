export class Sort {
    private text: string;
    private sort: Function;

    public constructor(text: string, callback: Function) {
        this.text = text;
        this.sort = callback;
    }

    public getText(): string {
        return this.text;
    }

    public filter(): void {
        this.sort();
    }
}
