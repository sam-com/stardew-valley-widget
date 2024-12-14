<script lang="ts">
	import { blur } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';

  import winterDay from "@assets/bg/winter_day.png";
  import winterNight from "@assets/bg/winter_night.png";
  import sprintDay from "@assets/bg/spring_day.png";
  import springNight from "@assets/bg/spring_night.png";
  import summerDay from "@assets/bg/summer_day.png";
  import summerNight from "@assets/bg/summer_night.png";
  import fallDay from "@assets/bg/fall_day.png";
  import fallNight from "@assets/bg/fall_night.png";
  
  const allBackgrounds = [winterDay,winterNight,sprintDay,springNight,summerDay,summerNight,fallDay,fallNight];

  let { daylight } = $props();
  let current = $state(0);

  $inspect(current)

  $effect(() => {
    const handle = setInterval(() => {
      current = (current + 1) % allBackgrounds.length;
    },3000);

    return () => {clearInterval(handle)}
  })

</script>

<div class="backgroundContainer">
  {#each allBackgrounds as bg,idx}
    {#if idx === current}
      <img alt="background" class="background" src={bg} transition:blur={{easing:cubicInOut, duration:2000 }} />
    {/if}
  {/each}
</div>


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