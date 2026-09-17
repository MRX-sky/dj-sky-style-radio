export type ScheduleDay = {
  day: string;
  shows: Array<{ time: string; title: string }>;
};

/** Edit this single file to update the on-air schedule. */
export const schedule: ScheduleDay[] = [
  {
    day: "Понеділок",
    shows: [
      { time: "18:00", title: "DJ_SKY_STYLE" },
      { time: "21:00", title: "Нічний мікс" },
    ],
  },
  { day: "Вівторок", shows: [{ time: "20:00", title: "Електронна ніч" }] },
  { day: "Середа", shows: [{ time: "19:00", title: "Глибокий сигнал" }] },
  { day: "Четвер", shows: [{ time: "21:00", title: "Сесії після заходу" }] },
  { day: "П’ятниця", shows: [{ time: "20:00", title: "Вікенд-трансляція" }] },
  { day: "Субота", shows: [{ time: "22:00", title: "Клубна частота" }] },
  { day: "Неділя", shows: [{ time: "18:00", title: "Недільне перезавантаження" }] },
];
