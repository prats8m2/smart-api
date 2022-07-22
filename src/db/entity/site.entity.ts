import {
  Entity,
  Column,
  JoinTable,
  OneToMany,
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
export class Site {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  name!: string;

  @Column()
  type!: number;

  @Column()
  address!: string;

  @ManyToOne(() => User, (user) => user.sites)
  @JoinTable()
  user: User;

  @OneToMany(() => Menu, (menu) => menu.site)
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
