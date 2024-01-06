
export const purge = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'];
export const darkMode = false;
export const theme = {
  extend: {},
};
export const variants = {
  extend: {},
};
export const plugins = [
  // eslint-disable-next-line no-undef
  require('flowbite/plugin')
];
export const content = [
  "./node_modules/flowbite/**/*.js"
];