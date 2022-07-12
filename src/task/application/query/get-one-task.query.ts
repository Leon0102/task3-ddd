/* eslint-disable prettier/prettier */
export class GetOneTaskQuery {
    constructor(
        private readonly id: number,
    ) { }

    public getId(): number {
        return this.id;
    }
}