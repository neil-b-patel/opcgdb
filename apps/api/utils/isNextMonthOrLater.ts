const isNextMonthOrLater = (isoDate: string): boolean => {
  const date = new Date(isoDate);
  const currentDate = new Date();

  if (currentDate.getFullYear() > date.getFullYear()) {
    return true;
  }

  if (currentDate.getFullYear() === date.getFullYear()) {
    if (currentDate.getMonth() > date.getMonth()) {
      return true;
    }

    if (currentDate.getMonth() === date.getMonth()) {
      if (currentDate.getDate() > date.getDate()) {
        return true;
      }
    }
  }

  return false;
};

export default isNextMonthOrLater;
