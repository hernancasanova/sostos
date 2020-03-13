import { LOCALE_SET } from './types';

/* export const setLocale = lang => ({
  type: LOCALE_SET,
  payload: lang
}); */

const setLocale = lang => ({
  type: LOCALE_SET,
  payload: lang
});

export { setLocale };
