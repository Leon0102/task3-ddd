/* eslint-disable prettier/prettier */

import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class UserDTO {
    @Expose()
    id: number;
    @Expose()
    name: string;
    @Expose()
    email: string;
}