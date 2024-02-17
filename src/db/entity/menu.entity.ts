import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn,
} from 'typeorm';
import { MenuItem } from './menu_items.entity';
import { Site } from './site.entity';
import { Schedule } from './schedule.entity';
// Table: User
@Entity()
export class Menu extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: string;

	@Column({ nullable: true })
	name!: string;

	@Column({ nullable: true })
	description: string;

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

	@OneToMany(() => MenuItem, (menuItems) => menuItems.menu)
	menuItems: MenuItem[];

	@OneToOne(() => Schedule)
	@JoinColumn()
	schedule: Schedule;

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
