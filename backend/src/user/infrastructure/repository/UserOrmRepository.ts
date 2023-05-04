import { Repository } from "typeorm";
import { User } from "../orm/User";
import { AppDataSource } from "../../../db/database";

export class UserOrmRepository{
    private repository: Repository<User>;
    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    save(user: User): Promise<User> {
        return this.repository.save(user);
    }
    
}
