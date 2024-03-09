import {
	BaseEntity,
	Column,
	Entity,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order_Product extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ default: 1 })
	quantity: number;

	@Column()
	@PrimaryColumn()
	order_id: number;

	@Column()
	@PrimaryColumn()
	product_id: number;
}
