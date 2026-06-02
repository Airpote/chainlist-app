<script lang="ts">
	import { onMount } from 'svelte';
	import type { Chain } from '@amichain/chainlist';
	import { filters, llamaChains, resultsNumber, additionalChains, pagination } from '$lib/stores';
	import ChainsListItem from '$lib/components/ChainsListItem.svelte';
	import ChainsListNoResults from '$lib/components/ChainsListNoResults.svelte';
	import ChainListPreloader from '$lib/components/ChainListPreloader.svelte';
	import ChainsListPagination from '$lib/components/ChainsListPagination.svelte';

	const PAGE_SIZE_OPTIONS = [10, 100, 1000, 'all'] as const;

	let bundledChains: Record<string, Chain> | null = null;
	let filterSignature = '';

	onMount(async () => {
		const { chains } = await import('@amichain/chainlist');
		bundledChains = chains;
	});

	$: allChains =
		bundledChains === null
			? []
			: [...Object.values(bundledChains), ...$additionalChains].filter(
					(c, i, arr) => arr.findIndex((cc) => cc.chainId === c.chainId) === i
				);

	$: tvlByChainId = new Map($llamaChains.map((entry) => [entry.chainId, entry.tvl ?? 0]));

	$: filteredChains = allChains
		.filter((c) => {
			if ($filters.testnet === false && c.testnet) {
				return false;
			}
			if ($filters.noExplorer === false && !c.explorers.length) {
				return false;
			}
			if ($filters.noWebsite === false && !c.website) {
				return false;
			}
			if ($filters.query?.length && !isNaN(Number($filters.query))) {
				return c.chainId === Number($filters.query);
			}
			return c.name.toLowerCase().includes($filters.query.toLowerCase());
		})
		.sort((a, b) => {
			if (a.chainId === 43114) return -1;
			if (b.chainId === 43114) return 1;
			if (a.chainId === 2027) return -1;
			if (b.chainId === 2027) return 1;
			if (a.chainId === 235235) return -1;
			if (b.chainId === 235235) return 1;
			if ($filters.orderBy === 'name') {
				return $filters.order === 'asc'
					? a.name.localeCompare(b.name)
					: b.name.localeCompare(a.name);
			}
			if ($filters.orderBy === 'tvl') {
				const tvlA = tvlByChainId.get(a.chainId) ?? 0;
				const tvlB = tvlByChainId.get(b.chainId) ?? 0;
				return $filters.order === 'asc' ? tvlB - tvlA : tvlA - tvlB;
			}
			return $filters.order === 'asc' ? a.chainId - b.chainId : b.chainId - a.chainId;
		});

	$: nextFilterSignature = JSON.stringify($filters);
	$: if (nextFilterSignature !== filterSignature) {
		filterSignature = nextFilterSignature;
		if ($pagination.page !== 1) {
			pagination.update((state) => ({ ...state, page: 1 }));
		}
	}

	$: pageSize =
		$pagination.pageSize === 'all' ? filteredChains.length || 1 : $pagination.pageSize;
	$: totalPages = Math.max(1, Math.ceil(filteredChains.length / pageSize));
	$: currentPage = Math.min($pagination.page, totalPages);
	$: if (currentPage !== $pagination.page) {
		pagination.update((state) => ({ ...state, page: currentPage }));
	}
	$: pageStart = (currentPage - 1) * pageSize;
	$: paginatedChains = filteredChains.slice(pageStart, pageStart + pageSize);
	$: $resultsNumber = filteredChains.length;

	const setPage = (page: number) => {
		pagination.update((state) => ({ ...state, page }));
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const setPageSize = (value: string) => {
		const pageSize = value === 'all' ? ('all' as const) : Number(value);
		pagination.set({ page: 1, pageSize });
	};
</script>

{#if bundledChains === null}
	<ChainListPreloader />
{:else}
	<div class="toolbar">
		<span>
			{filteredChains.length} / {allChains.length} chain{filteredChains.length === 1 ? '' : 's'} found
			{#if $pagination.pageSize !== 'all'}
				· showing {pageStart + 1}–{Math.min(pageStart + pageSize, filteredChains.length)}
			{/if}
		</span>

		<label class="page-size">
			<span>Show</span>
			<select
				class="select select-bordered select-sm"
				value={String($pagination.pageSize)}
				on:change={(event) => setPageSize(event.currentTarget.value)}
			>
				{#each PAGE_SIZE_OPTIONS as option}
					<option value={option}>{option === 'all' ? 'All' : option}</option>
				{/each}
			</select>
			<span>per page</span>
		</label>
	</div>

	<div class="chain-list">
		{#each paginatedChains as chain (chain.chainId)}
			<ChainsListItem {chain} />
		{:else}
			<ChainsListNoResults />
		{/each}
	</div>

	<ChainsListPagination page={currentPage} {totalPages} onPageChange={setPage} />
{/if}

<style lang="postcss">
	.toolbar {
		@apply flex flex-col gap-3 p-2 sm:flex-row sm:items-center sm:justify-between;
	}
	.page-size {
		@apply flex items-center gap-2 text-sm;
	}
	.chain-list {
		@apply grid flex-1 grid-cols-1 items-start gap-2 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4;
	}
</style>
