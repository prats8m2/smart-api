import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	PrimaryColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Product } from './product.entity';

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
