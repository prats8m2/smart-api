import { Pool } from "pg";
const pool = new Pool();

export const query = (text: any, params: any = []) => pool.query(text, params);
