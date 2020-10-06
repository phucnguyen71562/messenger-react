import moment from 'moment';
import 'moment/locale/vi';

function changeLocale(value = 'vi') {
  moment.locale(value);
}

export function getRelativeTime(value) {
  changeLocale();
  return moment(value).fromNow();
}

export function getTime(value) {
  changeLocale();
  return moment(value).format('dd, D/M, h:mm');
}
