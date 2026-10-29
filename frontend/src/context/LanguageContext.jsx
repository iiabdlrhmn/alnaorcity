import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      home: 'Home',
      products: 'Our Products',
      company: 'Our Company',
      contacts: 'Contacts',
      ourPeople: 'Our People',
      languageLabel: 'Language',
    },
    hero: {
      dragHint: 'Drag the tea tin around!',
      returningHint: 'Returning to place...',
      slides: [
        {
          id: 0,
          enTitle: 'Iraqi Roots. Global Reach.',
          arTitle: 'جذور عراقية . وصول عالمي',
        },
        {
          id: 1,
          enTitle: 'Every Selected Tea Leaf Defines The Quality.',
          arTitle: 'كل ورقة شاي مختارة تصنع فرق الجودة',
        },
        {
          id: 2,
          enTitle: 'Al-Khan Tea — Royal Taste.',
          arTitle: 'شاي الخان — مذاق ملكي أصيل',
        },
      ],
    },
    footer: {
      companyName: 'Al-Naour City General Trading Company Ltd.',
      address: 'Iraq - Baghdad - Jamila Industrial Area - Hussainiyat al-Ansar Street',
      emails: [
        'info@alnaorcity.com',
        'alibshat4@gmail.com',
        'riyadhugla@gmail.com',
      ],
      website: 'www.alnaorcity.com',
      mapLink: 'https://maps.app.goo.gl/hhYrfi12DvVRPVjs5',
      openMap: 'Open in Google Maps',
      copyright: '2026© Al-Naour City All Rights Reserved.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      products: 'منتجاتنا',
      company: 'شركتنا',
      contacts: 'اتصل بنا',
      ourPeople: 'فريقنا',
      languageLabel: 'اللغة',
    },
    hero: {
      dragHint: 'اسحب علبة الشاي وحركها!',
      returningHint: 'تعود إلى مكانها...',
      slides: [
        {
          id: 0,
          enTitle: 'Iraqi Roots. Global Reach.',
          arTitle: 'جذور عراقية . وصول عالمي',
        },
        {
          id: 1,
          enTitle: 'Every Selected Tea Leaf Defines The Quality.',
          arTitle: 'كل ورقة شاي مختارة تصنع فرق الجودة',
        },
        {
          id: 2,
          enTitle: 'Al-Khan Tea — Royal Taste.',
          arTitle: 'شاي الخان — مذاق ملكي أصيل',
        },
      ],
    },
    footer: {
      companyName: 'شركة مدينة الناعور للتجارة العامة المحدودة',
      address: 'العراق - بغداد - منطقة جميلة الصناعية - شارع حسينية الأنصار',
      emails: [
        'info@alnaorcity.com',
        'alibshat4@gmail.com',
        'riyadhugla@gmail.com',
      ],
      website: 'www.alnaorcity.com',
      mapLink: 'https://maps.app.goo.gl/hhYrfi12DvVRPVjs5',
      openMap: 'افتح في خرائط كوكل',
      copyright: '2026© Al-Naour City All Rights Reserved.',
    },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

