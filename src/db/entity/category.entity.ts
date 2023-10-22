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
import { Account } from './account.entity';
import { Schedule } from './schedule.entity';
// Table: Category
@Entity()
export class Category extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@Column()
	sequence: number;

	@Column()
	type: number;

	@ManyToOne(() => Account, (account) => account.categories)
	@JoinTable()
	account: Account;

	@OneToOne(() => Schedule)
	@JoinColumn()
	schedule: Schedule;

	@Column({
		type: 'enum',
		enum: [0, 1],
		default: 1,
	})
	status!: number;

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
