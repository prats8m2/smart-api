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
	OneToOne,
	OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Site } from './site.entity';
// Table: Account
@Entity()
export class Account extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@OneToMany(() => User, (user) => user.account)
	user: User[];

	@OneToMany(() => Site, (site) => site.account)
	sites: Site[];

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