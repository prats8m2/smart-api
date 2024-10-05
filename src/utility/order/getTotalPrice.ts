import { Product } from '../../db/entity/product.entity';

export const getTotalPrice = async (products: any[], siteSettings: any) => {
	const productsDetails: Product[] = await Product.findByIds(products);

	const mappedProducts: any[] = [];

	productsDetails.forEach((product: Product) => {
		const detail = products.find((detail: any) => detail.id === product.id);
		if (detail) {
			mappedProducts.push({ ...product, quantity: detail.quantity });
		}
	});

	let totalAmountOfProduct = 0;
	mappedProducts.map((product) => {
		totalAmountOfProduct += product.quantity * product.price;
	});
	let sgstAmount: any = Number(
		((totalAmountOfProduct * siteSettings.sgst) / 100).toFixed(2)
	);
	let cgstAmount: any = Number(
		((totalAmountOfProduct * siteSettings.cgst) / 100).toFixed(2)
	);

	let serviceTaxAmount: any = Number(
		((totalAmountOfProduct * siteSettings.serviceTax) / 100).toFixed(2)
	);

	let totalAmountWithTaxes: any = Number(
		(totalAmountOfProduct + sgstAmount + cgstAmount + serviceTaxAmount).toFixed(
			2
		)
	);
	return {
		sgstAmount,
		cgstAmount,
		serviceTaxAmount,
		totalAmountWithTaxes,
	};
};
