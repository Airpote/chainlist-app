<script lang="ts">
	import type { Chain } from '@amichain/chainlist';
	import { chains } from '@amichain/chainlist';
	import { filters, llamaChains, resultsNumber, states, additionalChains } from '$lib/stores';
	import ChainsListItem from '$lib/components/ChainsListItem.svelte';
	import ChainsListNoResults from '$lib/components/ChainsListNoResults.svelte';
	import ChainListPreloader from '$lib/components/ChainListPreloader.svelte';

	$: allChains = [...Object.values(chains), ...$additionalChains].filter(
		(c, i, arr) => arr.findIndex((cc) => cc.chainId === c.chainId) === i
	);
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
			return c.name.toLowerCase().indexOf($filters.query.toLowerCase()) !== -1;
		})
		.sort((a, b) => {
			if (a.chainId === 43114) return -1;
			if (b.chainId === 43114) return 1;
			if (a.chainId === 2027) return -1;
			if (b.chainId === 2027) return 1;
			if ($filters.orderBy === 'name') {
				return $filters.order === 'asc'
					? a.name.localeCompare(b.name)
					: b.name.localeCompare(a.name);
			} else if ($filters.orderBy === 'tvl') {
				const tvlA = $llamaChains.find((tvl) => tvl.chainId === a.chainId)?.tvl ?? 0;
				const tvlB = $llamaChains.find((tvl) => tvl.chainId === b.chainId)?.tvl ?? 0;
				return $filters.order === 'asc' ? tvlB - tvlA : tvlA - tvlB;
			} else {
				return $filters.order === 'asc' ? a.chainId - b.chainId : b.chainId - a.chainId;
			}
		});
	$: $resultsNumber = filteredChains.length;
</script>

<div class="p-2">
	<span>{$resultsNumber} / {allChains.length} chain{$resultsNumber > 1 ? 's' : ''} found</span>
</div>
<div class="chain-list">
	{#if $states.loadingTvls}
		<ChainListPreloader />
	{:else}
		{#each filteredChains as chain}
			{#if chain}
				<ChainsListItem {chain} />
			{/if}
		{:else}
			<ChainsListNoResults />
		{/each}
	{/if}
</div>

<style lang="postcss">
	.chain-list {
		@apply grid flex-1 grid-cols-1 items-start gap-2 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4;
	}
</style>
