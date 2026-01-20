<script lang="ts">
	import { currentChain } from '$lib/stores';
	import ChainDrawerHeader from '$lib/components/ChainDrawerHeader.svelte';
	import ChainDrawerContent from '$lib/components/ChainDrawerContent.svelte';
</script>

<div class="drawer">
	<input type="checkbox" class="drawer-toggle hidden" bind:checked={$currentChain} />
	<div class="drawer-side z-20">
		<button class="drawer-overlay" aria-label="Close" on:click={() => ($currentChain = null)}
		></button>
		<div class="drawer-content">
			{#if $currentChain}
				<ChainDrawerHeader />
				<ChainDrawerContent />
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.drawer-content {
		@apply flex h-screen w-screen max-w-lg flex-col overflow-y-auto overflow-x-hidden border-r border-base-content/20 bg-base-100;
	}
</style>
