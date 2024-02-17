import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product_Category {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ default: 1 })
	sequence: number;

	@Column()
	@PrimaryColumn()
	category_id: number;

	@Column()
	@PrimaryColumn()
	product_id: number;
}
