// GET All Tags
export async function getTags() {
	const response = await fetch('http://localhost:3000/api/tags');
	const result = await response.json();
	return result.data;
}

// CREATE TAG

// DELETE TAG

// GET All Resources
export async function getResources() {
	const response = await fetch('http://localhost:3000/api/resources');
	const result = await response.json();
	return result.data;
}

// GET Single Resource
export async function getResource(slug: string) {
	const response = await fetch(
		`http://localhost:3000/api/resources/get/${slug}`
	);
	const result = await response.json();
	return result.data;
}

// GET A Resource's Current Reservations
export async function getResourceReservations(id: string) {
	const response = await fetch(
		`http://localhost:3000/api/resources/reservations/${id}`
	);
	const result = await response.json();
	if (response.status == 404) {
		return null;
	}
	return result.data;
}

// CREATE Resource

// UPDATE Resource

// DELETE Resource

// GET All Reservations
export async function getReservations() {
	const response = await fetch('http://localhost:3000/api/reservations');
	const result = await response.json();
	return result.data;
}

// GET Single Reservation
export async function getReservation(id: string) {
	const response = await fetch(
		`http://localhost:3000/api/reservations/get/${id}`
	);
	const result = await response.json();
	return result.data;
}

// CREATE Reservation

// DELETE Reservation
