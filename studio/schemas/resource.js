export default {
	name: 'resource',
	title: 'Resource',
	type: 'document',
	fields: [
		{
			name: 'type',
			title: 'Type',
			type: 'string',
		},
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				slugify: (input) =>
					input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
			},
		},
		{
			name: 'mainImage',
			title: 'Main image',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'string' }],
		},
		{
			name: 'quantity',
			title: 'Quantity',
			type: 'number',
		},
		{
			name: 'reservations',
			title: 'Reservations',
			type: 'array',
			of: [{ type: 'date' }],
		},
	],
};
