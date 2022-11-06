interface Resource {
	_id: string;
	mainImage: {};
	slug: string;
	tags: string[];
	title: string;
	type: string;
}

interface Tag {
	_id: string;
	tag: string;
}

interface Reservation {
	_id: string;
	dates: {
		_key: string;
		_type: string;
		from: string;
		to: string;
	}[];
	resource: string;
	teacher: { email: string; name: string };
	type: string;
}
