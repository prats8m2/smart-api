export const isInstanceOfInterfaceArrangeCategory = (obj: any): any => {
	return 'categoryId' in obj && 'sequence' in obj;
};
