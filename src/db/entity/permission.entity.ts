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
// Table: Permission
@Entity()
export class Permission extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	category: string;

	@VersionColumn({ select: false })
	version?: number;

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
