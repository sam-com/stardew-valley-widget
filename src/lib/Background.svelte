<script lang="ts">
  import { blur } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";

  import winterDay from "@assets/bg/winter_day.png";
  import winterNight from "@assets/bg/winter_night.png";
  import sprintDay from "@assets/bg/spring_day.png";
  import springNight from "@assets/bg/spring_night.png";
  import summerDay from "@assets/bg/summer_day.png";
  import summerNight from "@assets/bg/summer_night.png";
  import fallDay from "@assets/bg/fall_day.png";
  import fallNight from "@assets/bg/fall_night.png";
  import { isNightTime } from "@/utils/daylight";
  import { getDateInterval } from "./getDateInterval.svelte";
  import type { Meteo } from "@/utils/getMeteo";

  const allBackgrounds = [
    winterDay,
    winterNight,
    sprintDay,
    springNight,
    summerDay,
    summerNight,
    fallDay,
    fallNight,
  ];

  interface BackgroundProps {
    meteo: Meteo;
  }

  let { meteo }: BackgroundProps = $props();
  let current = getDateInterval(10000);
  let isNight = $derived(isNightTime({ current, ...meteo.daylight }));
  let season = $derived(meteo.weather.season * 2 + +isNight);
  // let season = $state(0);

  // $effect(() => {
  //   const handle = setInterval(() => {
  //     season = (season + 1) % allBackgrounds.length;
  //   }, 10000);

  //   return () => {
  //     clearInterval(handle);
  //   };
  // });
</script>

<div class="backgroundContainer">
  {#each allBackgrounds as bg, idx}
    {#if idx === season}
      {@render background(bg)}
    {/if}
  {/each}
</div>

{#snippet background(bg: string)}
  <img
    alt="background"
    class="background"
    src={bg}
    transition:blur={{ easing: cubicInOut, duration: 3000 }}
  />
{/snippet}

<style>
  .backgroundContainer {
    position: fixed;
    display: grid;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    animation: slide 20s linear infinite alternate;
  }

  .background {
    object-fit: cover;
    object-position: inherit;
    height: 100%;
    grid-area: 1/1/2/2;
  }

  @keyframes slide {
    0% {
      object-position: left center;
    }

    100% {
      object-position: right center;
    }
  }
</style>
