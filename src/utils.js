import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

const MSEC_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MSEC_IN_SEC;
const MSEC_IN_DAY = HOUR_IN_DAY * MSEC_IN_HOUR;

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

function getPointDuration(dateFrom,dateTo){
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));

  let pointDuration = 0;

  switch(true) {
    case (timeDiff >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
      break;
    case (timeDiff >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('HH[H] mm[M]');
      break;
    case (timeDiff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
      break;
  }
  return pointDuration;
}

export {getRandomArrayElement,humanizePointDateTime,humanizePointDateDayMonts,humanizePointDateDayMontsTime,getPointDuration};
