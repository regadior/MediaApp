import { Column, Entity } from 'typeorm';

@Entity()
export class UserRolEntity {
  @Column({ nullable: false })
  userRolId: number;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  description: string;
}
