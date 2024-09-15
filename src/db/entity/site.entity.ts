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
import { Account } from './account.entity';
import { Device } from './device.entity';
import { Room } from './room.entity';
import { User } from './user.entity';
import { Wifi } from './wifi.entity';
import { Category } from './category.entity';
import { Product } from './product.entity';
import { Events } from './event.entity';
import { Session } from './session.entity';
import { Site_Settings } from './site_settings.entity';
// Table: Site
@Entity()
export class Site extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: string;

	@Column({ nullable: true })
	name!: string;

	@Column()
	type!: number;

	@Column()
	address!: string;

	@Column({ nullable: true })
	country!: string;

	@Column({ nullable: true })
	state!: string;

	@ManyToOne(() => Account, (account) => account.sites)
	@JoinTable()
	account: Account;

	@OneToOne(() => Site_Settings)
	@JoinColumn()
	settings: Site_Settings;

	@ManyToMany(() => User, (user) => user.sites)
	@JoinTable()
	users: User[];

	@OneToMany(() => Room, (room) => room.site)
	rooms: Room[];

	@OneToMany(() => Wifi, (wifi) => wifi.site)
	wifi: Wifi[];

	@OneToMany(() => Device, (device) => device.site)
	devices: Device[];

	@OneToMany(() => Session, (session) => session.site)
	sessions: Session[];

	@OneToMany(() => Category, (category) => category.site)
	categories: Category[];

	@OneToMany(() => Events, (event) => event.site)
	events: Events[];

	// @OneToMany(() => Menu, (menu) => menu.site)
	// @JoinTable()
	// menus: Menu[];

	@OneToMany(() => Product, (product) => product.site)
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
