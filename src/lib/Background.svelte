<script lang="ts">
	import { blur } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';

  // import bgDay from "@assets/bg_day.svg";
  // import bgNight from "@assets/bg_night.svg";
  import bgDay from "@assets/bg/winter_day.png";
  import bgNight from "@assets/bg/winter_night.png";
  
  import { getDateInterval } from "@components/getDateInterval.svelte";
  import { isNightTime } from "@utils/daylight";

  let { daylight } = $props();
  let current = getDateInterval(1000);
  // let isNight = $derived(isNightTime({current, ...daylight}));
  let isNight = $state(false);

</script>

<div class="backgroundContainer">
  {#if isNight}
    {@render background(bgNight)}
  {:else}
    {@render background(bgDay)}
  {/if}
  <label>
    <input type="checkbox" bind:checked={isNight} />
    Toggle Night
  </label>
</div>

{#snippet background(src)}
  <img alt="background" class="background" src={src} transition:blur={{easing:cubicInOut, duration:2000 }} />
{/snippet}

<style>
  .backgroundContainer {
    position: fixed;
    display:grid;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .background {
    object-fit: cover;
    object-position: left;
    height:100%;
    grid-area: 1/1/2/2;
  }
</style>