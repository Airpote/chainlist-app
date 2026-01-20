<script lang="ts">
	import { filters } from '$lib/stores';
	import SearchIcon from 'virtual:icons/hugeicons/search-01';
	import CloseIcon from 'virtual:icons/hugeicons/cancel-01';

	let className = '';
	export { className as class };
</script>

<div class="input input-bordered relative flex items-center gap-2 rounded-full !pr-0 {className}">
	<input type="text" class="grow" placeholder="Search" bind:value={$filters.query} />
	{#if $filters.query.length}
		<button
			class="btn btn-circle btn-ghost absolute right-12"
			on:click={() => ($filters.query = '')}
		>
			<CloseIcon class="" />
		</button>
	{/if}
	<button class="btn btn-circle btn-ghost">
		<SearchIcon class="text-xl" />
	</button>
</div>
