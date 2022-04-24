export default {
	name: 'reservation',
	title: 'Reservation',
	type: 'document',
	fields: [
		{
			name: 'resource',
			title: 'Resource',
			type: 'reference',
			to: [{ type: 'resource' }],
		},
		{
			name: 'teacher',
			title: 'Teacher',
			type: 'object',
			fields: [
				{
					name: 'name',
					title: 'Name',
					type: 'string',
				},
				{
					name: 'email',
					title: 'Email',
					type: 'string',
				},
			],
		},
		{
			name: 'dates',
			title: 'Dates',
			type: 'array',
			of: [{ type: 'date' }],
		},
	],
};
