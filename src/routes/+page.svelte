<script lang="ts">
	import { onMount } from 'svelte';
	import ChainsList from '$lib/components/ChainsList.svelte';
	import ChainDrawer from '$lib/components/ChainDrawer.svelte';
	import { additionalChains } from '$lib/stores';
	import type { Chain } from '@amichain/chainlist';

	onMount(() => {
		fetch('https://raw.githubusercontent.com/ava-labs/builders-hub/master/constants/l1-chains.json')
			.then((r) => r.json())
			.then((data) => {
				const normalized = data.map((chain: any) => ({
					chainId: chain.chainId,
					name: chain.chainName || 'Unknown',
					rpc: chain.rpcUrl ? [chain.rpcUrl] : [],
					ws: [],
					explorers: chain.explorers
						? chain.explorers.map((e: any) => ({
								name: e.name,
								url: e.link || e.url,
								standard: 'EIP3091'
							}))
						: [],
					nativeCurrency: {
						name: chain.tokenSymbol || 'Unknown',
						symbol: chain.tokenSymbol || 'UNK',
						decimals: 18
					},
					website: chain.website,
					icon: chain.chainLogoURI,
					testnet: false,
					faucets: [],
					...chain
				}));
				// Add MartianChain
				const martianChain: Chain = {
					chainId: 2027,
					name: 'MartianChain',
					rpc: ['https://martian-rpc1.amichain.org/'],
					ws: [],
					explorers: [
						{ name: 'MartianScan', url: 'http://explorer.martianchain.com/', standard: 'EIP3091' }
					],
					nativeCurrency: { name: 'Erol', symbol: 'EROL', decimals: 18 },
					website: 'https://martianchain.com',
					icon: 'https://martianchain.com/martian.png',
					testnet: false,
					faucets: [],
					subnetId: 'KQnyo57ynwQ5QD1xcLYySYSVxvR1yQCU3vmH7krZ6XLhZjSrV',
					slug: 'martian',
					color: '#EC6532',
					category: 'General',
					description: 'Martian is a decentralized blockchain. Martian use Erol as native token.',
					socials: { twitter: 'MartianChain' },
					chainLogoURI: 'https://martianchain.com/martian.png',
					coingeckoId: 'erol-musk',
					isActive: true
				};
				normalized.push(martianChain);
				additionalChains.set(normalized);
			});
	});
</script>

<svelte:head>
	<title>ChainList by AmiChain</title>
</svelte:head>

<ChainsList />
<ChainDrawer />
