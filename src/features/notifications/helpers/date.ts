import { subDays, subMonths } from "date-fns";

export const getWeekEnd = () => {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  return `${today.toISOString().split("T")[0]}T23:59:59`;
};

export const getWeekStart = () => {
  const today = new Date();
  today.setDate(today.getDate() - 7);
  return `${today.toISOString().split("T")[0]}T00:00:00`;
};

export const getMonthStart = () => {
  const startOfMonth = subMonths(subDays(getWeekStart(), 1), 1);
  return `${startOfMonth.toISOString().split("T")[0]}T00:00:00`;
};

export const getMonthEnd = () => {
  const monthEnd = subDays(getWeekStart(), 1);

  return `${monthEnd.toISOString().split("T")[0]}T23:59:59`;
};

console.log("week start", getWeekStart());
