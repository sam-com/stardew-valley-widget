<script lang="ts">
	import { blur } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';

  // import bgDay from "@assets/bg_day.svg";
  // import bgNight from "@assets/bg_night.svg";
  import winterDay from "@assets/bg/winter_day.png";
  import winterNight from "@assets/bg/winter_night.png";
  import sprintDay from "@assets/bg/spring_day.png";
  import springNight from "@assets/bg/spring_night.png";
  
  import { getDateInterval } from "@components/getDateInterval.svelte";
  import { isNightTime } from "@utils/daylight";
  import { SvelteDate } from 'svelte/reactivity';
  import { untrack } from 'svelte';

  const allBg = [winterDay,winterNight,sprintDay,springNight];

  let { daylight } = $props();
  let currentDate = getDateInterval(2000);
  let previous = $state(false);
  let idx = $state(0);
  // let isNight = $derived(isNightTime({current, ...daylight}));
  let isNight = $derived.by(() => {
    if(currentDate.getTime()) {
      // previous = !previous;
      untrack(() => {
      previous = !previous;
      idx = idx + 1 % allBg.length});
      return allBg[idx]
    }
  })

</script>

<div class="backgroundContainer">
  {#if previous}
    {@render background(isNight)}
  {:else}
    {@render background(isNight)}
  {/if}
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