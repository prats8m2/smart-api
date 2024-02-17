import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn,
} from 'typeorm';
import { Site } from './site.entity';
import { Category } from './category.entity';
import { MenuItem } from './menu_items.entity';
// Table: User
@Entity()
export class Product extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: string;

	@Column({ nullable: true })
	name!: string;

	@Column({ nullable: true })
	description!: string;

	@Column()
	price!: string;

	@Column({ nullable: true })
	image!: string;

	@Column()
	type: number;

	@Column({
		type: 'enum',
		enum: [0, 1],
		default: 1,
	})
	status!: number;

	@ManyToOne(() => Site, (site) => site.products)
	@JoinTable()
	site: Site;

	@OneToMany(() => MenuItem, (menuItems) => menuItems.product)
	menuItems: MenuItem[];

	@ManyToMany(() => Category, (category) => category.products)
	categories: Category[];

	@Column({
		type: 'enum',
		enum: [0, 1],
		default: 0,
	})
	isNew!: number;

	@Column({
		type: 'enum',
		enum: [0, 1],
		default: 0,
	})
	isSpecial!: number;

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
