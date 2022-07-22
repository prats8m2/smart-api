import {
  Entity,
  Column,
  JoinTable,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";
// Table: User
@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  name!: string;

  @Column()
  description!: string;

  @Column()
  price!: string;

  @Column()
  image!: string;

  @Column({
    type: "enum",
    enum: [0, 1],
    default: 1,
  })
  status!: number;

  @ManyToOne(() => User, (user) => user.products)
  @JoinTable()
  user: User;

  @VersionColumn({ select: false })
  version: number;

  @CreateDateColumn({ nullable: true })
  createdOn?: Date;

  @Column({ nullable: true, select: false })
  createdBy?: string;

  @UpdateDateColumn({ nullable: true, select: false })
  updatedOn?: Date;

  @Column({ nullable: true, select: false })
  updatedBy?: string;

  @DeleteDateColumn({ nullable: true, select: false })
  deletedOn?: Date;

  @Column({ nullable: true, select: false })
  deletedBy?: string;
}
