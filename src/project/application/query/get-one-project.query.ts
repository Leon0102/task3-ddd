/* eslint-disable prettier/prettier */
export class GetOneProjectQuery {
    constructor(
        private readonly id: number,
        private readonly userId: number,
    ) { }

    public getId(): number {
        return this.id;
    }
    public getUserId(): number {
        return this.userId;
    }
}