export class UserRolModel {
  userRolId: number;
  name: string;
  description: string;
  constructor(userRolId: number, name: string, description: string) {
    this.userRolId = userRolId;
    this.name = name;
    this.description = description;
  }
}
