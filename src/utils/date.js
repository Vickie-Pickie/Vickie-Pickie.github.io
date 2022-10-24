import dayjs from 'dayjs';

export const getTimeFromTs = (ts) => {
  return dayjs.unix(ts).format('HH:mm');
};

export const getDateFromTs = (ts) => {
  return dayjs.unix(ts).format('DD.MM.YYYY');
};

export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const restSeconds = seconds - 3600 * hours;
  let minutes = Math.floor(restSeconds / 60);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
};

export const formatDurationText = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const restSeconds = seconds - 3600 * hours;
  let minutes = Math.floor(restSeconds / 60);
  return [hours, minutes];
};

export const morph = (int, array) => {
  return int + ' ' + array[(int % 100 > 4 && int % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(int % 10 < 5) ? int % 10 : 5]];
};

export const transformMinutesToHours = (min) => {
  let hours = Math.floor(min / 60);
  let restMinutes = min - hours * 60;

  if (hours < 10 ) {
    hours = `0${hours}`;
  }

  if (restMinutes < 10) {
    restMinutes = `0${restMinutes}`
  }

  return `${hours}:${restMinutes}`;
};
