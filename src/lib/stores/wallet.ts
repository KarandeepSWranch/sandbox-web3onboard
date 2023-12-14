import { writable, derived, type Readable } from 'svelte/store';

import type { OnboardAPI, WalletState } from '@web3-onboard/core';

export const onboard = writable<OnboardAPI | undefined>(undefined);

export const wallets = writable<WalletState[]>([]);

export const connectedWallet = derived(wallets, (wallets) => {
	return wallets.length > 0 ? wallets[0] : undefined;
});

export const connectedAccount = derived(connectedWallet, (wallet) => {
	return wallet?.accounts[0];
});

export const connectedAddress = derived(connectedAccount, (account) => {
	return account?.address;
});

export const onboardChain = derived(connectedWallet, (wallet) => {
	return wallet?.chains[0];
});

export const provider = derived(connectedWallet, (wallet) => {
	if (wallet) {
		return wallet.provider;
	}
});

export const connected = derived(connectedAccount, (account) => {
	return !!account;
});
