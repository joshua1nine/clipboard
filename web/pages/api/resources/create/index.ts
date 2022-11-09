// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getClient } from '@lib/sanity.server';
import { createReadStream } from 'fs';

const client = getClient().config({
	token: process.env.SANITY_API_TOKEN,
	useCdn: false,
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const method = req.method;

		switch (method) {
			// Create Resource
			case 'POST':
				const stream: any = createReadStream(
					'/Users/jmichael/Repos/Demos/clipboard/web/public/test-image.png'
				);

				// Upload an image file from the file system
				const asset = await client.assets.upload('image', stream, {
					filename: 'myImage.jpg',
				});

				const body = JSON.parse(req.body);
				body.mainImage = {
					_type: 'image',
					asset: {
						_ref: asset._id,
						_type: 'reference',
					},
				};

				// Create Resource
				const response = await client.create(body);
				res.status(200).end(`Resource created: ${response._id}`);
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
					'SyntaxError make sure you include the resource object in the body of the request.',
				error: err.message,
			});
		} else if (err.name === 'ClientError') {
			res.status(400).json({
				message: 'Make sure the shape of the resource object is correct.',
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
