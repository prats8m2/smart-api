import {
	Entity,
	Column,
	VersionColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity,
	ManyToMany,
	JoinColumn,
	JoinTable,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';
import { Account } from './account.entity';
// Table: Role
@Entity()
export class Role extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: string;

	@Column()
	name: string;

	@Column()
	type: number;

	@Column({ default: true })
	default: boolean;

	@ManyToMany(() => Permission)
	@JoinTable()
	permissions: Permission[];

	@ManyToOne(() => Account)
	@JoinColumn()
	account: Account;

	@OneToMany(() => User, (user) => user.role)
	user: User[];

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
