import { UserEntity } from "../entity/UserEntity";
export interface UserRepository{
    createUser(user: UserEntity): Promise<UserEntity>;
}