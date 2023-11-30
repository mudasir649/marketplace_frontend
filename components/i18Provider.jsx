
import React from 'react';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import enTranslation from '../locales/en.json';
import deTranslation from '../locales/de.json';
import frTranslation from '../locales/fr.json';
import esTranslation from '../locales/es.json';
import itTranslation from '../locales/it.json';

i18n.use(initReactI18next).init({
  resources: {
    EN: { translation: enTranslation },
    ES: { translation: esTranslation },
    DE: { translation: deTranslation },
    FR: { translation: frTranslation },
    IT: { translation: itTranslation },
    
  },
  lng: 'DE', 
  fallbackLng: 'DE',
  interpolation: { escapeValue: false },
});

const I18nProvider = ({ children }) => {
  return <>{children}</>;
};

export default I18nProvider;
