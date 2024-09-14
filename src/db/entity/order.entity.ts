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
import { Payment } from './payment.entity';
import { Product } from './product.entity';
import { Room } from './room.entity';
import { Site } from './site.entity';
import { Table } from './table.entity';
import { User } from './user.entity';
// Table: Order
@Entity()
export class Order extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: number;

	//1: Table, 2: Room, 3:Online, 4:Offline, 5: SOS, 6: Room Service, 7: Room Cleaning
	@Column({
		type: 'enum',
		enum: [1, 2, 3, 4, 5, 6, 7],
		default: 4,
	})
	type: string;

	//1: Created, 2:In Progress,3:Picked-UP, 4:Delivered, 5:Cancelled
	@Column({
		type: 'enum',
		enum: [1, 2, 3, 4, 5],
		default: 1,
	})
	status: number;

	//1: Food, 2: Amenities
	@Column({
		type: 'enum',
		enum: [1, 2],
		default: 1,
	})
	categoryType: string;

	@Column({
		nullable: true,
	})
	description: string;

	@ManyToOne(() => Site, (site) => site.rooms)
	@JoinTable()
	site: Site;

	@ManyToOne(() => Room, (room) => room.orders)
	@JoinTable()
	room: Room;

	@ManyToOne(() => Table, (table) => table.orders)
	@JoinTable()
	table: Table;

	@OneToOne(() => Payment)
	@JoinColumn()
	payment: Payment;

	@ManyToMany(() => Product, (product) => product.orders, { cascade: true })
	@JoinTable({
		name: 'order_product',
		joinColumn: { name: 'order_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
	})
	products: Product[];

	@ManyToOne(() => User, (user) => user.orders)
	@JoinTable()
	user: User;

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
