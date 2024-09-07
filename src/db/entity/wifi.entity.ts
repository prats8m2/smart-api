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
import { Device } from './device.entity';
import { Site } from './site.entity';
import { Room } from './room.entity';
import { Table } from './table.entity';
// Table: Wifi
@Entity()
export class Wifi extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: string;

	@Column()
	username: string;

	@Column()
	password?: string;

	@ManyToOne(() => Site, (site) => site.wifi)
	@JoinTable()
	site: Site;

	@ManyToMany(() => Room, (room) => room.wifi)
	@JoinTable()
	room: Room;

	@ManyToMany(() => Table, (table) => table.wifis)
	@JoinTable()
	tables: Table[];

	@OneToOne(() => Device)
	@JoinColumn()
	device: Device;

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
