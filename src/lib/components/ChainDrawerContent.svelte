<script lang="ts">
	import { currentChain } from '$lib/stores';
	import ClipboardCopyBtn from '$lib/components/ClipboardCopyBtn.svelte';
	import ExternalIcon from 'virtual:icons/hugeicons/link-square-01';

	let rows: { name: string; value: string; type?: string }[] = [];
	$: rows = $currentChain
		? [
				{ name: 'Name', value: [$currentChain.name] },
				{ name: 'ID', value: [$currentChain.chainId] },
				{
					name: 'RPC Url' + ($currentChain.rpc?.length > 1 ? 's' : ''),
					value: $currentChain.rpc
				},
				{
					name: 'WebSocket Url' + ($currentChain.ws?.length > 1 ? 's' : ''),
					value: $currentChain.ws
				},
				{ name: 'Explorers', value: $currentChain.explorers, type: 'links' },
				...($currentChain.testnet ? [{ name: 'Faucets', value: $currentChain.faucets }] : [])
			]
		: [];
</script>

<div class="flex w-full flex-col p-4">
	{#each rows as row}
		{#if Array.isArray(row.value) && row.value.length}
			<div class="mb-2 flex justify-between gap-4">
				<div class="min-w-[120px] py-1">{row.name}</div>
				<div class="flex max-w-[calc(100%-140px)] flex-1 flex-col">
					{#if row.type === 'links'}
						{#each row.value as value}
							<a href={value.url} target="_blank" class="row-value hover:link">
								<span>{value.name}</span>
								<ExternalIcon />
							</a>
						{/each}
					{:else}
						{#each row.value as value}
							<div class="row-value">
								<span>{value}</span>
								<ClipboardCopyBtn {value} />
							</div>
						{/each}
					{/if}
				</div>
			</div>
		{/if}
	{/each}
</div>

<style lang="postcss">
	.row-value {
		@apply ml-auto flex max-w-full items-center justify-end gap-3 px-2 py-1;
	}
	.row-value:hover {
		@apply link;
	}
	.row-value span {
		@apply overflow-hidden text-ellipsis whitespace-nowrap;
	}
</style>
