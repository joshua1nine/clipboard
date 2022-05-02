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
			of: [
				{
					name: 'dates',
					title: 'Reservation Dates',
					type: 'object',
					fields: [
						{
							name: 'from',
							type: 'date',
							options: { dateFormat: 'YYYY, MM, DD' },
						},
						{
							name: 'to',
							type: 'date',
							options: { dateFormat: 'YYYY, MM, DD' },
						},
					],
				},
			],
		},
	],
	preview: {
		select: {
			title: 'teacher.name',
		},
	},
};
