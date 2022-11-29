export const dateToLocaleString = (date: string): string => {
  try {
    return new Date(date).toLocaleString('en-GB', {
      hour12: false,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: 'numeric',
    });
  } catch (error) {
    return date;
  }
};
