import { db } from '../utils/db';

export interface PublicUser {
	id: number;
	name: string;
	roles: string[];
}

export interface User extends PublicUser {
	password: string;
} 

export async function getUserById (id: number): Promise<User | undefined> {
	const response = await db.query('SELECT * FROM users WHERE id = $1', [id]);
	return response.rows[0];
}


export async function getUserByName (name: string): Promise<User | undefined> {
	const response = await db.query('SELECT * FROM users WHERE name = $1', [name]);
	return response.rows[0];
}

