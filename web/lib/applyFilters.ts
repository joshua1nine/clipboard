export const applyFilters = (data: any, filters: any) => {
	console.log(filters.tags);
	console.log(data);
	if (filters.type && filters.tags) {
		return data.filter((item: any) => {
			return (
				item.type.includes(filters.type) && item.tags.includes(filters.tags)
			);
		});
	} else if (filters.type || filters.tags) {
		return data.filter((item: any) => {
			return (
				item.type.includes(filters.type) || item.tags.includes(filters.tags)
			);
		});
	} else {
		return data;
	}
};
