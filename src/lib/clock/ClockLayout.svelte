<script lang="ts">
  import clockImg from "@assets/clock.svg";

  let { date, hand, weather, season, time } = $props();
</script>

<div class="clockWrapper">
  <div class="slot dateSlot">{@render date()}</div>
  <div class="handSlot">{@render hand()}</div>
  <div class="slot weatherSlot">{@render weather()}</div>
  <div class="slot seasonSlot">{@render season()}</div>
  <div class="slot timeSlot">{@render time()}</div>
  <img src={clockImg} class="clockImg" alt="clockImg" />
</div>

<style>
  .clockWrapper {
    position: relative;
    aspect-ratio: 61/50;
    display: flex;
    min-width: 400px;
  }

  .slot {
    container-type: inline-size;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 1;
  }

  .dateSlot {
    inset: 6% 37%;
    width: 56%;
    height: 19%;
  }

  .handSlot {
    position: absolute;
    inset: 5.75% 27%;
    height: 28%;
    width: fit-content;
  }

  .timeSlot {
    inset: 44% 37%;
    width: 56%;
    height: 19%;
  }

  .weatherSlot {
    inset: 27% 40.25%;
    width: 16.75%;
    height: 13.75%;
  }

  .seasonSlot {
    inset: 27% 73.5%;
    width: 16.75%;
    height: 13.75%;
  }

  .clockImg {
    width: 100%;
    height: 100%;
  }
</style>