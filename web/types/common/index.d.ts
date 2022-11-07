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
	_id?: string;
	_type?: string;
	dates?: {
		_key: string;
		_type: string;
		from: string;
		to: string;
	}[];
	resource?: {
		_ref: string;
		_type: string;
	};
	teacher?: { email: string; name: string };
}
