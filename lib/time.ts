// Booking times are Paris times, wherever the visitor is: the team works in
// France. The API stores times in UTC (ISO strings). These helpers turn the day
// and the hour chosen in the wizard into the right moment.
// (The same conversion as maidmatch-admin/lib/time.ts.)
export const BUSINESS_TIME_ZONE = "Europe/Paris";

type Parts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

const partsFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: BUSINESS_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

// The calendar date and the wall-clock time in Paris at a given moment.
export function parisParts(date: Date): Parts {
  const values: Record<string, number> = {};
  for (const part of partsFormatter.formatToParts(date)) {
    if (part.type !== "literal") {
      values[part.type] = Number(part.value);
    }
  }
  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
    second: values.second,
  };
}

// How far Paris is ahead of UTC at a given moment, in milliseconds.
function parisOffsetMs(timestamp: number): number {
  const p = parisParts(new Date(timestamp));
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return asUtc - Math.floor(timestamp / 1000) * 1000;
}

// "2026-07-15" and "09:00" typed as Paris time give "2026-07-15T07:00:00.000Z".
export function parisWallTimeToIso(dateYmd: string, timeHm: string): string {
  const [year, month, day] = dateYmd.split("-").map(Number);
  const [hour, minute] = timeHm.split(":").map(Number);
  const wallAsUtc = Date.UTC(year, month - 1, day, hour, minute);
  let timestamp = wallAsUtc - parisOffsetMs(wallAsUtc);
  // A second pass gives the right answer on the days the clocks change.
  timestamp = wallAsUtc - parisOffsetMs(timestamp);
  return new Date(timestamp).toISOString();
}

// The calendar day a visitor clicked, as "YYYY-MM-DD". The wizard keeps days as
// local midnights, or as their ISO text after the page is reloaded.
export function ymdOf(day: Date | string): string {
  const d = new Date(day);
  return [
    String(d.getFullYear()),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}
