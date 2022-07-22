import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Menu } from "./menu.entity";
import { User } from "./user.entity";
// Table: User
@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  name!: string;

  @Column("simple-json", { nullable: false, default: {} })
  schedule!: any;

  @Column({
    type: "enum",
    enum: [0, 1],
    default: 1,
  })
  status!: number;

  @ManyToOne(() => User, (user) => user.categories)
  @JoinTable()
  user: User;

  @ManyToMany(() => Menu, (menu) => menu.categories)
  @JoinTable()
  menus: Menu[];

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
