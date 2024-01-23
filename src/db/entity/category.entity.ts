import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';
import { Site } from './site.entity';
import { Product } from './product.entity';
// Table: Category
@Entity()
export class Category extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id?: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@Column()
	sequence: number;

	@Column()
	type: number;

	@ManyToOne(() => Site, (site) => site.categories)
	@JoinTable()
	site: Site;

	@OneToOne(() => Schedule)
	@JoinColumn()
	schedule: Schedule;

	@ManyToMany(() => Product, (product) => product.categories, { cascade: true })
	@JoinTable({
		name: 'product_category',
		joinColumn: { name: 'category_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
	})
	products: Product[];

	@Column({
		type: 'enum',
		enum: [0, 1],
		default: 1,
	})
	status?: number;

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
