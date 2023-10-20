import {
	Entity,
	Column,
	JoinTable,
	VersionColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	ManyToOne,
	BaseEntity,
	OneToMany,
	ManyToMany,
} from 'typeorm';
import { Account } from './account.entity';
import { User } from './user.entity';
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

	@ManyToOne(() => Account, (account) => account.sites)
	@JoinTable()
	account: Account;

	@ManyToMany(() => User, (user) => user.sites)
	@JoinTable()
	users: User[];

	// @OneToMany(() => Menu, (menu) => menu.site)
	// @JoinTable()
	// menus: Menu[];

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
