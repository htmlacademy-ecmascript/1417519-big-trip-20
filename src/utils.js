import dayjs from 'dayjs';

const DATE_FORMAT_TIME = 'HH:mm';
const DATE_FORMAT_MONTS = 'MMM D';
const DATE_FORMAT_MONTS_TIME = 'DD/MM/YY hh:mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizePointDateTime(date) {
  return date ? dayjs(date).format(DATE_FORMAT_TIME) : '';
}

function humanizePointDateDayMonts(date) {
  return date ? dayjs(date).format(DATE_FORMAT_MONTS) : '';
}

function humanizePointDateDayMontsTime(date) {
  return date ? dayjs(date).format(DATE_FORMAT_MONTS_TIME) : '';
}

export {getRandomArrayElement,humanizePointDateTime,humanizePointDateDayMonts,humanizePointDateDayMontsTime};
