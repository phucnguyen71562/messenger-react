import dayjs from 'dayjs';
import 'dayjs/locale/vi';

function changeLocale(value = 'vi') {
  dayjs.locale(value);
}

export function getRelativeTime(value) {
  changeLocale();
  return dayjs(value).isBefore(dayjs());
}

export function getTime(value) {
  changeLocale();
  return dayjs(value).format('dd, D/M, h:mm');
}
