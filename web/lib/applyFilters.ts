export const applyFilters = (data: any, filters: any) => {
	if (filters?.type != 'none' && filters?.tags?.length > 0) {
		const filtered = data.filter((item: any) => {
			return (
				item?.type?.includes(filters?.type) &&
				item?.tags?.some((tag: any) => filters?.tags.includes(tag))
			);
		});
		return filtered;
	} else if (filters.type != 'none' || filters?.tags?.length > 0) {
		const filtered = data?.filter((item: any) => {
			return (
				item?.type?.includes(filters.type) ||
				item?.tags?.some((tag: any) => filters?.tags?.includes(tag))
			);
		});
		return filtered;
	} else {
		return data;
	}
};
