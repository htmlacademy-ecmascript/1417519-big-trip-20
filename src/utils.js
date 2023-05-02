import dayjs from 'dayjs';

const DATE_FORMAT_TIME = 'HH:mm';
const DATE_FORMAT = 'MMM D';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizePointDateTime(date) {
  return date ? dayjs(date).format(DATE_FORMAT_TIME) : '';
}

function humanizePointDateDayMonts(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

export {getRandomArrayElement,humanizePointDateTime,humanizePointDateDayMonts};
