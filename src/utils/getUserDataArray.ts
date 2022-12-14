export const getUserDataArray = (user: UserType) => {
  return Object.entries(user)
    .map(([title, data]) => {
      if (title !== 'id' && title !== 'avatar') {
        const value = data || 'not defined';
        return { title, data: value };
      }

      return null;
    })
    .filter((item) => Boolean(item));
};
