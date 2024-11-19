import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { getUserById } from './models/users'
import { signInUser } from './controllers/users'
import bodyParser from 'body-parser'
import { authentication } from './middleware/auth'
import { getImagesByAnnotatorId } from './controllers/images'

// generated passwords
// import bcrypt from 'bcrypt';
// console.log('alice', bcrypt.hashSync('alice', 10));
// console.log('bob', bcrypt.hashSync('bob', 10));
// console.log('rick', bcrypt.hashSync('rick', 10));

config();

const APP_PORT = parseInt(process.env.APP_PORT || '3000');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (_, res: Response) => {
	res.send('Hello There!');
});

app.get('/images', authentication, async (req: any, res: Response, next: NextFunction): Promise<any> => {
	const response = await getImagesByAnnotatorId(req.user.id);
	res.json(response);
});

app.get('/users/:id', async (req: Request, res: Response, next: NextFunction)  => {
	const {id} = req.params;
	try {
		const user = await getUserById(parseInt(id));
		res.json(user);
	} catch (e) {
		console.error(e);
		next(e);
	}
});

app.post('/users/token', async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body);
	const {name, password} = req.body;
	if (!name || !password) {
		res.status(400).send('Missing name or password');
		return;
	}

	try {
		const token = await signInUser(name, password);
		res.json({token});
	} catch (e) {
		res.status(401).send((e as Error).message);
	}

});

console.info(`Lobby service listening on ${APP_PORT}`);
app.listen(APP_PORT);
