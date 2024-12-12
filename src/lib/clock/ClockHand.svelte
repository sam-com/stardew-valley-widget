<script lang="ts">
  import { getDateInterval } from "@components/getDateInterval.svelte";
  import { getClockHandRotation } from "@/utils/getClockHandRotation";
  import clockHandImg from "@assets/clock_hand.svg";

  let { daylight } = $props();
  let current = getDateInterval(1 * 60 * 1000);
  let handRotation = $derived(getClockHandRotation({current,...daylight}));
</script>

<img
  src={clockHandImg}
  class:clockHandImg
  style:transform={`rotate(${handRotation}deg)`}
  alt="Clock Hand"
/>

<style>
.clockHandImg {
  width: 100%;
  height: 100%;
  transform-origin: 50% 97.5%;
  transition: transform 2s ease-in-out;
  background-image: url("../../assets/clock_hand.svg")
}
</style>