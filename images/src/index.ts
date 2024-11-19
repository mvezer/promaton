import express from 'express';
import fs from 'fs-extra';

const APP_PORT = 8080;
const app = express();

app.get('/', (req, res) => {
	res.send('Hello There!');
});

app.get('/assignments/:id/image', async (req, res, next) => {
	const image = `./images/${req.params.id}.jpg`;
	console.info(`Looking for image ${image}`);
	try {
		if (await fs.pathExists(image)) {
			return res.sendFile(image, { root: '.' });
		} else {
			return res.status(404).send('Not found');
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
});

console.info(`Images service listening on ${APP_PORT}`);
app.listen(APP_PORT);
