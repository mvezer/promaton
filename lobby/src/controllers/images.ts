import { db } from '../utils/db';

export interface Image {
	id: number;
	path: number;
}
export async function getImagesByAnnotatorId (userId: number): Promise<Image[]> {
	const response = await db.query('SELECT i.id, i.path FROM image_annotators ia JOIN images i ON ia.image_id = i.id WHERE ia.user_id = $1', [userId]);

	return response.rows as Image[];
}
