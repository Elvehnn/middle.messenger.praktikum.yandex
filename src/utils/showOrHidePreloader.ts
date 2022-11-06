export const showPreloader = () => {
  document.querySelector('.preloader')?.classList.add('preloader_show');
};
export const hidePreloader = () => {
  document.querySelector('.preloader')?.classList.remove('preloader_show');
};
