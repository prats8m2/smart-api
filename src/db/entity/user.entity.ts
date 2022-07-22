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
import { Category } from "./category.entity";
import { Product } from "./product.entity";
import { Site } from "./site.entity";
import { Theme } from "./theme.entity";
// Table: User
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  fullName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  mobile?: string;

  @Column({ nullable: false, default: false })
  isFirstLogin: boolean;

  @Column({
    type: "enum",
    enum: [0, 1],
    default: 1,
  })
  status!: number;

  @Column()
  permission!: string;

  @Column()
  privilege!: string;

  @OneToMany(() => Site, (site) => site.user)
  @JoinTable()
  sites: Site[];

  @ManyToMany(() => Theme, (theme) => theme.users)
  @JoinTable()
  themes: Theme[];

  @OneToMany(() => Product, (product) => product.user)
  @JoinTable()
  products: Product[];

  @OneToMany(() => Category, (category) => category.user)
  @JoinTable()
  categories: Category[];

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
