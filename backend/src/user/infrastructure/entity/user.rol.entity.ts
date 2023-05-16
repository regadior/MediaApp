import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class UserRolEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  userRolId: number;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  description: string;
}
