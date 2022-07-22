export const SELECT_USER_BY_EMAIL = `SELECT * FROM public.USER WHERE email=$1`;
export const SELECT_USER_BY_EMAIL_PASS = `SELECT * FROM public.USER WHERE email=$1 AND password=$2`;

export const INSERT_USER = `INSERT INTO public.USER ("fullName", email, password, privilege)VALUES ($1, $2, $3, $4) RETURNING *`;
export const INSERT_SITE = `INSERT INTO public.SITE (name, type, address, user_id)VALUES ($1, $2, $3, $4) RETURNING *`;
export const INSERT_MENU = `INSERT INTO public.MENU (name, schedule, site_id)VALUES ($1, $2, $3) RETURNING *`;
export const INSERT_CATEGORY = `INSERT INTO public.CATEGORY (name, schedule, user_id)VALUES ($1, $2, $3) RETURNING *`;
export const INSERT_PRODUCT = `INSERT INTO public.PRODUCT (name,description,price,category_id, user_id)VALUES ($1, $2, $3, $4,$5) RETURNING *`;
export const INSERT_MENU_ITEMS = `INSERT INTO public.MENU_ITEMS (menu_id,category_id,product_id)VALUES ($1, $2, $3) RETURNING *`;
