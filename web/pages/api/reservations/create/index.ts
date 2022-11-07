// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getClient } from '../../../../lib/sanity.server';

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
	try {
		const method = req.method;
		const body = JSON.parse(req.body);

		switch (method) {
			// Create Reservation
			case 'POST':
				const response = await client.create(body);
				res.status(200).end(`Reservation created: ${response._id}`);
				break;

			default:
				res.setHeader('Allow', ['POST']);
				res.status(405).end(`Method ${method} Not Allowed`);
				break;
		}
	} catch (err: any) {
		if (err instanceof SyntaxError) {
			res.status(400).json({
				message:
					'SyntaxError make sure you include the reservation object in the body of the request.',
				error: err.message,
			});
		} else if (err.name === 'ClientError') {
			res.status(400).json({
				message: 'Make sure the shape of the reservation object is correct.',
				error: err.message,
			});
		} else {
			res.status(400).json({
				message: err.message,
			});
		}
		res.status(500).json({ error: `failed to load data: ${err}` });
	}
}
