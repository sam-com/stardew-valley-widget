<script lang="ts">
  import ClockLayout from "./ClockLayout.svelte";
  import ClockHand from "./ClockHand.svelte";
  import Weather from "./Weather.svelte";
  import { getDateInterval } from "@components/getDateInterval.svelte";
  import { toDateString, toTimeString } from "@utils/time";
  import winter from "@assets/seasons/winter.svg";

  let { meteo } = $props();
  let currentDate = getDateInterval(1000);
  let dateStr = $derived(toDateString(currentDate));
  let timeStr = $derived(toTimeString(currentDate));
</script>

<ClockLayout {date} {hand} {weather} {season} {time}/>

{#snippet date()}
  <p class="stardewFont">{dateStr}</p>
{/snippet}

{#snippet hand()}
  <ClockHand daylight={meteo.daylight}/>
{/snippet}

{#snippet weather()}
  <Weather weather={meteo.weather}/>
{/snippet}

{#snippet season()}
  <img src={winter} />
{/snippet}

{#snippet time()}
  <p class="stardewFont">{timeStr}</p>
{/snippet}

<style>
  .stardewFont {
    font-family: 'Stardew Valley';
    letter-spacing: 4px;
    font-size: 20cqw;
    font-weight: bold;
  }
</style>