/* eslint-disable prettier/prettier */
import { IEvent } from "@nestjs/cqrs";

export class ListDeletedEvent implements IEvent {
    constructor(
        readonly id: number,
    ) {
    }
}