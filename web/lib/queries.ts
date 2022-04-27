import { groq } from 'next-sanity';
export const getAllResources = groq`*[_type == 'resource']{
	_id,
	type,
	mainImage,
	title,
	'slug': slug.current,
}`;
