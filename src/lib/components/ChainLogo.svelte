<script lang="ts">
	import Lazy from 'svelte-lazy';
	import ChainLogoPlaceHolder from '$lib/components/ChainLogoPlaceHolder.svelte';
	import ChainLogoPreloader from '$lib/components/ChainLogoPreloader.svelte';
	import type { Chain } from '@amichain/chainlist';
	import { onMount } from 'svelte';
	export let chain: Chain;
	export let size = 128;

	let src;
	let noImg = false;
	const loadImg = () => {
		const iconUrl =
			chain.icon && chain.icon.startsWith('http')
				? chain.icon
				: chain.icon
					? `https://cdn.jsdelivr.net/gh/Amichain/chain-icons/${chain.icon.split('.')[1]}/${chain.icon}`
					: null;
		if (iconUrl) {
			const img = new Image();
			img.src = iconUrl;
			img.onload = () => {
				src = img.src;
			};
			img.onerror = () => {
				noImg = true;
			};
		} else {
			noImg = true;
		}
	};

	onMount(() => {
		if (chain) loadImg();
	});
</script>

{#if !noImg}
	<Lazy
		placeholder={ChainLogoPreloader}
		placeholderProps={{ size }}
		height="{size}px"
		width="{size}px"
		keep={true}
		fade={{ delay: 0, duration: 200 }}
		onload={loadImg}
	>
		{#if src}
			<img
				{src}
				alt="Chain #{chain.chainId} icon"
				height={size}
				width={size}
				loading="lazy"
				decoding="async"
			/>
		{:else}
			<ChainLogoPlaceHolder {size} />
		{/if}
	</Lazy>
{:else}
	<ChainLogoPlaceHolder {size} />
{/if}

<style lang="postcss">
	:global(.svelte-lazy-content img) {
		@apply object-contain;
	}
</style>
