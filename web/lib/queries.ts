import { groq } from 'next-sanity';
export const getAllResources = groq`*[_type == 'resource']{
	_id,
	type,
	mainImage,
	title,
	'slug': slug.current,
	'tags': tags[]->tag
}`;

export const getAllTags = groq`*[_type == 'tags']{
  _id,
  tag
}`;

export const getResource = groq`*[_type == 'resource' && slug.current == $slug][0]{
  title,
  mainImage,
  type,
  quantity,
  'tags': tags[]->tag,
  _id,
	reservations
}`;

export const findReservations = groq`*[_type == 'reservation' && resource->_id == $resource_id][0]{
  dates,
}`;

export const getReservations = groq`*[_type == 'reservation']{
  dates,
	'resource': resource->title,
	'type': resource->type,
  teacher,
  _id
}`;
