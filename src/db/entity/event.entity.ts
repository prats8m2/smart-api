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
import { Schedule } from './schedule.entity';
import { Site } from './site.entity';
// Table: Event
@Entity()
export class Events extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	//1: In House Event, 2: Out side Event
	@Column({
		type: 'enum',
		enum: [1, 2],
		default: 1,
	})
	inHouse: number;

	@Column({ nullable: true })
	location: string;

	@Column({ nullable: true })
	googleLocation: string;

	@Column({ nullable: true })
	enntryFee: number;

	@ManyToOne(() => Site, (site) => site.events)
	@JoinTable()
	site: Site;

	@OneToOne(() => Schedule)
	@JoinColumn()
	schedule: Schedule;

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
