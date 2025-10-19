import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;
}
