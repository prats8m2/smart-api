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
import { Product } from './product.entity';
import { Room } from './room.entity';
import { Table } from './table.entity';
import { Payment } from './payment.entity';
// Table: Order
@Entity()
export class Order extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: string;

	//1: Table, 2: Room, 3:Online, 4:Offline
	@Column({
		type: 'enum',
		enum: [1, 2, 3, 4],
		default: 4,
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

	@ManyToOne(() => Room, (room) => room.orders)
	@JoinTable()
	room: Room;

	@ManyToOne(() => Table, (table) => table.orders)
	@JoinTable()
	table: Table;

	@OneToOne(() => Payment)
	@JoinColumn()
	payment: Payment;

	@ManyToMany(() => Product, (product) => product.orders)
	@JoinTable()
	products: Product[];

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
