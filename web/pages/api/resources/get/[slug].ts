// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getClient } from '@lib/sanity.server';

const client = getClient().config({
	token: process.env.SANITY_API_TOKEN,
	useCdn: false,
});

const query = `*[_type == 'resource' && slug.current == $slug][0]{
  title,
  mainImage,
  type,
  quantity,
  'tags': tags[]->tag,
  _id,
	reservations
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
	const slug: any = req?.query?.slug;

	try {
		switch (method) {
			// api/resources/slug
			case 'GET':
				const resource: any = await client.fetch(query, {
					slug: slug,
				});
				if (resource != undefined) {
					res.status(200).json({ data: resource });
				} else {
					res
						.status(404)
						.json({ message: `No resource was found with the id of ${slug}` });
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
