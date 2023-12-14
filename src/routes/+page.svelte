<script lang="ts">
    import { onMount } from "svelte";
    import { setupWallet } from "$lib/wallet";
    import { onboard, connected } from "$lib/stores/wallet";

    let connecting = false;

    const connect = async () => {
        console.log("CONNECT", $onboard);
        connecting = true;
        await $onboard?.connectWallet();
        connecting = false;
    }

    onMount(() => {
        onboard.set(setupWallet());
    });
</script>

<div class="app">
    <p>Connected: {$connected}</p>
    {#if !$connected}
        <button on:click={connect}>{connecting ? 'CONNECTING...' : 'CONNECT'}</button>
    {/if}
    <div
        id="wallet-account-center"
    />
</div>

<style>
    .app {
        background-color: black;
        color: white;
        display: grid;
        place-items: center;
        height: 100vh;
        width: 100vw;
    }
</style>
