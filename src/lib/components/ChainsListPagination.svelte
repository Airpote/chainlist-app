<script lang="ts">
	export let page = 1;
	export let totalPages = 1;
	export let onPageChange: (page: number) => void;

	const goTo = (next: number) => {
		if (next < 1 || next > totalPages || next === page) return;
		onPageChange(next);
	};

	$: pages = (() => {
		if (totalPages <= 7) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const items: (number | 'ellipsis')[] = [1];
		if (page > 3) items.push('ellipsis');

		const start = Math.max(2, page - 1);
		const end = Math.min(totalPages - 1, page + 1);
		for (let i = start; i <= end; i++) items.push(i);

		if (page < totalPages - 2) items.push('ellipsis');
		items.push(totalPages);
		return items;
	})();
</script>

{#if totalPages > 1}
	<nav class="pagination" aria-label="Chain list pages">
		<button class="btn btn-sm btn-outline" disabled={page <= 1} on:click={() => goTo(page - 1)}>
			Previous
		</button>

		<div class="pages">
			{#each pages as item}
				{#if item === 'ellipsis'}
					<span class="ellipsis">…</span>
				{:else}
					<button
						class="btn btn-sm {item === page ? 'btn-primary' : 'btn-ghost'}"
						on:click={() => goTo(item)}
					>
						{item}
					</button>
				{/if}
			{/each}
		</div>

		<button
			class="btn btn-sm btn-outline"
			disabled={page >= totalPages}
			on:click={() => goTo(page + 1)}
		>
			Next
		</button>
	</nav>
{/if}

<style lang="postcss">
	.pagination {
		@apply flex flex-wrap items-center justify-center gap-2 py-6;
	}
	.pages {
		@apply flex flex-wrap items-center gap-1;
	}
	.ellipsis {
		@apply px-2 text-base-content/60;
	}
</style>
