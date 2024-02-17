import {
	Entity,
	Column,
	ManyToMany,
	JoinTable,
	VersionColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	ManyToOne,
	BaseEntity,
} from 'typeorm';
import { Category } from './category.entity';
import { Site } from './site.entity';
import { Theme } from './theme.entity';
import { Product } from './product.entity';
import { Menu } from './menu.entity';
// Table: User
@Entity()
export class MenuItem extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: string;

	@ManyToOne(() => Menu, (menu) => menu.menuItems)
	@JoinTable()
	menu: Menu;

	@ManyToOne(() => Category, (category) => category.menuItems)
	@JoinTable()
	category: Category;

	@ManyToOne(() => Product, (product) => product.menuItems)
	@JoinTable()
	product: Product;
}
