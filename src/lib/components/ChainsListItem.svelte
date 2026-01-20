<script lang="ts">
	import { currentChain } from '$lib/stores';
	import ChainLogo from '$lib/components/ChainLogo.svelte';

	export let chain: Chain;
</script>

{#if chain}
	<button class="chain-item" on:click={() => ($currentChain = chain)}>
		<div class="icon">
			{#key chain}
				<ChainLogo {chain} />
			{/key}
		</div>
		<div class="flex flex-col">
			<span class="name">{chain.name}</span>
			<span class="text-sm">Chain ID {chain.chainId}</span>
		</div>
	</button>
{/if}

<style lang="postcss">
	.chain-item {
		@apply flex flex-col items-center gap-4 rounded-2xl border-2 border-base-content/10 bg-black/10 p-4 py-6 transition-all;
	}
	.chain-item:hover {
		@apply scale-105 border-base-content bg-base-300;
	}
	.chain-item .name {
		@apply text-xl font-medium;
	}
</style>
