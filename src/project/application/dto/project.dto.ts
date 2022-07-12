/* eslint-disable prettier/prettier */

import { Exclude, Expose } from 'class-transformer';
import { ListDTO } from './list.dto';
import { UserDTO } from './user.dto';
@Exclude()
export class ProjectDTO {

    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    users: UserDTO[];

    @Expose()
    lists: ListDTO[];

}