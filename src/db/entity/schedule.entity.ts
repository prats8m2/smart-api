import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn,
} from 'typeorm';
// Table: Schedule
@Entity()
export class Schedule extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ nullable: true })
	startDate: string;

	@Column({ nullable: true })
	endDate: string;

	@Column({ nullable: true })
	startTime: string;

	@Column({ nullable: true })
	endTime: string;

	@Column({ nullable: true })
	sunday_startTime: string;

	@Column({ nullable: true })
	sunday_endTime: string;

	@Column({ nullable: true })
	monday_startTime: string;

	@Column({ nullable: true })
	monday_endTime: string;

	@Column({ nullable: true })
	tuesday_startTime: string;

	@Column({ nullable: true })
	tuesday_endTime: string;

	@Column({ nullable: true })
	wednesday_startTime: string;

	@Column({ nullable: true })
	wednesday_endTime: string;

	@Column({ nullable: true })
	thursday_startTime: string;

	@Column({ nullable: true })
	thursday_endTime: string;

	@Column({ nullable: true })
	friday_startTime: string;

	@Column({ nullable: true })
	friday_endTime: string;

	@Column({ nullable: true })
	saturday_startTime: string;

	@Column({ nullable: true })
	saturday_endTime: string;

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
