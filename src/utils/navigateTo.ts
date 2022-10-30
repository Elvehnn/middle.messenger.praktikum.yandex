export const navigateTo = (path: string) => {
  window.router.go(`/${path}`);
};

export const navigateBack = () => {
  window.router.back();
};
