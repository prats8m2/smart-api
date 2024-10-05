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
// Table: Site
@Entity()
export class Site_Settings extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: string;

	@Column({ default: 1 })
	theme!: number;

	@Column('float', { default: 2.5 })
	cgst!: string;

	@Column('float', { default: 10 })
	serviceTax!: number;

	@Column('float', { default: 2.5 })
	sgst!: string;

	@Column({ nullable: false, default: '$' })
	currency!: string;

	@Column({ default: 1 })
	orders!: number;

	@Column({ default: 1 })
	foodOrder!: number;

	@Column({ default: 1 })
	amenitiesOrder!: number;

	@Column({ default: 1 })
	orderHistory!: number;

	@Column({ default: 1 })
	callReception!: number;

	@Column({ default: 1 })
	roomService!: number;

	@Column({ default: 1 })
	cleaningService!: number;

	@Column({ default: 1 })
	wifi!: number;

	@Column({ default: 1 })
	sos!: number;

	@Column({ default: 1 })
	events!: number;

	@Column({ default: 1 })
	feedback!: number;

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
