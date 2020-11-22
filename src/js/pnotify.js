import { error } from '@pnotify/core';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';

export const myPnotify = title => error({ title, delay: 2000 }, 200);

// const tooManyCountries = () =>
//   myPnotify('Too many matches found.Please enter a more specific query!');

// export const notFound = () =>
//   myPnotify('Not Found images for your request.Please try again');

// const somethingWentWrong = () => myPnotify('Something went wrong');

// const errorMessage = ({hits}) => {
//   hits === 0 ? notFound() : somethingWentWrong();
// };

// export default { notFound };
