export const formatDate = (date: Date) => {
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
