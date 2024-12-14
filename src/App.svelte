<script lang="ts">
  import { onMount } from "svelte";

  import Background from "@components/Background.svelte";
  import Clock from "@components/clock/Clock.svelte";
  import { fetchMeteo, meteoStore } from "@stores/meteoStore.svelte";

  onMount(() => fetchMeteo());

  const meteo = $derived($meteoStore.data);
</script>

<main class="mainContainer">
  {#if $meteoStore.error}
    <p>Error: {$meteoStore.error.message}</p>
  {:else}
    <Background {meteo} />
    <Clock {meteo} />
  {/if}
</main>

<style>
  .mainContainer {
    display: flex;
    justify-content: flex-end;
    margin: 5%;
  }
</style>
