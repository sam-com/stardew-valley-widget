<script lang="ts">
import { getWeatherAsset } from "@utils/getWeatherAsset";

  let { weather } = $props();
  let weatherSrc = $derived(getWeatherAsset(weather.weatherCode));
</script>

<img src={weatherSrc}/>