import { wallets as storedWallets } from '$lib/stores/wallet';

import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'

const chains = [
    {
        id: 42161,
        token: 'ARB-ETH',
        label: 'Arbitrum One',
        rpcUrl: 'https://rpc.ankr.com/arbitrum'
    },
    {
        id: '0xa4ba',
        token: 'ARB',
        label: 'Arbitrum Nova',
        rpcUrl: 'https://nova.arbitrum.io/rpc'
    },
    {
        id: 137,
        token: 'MATIC',
        label: 'Matic Mainnet',
        rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    },
    {
        id: '0x2105',
        token: 'ETH',
        label: 'Base',
        rpcUrl: 'https://mainnet.base.org'
    }
]

export const setupWallet = () => {
    const injected = injectedModule()
    const wallets = [injected]

    const onboard = Onboard({
        wallets,
        chains,
        accountCenter: {
            desktop: {
                enabled: true,
                position: 'topRight',
                minimal: false
            },
            mobile: {
                enabled: true,
                position: 'topRight'
            },
        },
        containerElements: {
            accountCenter: '#wallet-account-center'
        }
    })

    onboard.state.select('wallets').subscribe((updated) => {
		storedWallets.set(updated);
	});

    return onboard;
}