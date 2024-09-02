

export function generateTimeSlots(startTime:string, endTime:string, interval:number) {
  const times = [];
  let start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);

  while (start <= end) {
      const hours = start.getHours().toString().padStart(2, '0');
      const minutes = start.getMinutes().toString().padStart(2, '0');
      times.push(`${hours}:${minutes}`);
      start.setMinutes(start.getMinutes() + interval);
  }

  return times;
}
