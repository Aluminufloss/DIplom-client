import { format } from "date-fns/format";
import { isEqual } from "date-fns/isEqual";

export const isDatesEqual = (date1: Date, date2: Date) => {
  const currentDate = format(date1, "yyyy-MM-dd");
  const plannedDate = format(date2, "yyyy-MM-dd");

  return isEqual(currentDate, plannedDate);
}