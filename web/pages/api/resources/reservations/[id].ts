// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getClient } from '@lib/sanity.server';

const client = getClient().config({
	token: process.env.SANITY_API_TOKEN,
	useCdn: false,
});

const query = `*[_type == 'reservation' && resource->_id == $resource_id][0]{
  dates,
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
	const method = req?.method;
	const id: any = req?.query?.id;

	try {
		switch (method) {
			// api/reservations/id
			case 'GET':
				const reservations: any = await client.fetch(query, {
					resource_id: id,
				});
				if (reservations != undefined) {
					res.status(200).json({ data: reservations });
				} else {
					res
						.status(404)
						.json({ message: `No reservation was found with the id of ${id}` });
				}
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
