<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { currentChain, llamaChains, states } from '$lib/stores';
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import WalletNotDetected from '$lib/layout/WalletNotDetected.svelte';
	import BackToTopButton from '$lib/layout/BackToTopButton.svelte';
	let { children } = $props();

	onMount(async () => {
		$currentChain = null;
		try {
			$llamaChains = await fetch('https://api.llama.fi/v2/chains').then((res) => res.json());
		} catch (e) {
			/**/
		}
		$states.loadingTvls = false;
	});
</script>

<svelte:head>
	<script type="application/javascript">
		window.addEventListener('DOMContentLoaded', function () {
			const matchMedia = window.matchMedia('(prefers-color-scheme: light)');
			const preferredTheme = matchMedia.matches
				? 'light'
				: (localStorage.getItem('theme') ?? 'dark');
			document.body.setAttribute('data-theme', preferredTheme ?? 'dark');
			matchMedia.onchange = () => {
				const newTheme = matchMedia.matches ? 'light' : 'dark';
				localStorage.setItem('theme', newTheme);
				document.body.setAttribute('data-theme', newTheme);
			};
		});
	</script>
</svelte:head>

<div class="flex min-h-screen w-screen flex-col">
	<Header />
	<div class="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col px-4 pb-4">
		{@render children()}
	</div>
	<Footer />
	<WalletNotDetected />
	<BackToTopButton />
</div>
