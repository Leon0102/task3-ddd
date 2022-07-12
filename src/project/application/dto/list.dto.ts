/* eslint-disable prettier/prettier */

import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class ListDTO {
    @Expose()
    id: number;
    @Expose()
    name: string;
    @Expose()
    description: string;
}