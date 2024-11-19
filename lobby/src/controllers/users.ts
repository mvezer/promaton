import { getUserByName, User } from '../models/users'
import { checkPassword, createJWT } from '../utils/auth'

export async function signInUser (name: string, password: string): Promise<string> {
	const user: User | undefined = await getUserByName(name);

	if (!user) {
		throw new Error('User not found');
	}

	if (!(await checkPassword(user, password))) {
		throw new Error('Invalid password');
	}

	const token = await createJWT(user);

	return token;
}
