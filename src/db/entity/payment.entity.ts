import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinTable,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn,
} from 'typeorm';
import { Site } from './site.entity';
// Table: Payment
@Entity()
export class Payment extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: string;

	//1: Online, 2: Offline
	@Column({
		type: 'enum',
		enum: [1, 2],
		default: 1,
	})
	type: string;

	//1: Created, 2:In Progress,3:Picked-UP, 4:Delivered, 5:Cancelled
	@Column({
		type: 'enum',
		enum: [1, 2, 3, 4],
		default: 1,
	})
	status: string;

	@ManyToOne(() => Site, (site) => site.rooms)
	@JoinTable()
	site: Site;

	@Column()
	total: number;

	@Column()
	serviceCharge: number;

	@Column({ default: 0 })
	cgst: number;

	@Column({ default: 0 })
	sgst: number;

	@Column({ default: 0 })
	discount: number;

	@Column({ default: 0 })
	deliveryCharge: number;

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
