import { Pool } from 'pg';
import { config } from 'dotenv';

config();

export const db = new Pool({
	host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
	port: parseInt(process.env.POSTGRES_PORT || '5432')
});
