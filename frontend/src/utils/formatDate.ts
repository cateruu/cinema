export const formatScheduleDate = (date: Date) => {
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();

  if (+day < 10) {
    day = `0${day}`;
  }

  if (+month < 10) {
    month = `0${month}`;
  }

  return `${day}/${month}`;
};

export const formatTicketDate = (date: Date) => {
  let day = date.getDate().toString();
  let month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();

  if (+day < 10) {
    day = `0${day}`;
  }

  if (+month < 10) {
    month = `0${month}`;
  }

  if (+hours < 10) {
    hours = `0${hours}`;
  }

  if (+minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${
    month.slice(0, 1).toUpperCase() + month.slice(1)
  } ${year} ${hours}:${minutes}`;
};
