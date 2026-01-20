<script lang="ts">
	import { states } from '$lib/stores';
	import Logo from '$lib/layout/Logo.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import HeaderSearch from '$lib/layout/HeaderSearch.svelte';
	import HeaderFilters from '$lib/layout/HeaderFilters.svelte';
	import HeaderSearchInput from '$lib/layout/HeaderSearchInput.svelte';
</script>

<div class="navbar sticky top-0 z-10 border-b border-base-content/10 bg-base-200">
	<div class="navbar-start gap-8">
		<a href="/" class="flex items-center gap-2 text-xl font-bold sm:text-2xl">
			<Logo />
			<span>Chainlist</span>
		</a>
	</div>
	<div class="navbar-center ml-auto mr-4 sm:mx-0">
		<HeaderSearch />
	</div>
	<div class="navbar-end w-auto justify-end gap-4 sm:w-1/2">
		<HeaderFilters />
		<ThemeSwitcher />
	</div>
</div>

{#if $states.isMobileSearchOpen}
	<div
		class="sticky left-0 top-16 block w-full border-y border-base-content/10 bg-base-200 p-4 sm:hidden"
	>
		<HeaderSearchInput />
	</div>
{/if}

<style lang="postcss">
	.navbar-start {
		padding-left: calc((100dvw - 1520px) / 2);
	}
	.navbar-end {
		padding-right: calc((100dvw - 1520px) / 2);
	}
</style>
