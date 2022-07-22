import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Menu } from "./menu.entity";
import { User } from "./user.entity";
// Table: User
@Entity()
export class Theme {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  price!: string;

  @Column()
  premium!: boolean;

  @Column({
    type: "enum",
    enum: [0, 1],
    default: 1,
  })
  status!: number;

  @OneToMany(() => Menu, (menu) => menu.theme)
  @JoinTable()
  menus: Menu[];

  @ManyToMany(() => User, (user) => user.themes)
  @JoinTable()
  users: User[];

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
