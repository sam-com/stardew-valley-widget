import { writable } from 'svelte/store';
import { getMeteo, type Meteo } from '@utils/getMeteo';

export type MeteoStore = {
  data: Meteo | null;
  error: Error | null;
  loading: boolean;
};

const INITIAL_STORE: Meteo = {
  daylight: { sunrise: new Date(NaN), sunset: new Date(NaN) },
  weather: { weatherCode: 0 },
};

export const meteoStore = writable<MeteoStore>({
  data: INITIAL_STORE,
  error: null,
  loading: true,
});

export async function fetchMeteo() {
  meteoStore.set({ data: INITIAL_STORE, error: null, loading: true });
  try {
    const data = await getMeteo();
    meteoStore.set({ data, error: null, loading: false });
  } catch (err) {
    meteoStore.set({ data: null, error: err as Error, loading: false });
  }
}
