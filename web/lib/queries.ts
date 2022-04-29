import { groq } from 'next-sanity';
export const getAllResources = groq`*[_type == 'resource']{
	_id,
	type,
	mainImage,
	title,
	'slug': slug.current,
	tags
}`;

export const getResource = groq`*[_type == 'resource' && slug.current == $slug][0]{
  title,
  mainImage,
  type,
  quantity,
  tags,
  _id
}`;

export const findReservations = groq`*[_type == 'reservation' && resource->_id == $resource_id]{
  dates,
}`;

export const getReservations = groq`*[_type == 'reservation']{
  dates,
	'resource': resource->title,
	'type': resource->type,
  teacher,
  _id
}`;
