/* eslint-disable prettier/prettier */
import { IEvent } from "@nestjs/cqrs";

export class ProjectCreatedEvent implements IEvent {
    constructor(
        readonly id: number,
    ) {
    }
}