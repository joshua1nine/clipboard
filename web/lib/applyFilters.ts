export const applyFilters = (data: any, filters: any) => {
	if (filters.type && filters.tags) {
		const filtered = data.filter((item: any) => {
			return (
				item.type.includes(filters.type) &&
				item.tags.some((tag) => filters.tags.includes(tag))
			);
		});
		return filtered;
	} else if (filters.type || filters.tags) {
		const filtered = data.filter((item: any) => {
			return (
				item.type.includes(filters.type) ||
				item.tags.some((tag) => filters.tags.includes(tag))
			);
		});
		return filtered;
	} else {
		return data;
	}
};
