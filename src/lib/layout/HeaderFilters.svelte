<script lang="ts">
	import { filters, states } from '$lib/stores';
	import utils from '$lib/utils';
	import FilterIcon from 'virtual:icons/hugeicons/filter';
	import ChevronDownIcon from 'virtual:icons/hugeicons/arrow-down-01';
	import ChevronUpIcon from 'virtual:icons/hugeicons/arrow-up-01';
	import CloseIcon from 'virtual:icons/hugeicons/cancel-01';
</script>

<div>
	<button
		class="btn btn-circle btn-ghost"
		on:click={() => ($states.isFiltersOpen = !$states.isFiltersOpen)}
	>
		<FilterIcon class="text-2xl" />
	</button>

	<div class="drawer drawer-end z-20">
		<input
			id="filters-drawer"
			type="checkbox"
			class="drawer-toggle"
			bind:checked={$states.isFiltersOpen}
		/>
		<div class="drawer-side">
			<button
				class="drawer-overlay"
				aria-label="Close"
				on:click={() => ($states.isFiltersOpen = false)}
			></button>
			<div class="flex min-h-full flex-col border-l border-base-content/20 bg-base-200">
				<div class="flex items-center gap-4 bg-base-300 p-4">
					<div class="mr-auto text-center text-xl font-medium">Filters</div>
					<button class="btn btn-outline btn-xs" on:click={utils.resetFilters}>Reset</button>
					<button class="btn btn-circle sm:hidden" on:click={() => ($states.isFiltersOpen = false)}>
						<CloseIcon class="text-2xl" />
					</button>
				</div>

				<div class="drawer-content">
					<label class="label">
						<span class="label-text">Include testnet</span>
						<input type="checkbox" class="toggle" bind:checked={$filters.testnet} />
					</label>
					<label class="label">
						<span class="label-text">Include chains without explorer</span>
						<input type="checkbox" class="toggle" bind:checked={$filters.noExplorer} />
					</label>
					<label class="label">
						<span class="label-text">Include chains without website</span>
						<input type="checkbox" class="toggle" bind:checked={$filters.noWebsite} />
					</label>
					<label class="form-control w-full flex-row items-center justify-between p-1">
						<span class="label-text">Order by</span>
						<span class="flex items-center gap-1">
							<select class="input select select-bordered select-sm" bind:value={$filters.orderBy}>
								<option value="chainId" selected>Chain ID</option>
								<option value="name">Name</option>
								<option value="tvl">TVL</option>
							</select>
							<button
								class="btn btn-outline input btn-sm bg-base-100"
								on:click={() => ($filters.order = $filters.order === 'asc' ? 'desc' : 'asc')}
							>
								{#if $filters.order === 'asc'}
									<ChevronDownIcon />
								{:else}
									<ChevronUpIcon />
								{/if}
							</button>
						</span>
					</label>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.drawer-content {
		@apply flex flex-col gap-2 p-4;
	}
	.drawer-content .label {
		@apply flex cursor-pointer items-center gap-4;
	}
	.drawer-content .label-text {
		@apply text-base !important;
	}
	.drawer-content .input {
		@apply border border-base-content/50 !important;
	}
</style>
