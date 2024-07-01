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
import { Site } from './site.entity';
import { Room } from './room.entity';
import { Table } from './table.entity';
// Table: Session
@Entity()
export class Session extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: string;

	@Column()
	sessionId: string;

	@ManyToOne(() => Site, (site) => site.sessions)
	@JoinTable()
	site: Site;

	@OneToOne(() => Room)
	@JoinColumn()
	room: Room;

	@OneToOne(() => Table)
	@JoinColumn()
	table: Table;

	@VersionColumn()
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
