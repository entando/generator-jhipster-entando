import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import locales from 'i18n/locales';

const defaultNs = 'translation';

// adds the default namespace ('translation') to resources object per i18next documentation
const resources = Object.keys(locales).reduce(
  (acc, lang) => ({ ...acc, [lang]: { [defaultNs]: locales[lang] } }),
  {}
);

export const translateFn = i18next.t;

export const setI18nextLocale = (locale, defaultLocale) => {
  i18next.use(initReactI18next).init({
    defaultNs,
    interpolation: {
      escapeValue: false,
    },
    resources,
    lng: locale || defaultLocale,
    fallbackLng: defaultLocale,
    react: { useSuspense: false },
  });
};
