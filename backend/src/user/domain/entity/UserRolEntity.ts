import { UserEntity } from "./UserEntity";

export class UserRolEntity {
    rolId: number;
    name: string;
    description: string;
    user: UserEntity[];
}