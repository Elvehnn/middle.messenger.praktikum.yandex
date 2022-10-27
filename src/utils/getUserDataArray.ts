export const getUserDataArray = (user: UserType) => {
  return Object.entries(user).map(([title, data]) => {
    if (title !== 'id' && title !== 'avatar') {
      const value = data || '';
      return { title: title, data: value };
    }
  });
};
