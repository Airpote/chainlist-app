import { filters, pagination } from '$lib/stores';

export default {
	resetFilters: () => {
		filters.set({
			query: '',
			testnet: false,
			noExplorer: false,
			noWebsite: false,
			orderBy: 'name',
			order: 'asc'
		});
		pagination.set({ page: 1, pageSize: 10 });
	}
};
