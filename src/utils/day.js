import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

function changeLocale(value = 'vi') {
  dayjs.locale(value);
}

export function getRelativeTime(value) {
  changeLocale();
  dayjs.extend(relativeTime);
  return dayjs(value).fromNow();
}

export function getTime(value) {
  changeLocale();
  return dayjs(value).format('dd, D/M, h:mm');
}
