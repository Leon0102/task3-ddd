/* eslint-disable prettier/prettier */
export class GetAllProjectQuery {
    constructor(
        private readonly userId: number,
    ) { }
    public getUserId(): number {
        return this.userId;
    }
}