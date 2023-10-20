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
import { Category } from "./category.entity";
import { Site } from "./site.entity";
import { Theme } from "./theme.entity";
// Table: User
@Entity()
export class Menu {
	@PrimaryGeneratedColumn('increment')
	id: string;

	@Column({ nullable: true })
	name!: string;

	@Column('simple-json', { nullable: false, default: {} })
	schedule!: any;

	@Column({
		type: 'enum',
		enum: [0, 1],
		default: 1,
	})
	status!: number;

	@ManyToOne(() => Site, (site) => site.menus)
	@JoinTable()
	site: Site;

	@ManyToOne(() => Theme, (theme) => theme.menus)
	@JoinTable()
	theme: Theme;

	@ManyToMany(() => Category, (category) => category.menus)
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
