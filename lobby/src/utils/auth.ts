import jwt from 'jsonwebtoken';

import { PublicUser, User } from '../models/users'
import bcrypt from 'bcrypt';

export async function checkPassword (user: User, password: string): Promise<boolean> {
	return await bcrypt.compare(password, user.password)
} 

export async function createJWT (user: PublicUser): Promise<string> {
	return jwt.sign(user, process.env.JWT_SECRET || 'secret')
}

export async function verifyJWT (token: string): Promise<PublicUser | null> {
	const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as PublicUser;
	return decoded;
}
