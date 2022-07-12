/* eslint-disable prettier/prettier */
import { AggregateRoot } from "@nestjs/cqrs";

export class Task extends AggregateRoot {
    constructor(
        readonly name: string,
        readonly description: string,
        readonly listId: number,
        readonly userId: number,
    ) {
        super();
    }
}