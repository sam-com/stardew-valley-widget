export enum Season {
  Winter,
  Spring,
  Summer,
  Fall,
}

interface SeasonRange {
  month: number;
  day: number;
}

const seasons: { name: Season; start: SeasonRange; end: SeasonRange }[] = [
  {
    name: Season.Winter,
    start: { month: 12, day: 21 },
    end: { month: 3, day: 20 },
  },
  {
    name: Season.Spring,
    start: { month: 3, day: 21 },
    end: { month: 6, day: 20 },
  },
  {
    name: Season.Summer,
    start: { month: 6, day: 21 },
    end: { month: 9, day: 20 },
  },
  {
    name: Season.Fall,
    start: { month: 9, day: 21 },
    end: { month: 12, day: 20 },
  },
];

const isDateInRange = (date: Date, start: SeasonRange, end: SeasonRange) => {
  const currentYear = date.getFullYear();
  const startDate = new Date(currentYear, start.month - 1, start.day);
  const endDate = new Date(currentYear, end.month - 1, end.day);

  // Handle wrap-around seasons (e.g., Winter spans Dec–Mar)
  if (start.month > end.month) {
    return date >= startDate || date <= endDate;
  }
  return date >= startDate && date <= endDate;
};

export function getSeason(date = new Date()): Season {
  return (
    seasons.find(({ start, end }) => isDateInRange(date, start, end))?.name ??
    Season.Winter
  );
}
