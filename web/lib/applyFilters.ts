export const applyFilters = (data: any, filters: any) => {
	if (filters.type && filters.tags) {
		return data.filter((item) => {
			return (
				item.type.includes(filters.type) && item.tags.includes(filters.tags)
			);
		});
	} else if (filters.type || filters.tags) {
		return item.type.includes(filters.type) || item.tags.includes(filters.tags);
	} else {
		return data;
	}
};
