import { SvelteDate } from 'svelte/reactivity';

export function getDateInterval(intervalMs: number = 1000) {
  let date = new SvelteDate();

  $effect(() => {
    const timeHandler = setInterval(() => {
      date.setTime(Date.now());
    }, intervalMs);

    return () => {
      clearInterval(timeHandler);
    };
  });

  return date;
}
