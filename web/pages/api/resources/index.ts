// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getClient } from '@lib/sanity.server';

const client = getClient().config({
	token: process.env.SANITY_API_TOKEN,
	useCdn: false,
});

const query = `*[_type == 'resource']{
 	_id,
 	type,
 	mainImage,
 	title,
 	'slug': slug.current,
 	'tags': tags[]->tag
 }`;

interface Data {
	data?: Reservation[];
	error?: string;
	method?: string;
	endpoint?: string;
	message?: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const method = req.method;

	try {
		switch (method) {
			// Get All Reservations
			case 'GET':
				const data = await client.fetch(query);
				res.status(200).json({ data });
				break;

			default:
				res.setHeader('Allow', ['GET']);
				res.status(405).end(`Method ${method} Not Allowed`);
				break;
		}
	} catch (err) {
		res.status(500).json({ error: `failed to load data: ${err}` });
	}
}
