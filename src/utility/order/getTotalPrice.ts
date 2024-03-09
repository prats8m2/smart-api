import { Product } from '../../db/entity/product.entity';

export const getTotalPrice = async (products: any[]) => {
	const productsDetails: Product[] = await Product.findByIds(products);

	const mappedProducts: any[] = [];

	productsDetails.forEach((product: Product) => {
		const detail = products.find((detail: any) => detail.id === product.id);
		if (detail) {
			mappedProducts.push({ ...product, quantity: detail.quantity });
		}
	});
	return mappedProducts.reduce(
		(total, { price, quantity }) => total + price * quantity,
		0
	);
};
