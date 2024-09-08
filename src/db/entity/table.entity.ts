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
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn,
} from 'typeorm';
import { Device } from './device.entity';
import { Site } from './site.entity';
import { Wifi } from './wifi.entity';
import { Order } from './order.entity';
import { Feedback } from './feedback.entity';
// Table: Table
@Entity()
export class Table extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: string;

	@Column()
	name: string;

	@Column({
		type: 'enum',
		enum: [0, 1],
		default: 0,
	})
	occupied!: number;

	@ManyToOne(() => Site, (site) => site.rooms)
	@JoinTable()
	site: Site;

	@OneToOne(() => Device)
	@JoinColumn()
	device: Device;

	@OneToMany(() => Order, (order) => order.room)
	orders: Order[];

	@OneToMany(() => Feedback, (feedback) => feedback.table)
	feedbacks: Feedback[];

	@ManyToMany(() => Wifi, (wifi) => wifi.tables)
	wifis: Wifi[];

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
