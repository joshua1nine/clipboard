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
	const method = req.method;

	try {
		switch (method) {
			// Create Reservation
			case 'POST':
				console.log(typeof req.body);

				if (req?.body != undefined || req?.body != '') {
					const body = JSON.parse(req?.body);
					client
						.create(body?.reservation)
						.then((res) => {
							console.log(`created ${res._id}`);
						})
						.catch((err) => {
							console.error('Create failed : ', err.message);
						});
					res.status(200).end(`Reservation created`);
				} else {
					res.status(404).send({
						message: `Please provide a reservation to submit`,
					});
				}
				break;

			default:
				res.setHeader('Allow', ['POST']);
				res.status(405).end(`Method ${method} Not Allowed`);
				break;
		}
	} catch (err) {
		res.status(500).json({ error: `failed to load data: ${err}` });
	}
}
