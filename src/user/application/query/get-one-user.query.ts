/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
export class GetOneUserQuery {
    constructor(
        private readonly id: number
    ) { }

    public getId(): number {
        return this.id;
    }
}