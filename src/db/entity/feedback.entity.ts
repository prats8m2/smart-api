import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn,
} from 'typeorm';
import { Table } from './table.entity';
import { Site } from './site.entity';
import { Room } from './room.entity';
// Table: Event
@Entity()
export class Feedback extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ nullable: true })
	name: string;

	@Column({ nullable: true })
	email: string;

	@Column({ nullable: true })
	mobile: string;

	@Column({ nullable: true })
	review: string;

	@Column()
	cleanlinessRating: number;

	@Column()
	serviceQualityRating: number;

	@Column()
	facilitiesRating: number;

	@Column()
	foodRating: number;

	@Column()
	overallRating: number;

	@ManyToOne(() => Site, (site) => site.events)
	@JoinTable()
	site: Site;

	@ManyToOne(() => Room, (room) => room.feedbacks)
	@JoinTable()
	room: Room;

	@ManyToOne(() => Table, (table) => table.feedbacks)
	@JoinTable()
	table: Table;

	@VersionColumn({ select: false })
	version?: number;

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
