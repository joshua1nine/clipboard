// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getClient } from '@lib/sanity.server';

const client = getClient().config({
	token: process.env.SANITY_API_TOKEN,
	useCdn: false,
});

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
	const method = req?.method;
	const id: any = req?.query?.id;

	try {
		switch (method) {
			// Delete Reservation
			case 'DELETE':
				const response = await client.delete(id);
				if (response.results.length == 0) {
					res
						.status(404)
						.json({ message: `No resource was found with the id of ${id}` });
				} else {
					res.status(200).end('Resource deleted');
				}
				break;

			default:
				res.setHeader('Allow', ['DELETE']);
				res.status(405).end(`Method ${method} Not Allowed`);
				break;
		}
	} catch (err) {
		res.status(500).json({ error: `failed to load data: ${err}` });
	}
}
