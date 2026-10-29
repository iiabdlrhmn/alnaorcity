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
    ourPeoplePage: {
      badge: 'EST. 1997 • BAGHDAD, IRAQ',
      heroTitle: 'Our Company, Heritage & Vision',
      heroSubtitle:
        'From a pioneering wholesale trading office in Jamila Industrial Area to a leading regional builder of iconic consumer brands.',
      stats: [
        { value: '1997', label: 'Founded as Sayed Ugla Office' },
        { value: '2021', label: 'Official FMCG & Al-Khan Launch' },
        { value: '4+', label: 'Core Food & Beverage Categories' },
        { value: '100%', label: 'Commitment to Quality' },
      ],
      historySection: {
        tag: 'OUR HISTORY',
        title: 'Company History',
        photoCaption: 'Archival Film Photograph • Jamila Industrial Area Warehouse (1997)',
        photoBadge: 'KODAK COLORPLUS 200 • ARCHIVE',
        milestones: [
          {
            year: '1997',
            label: 'Foundation',
            text: 'Al-Naor City began its journey in the wholesale food trading sector in 1997 under the name Sayed ugla Office, operating in Jamila Industrial Area through a Cash & Carry business model. This approach enabled the company to establish a strong foothold in the Iraqi market.',
          },
          {
            year: '2021',
            label: 'FMCG Shift & Al-Khan',
            text: 'In 2021, the company entered a new phase of growth to FMCG with its official registration and the launch of its flagship brand, Al-Khan. This marked a fundamental shift from traditional trading towards developing and building its own consumer brands.',
          },
          {
            year: 'Expansion',
            label: 'Portfolio & Shai Al-Khan Café',
            text: 'Since then, Al-Naor City has expanded its product portfolio across various food categories, including tea, rice, olive oil, and rice bran oil, while developing additional brands to address the diverse needs of the market. Al-Khan has also evolved beyond packaged products to offer a broader consumer experience through the establishment of Shai Al-Khan, a spacious café located in Baghdad’s Jadriya district.',
          },
          {
            year: 'Future',
            label: 'Global Bridge',
            text: 'Building on its deep understanding of the Iraqi market and expertise in brand development, Al-Naor City aims to strengthen its role as a bridge between local brand innovation and international market access. The company represents its own brands alongside international brands, guided by a long-term vision to expand its presence across multiple regional markets.',
          },
        ],
      },
      vision: {
        tag: 'FUTURE OUTLOOK',
        title: 'Our Vision',
        text: 'To become a leading regional company in building local brands and connecting global brands with markets across the region.',
      },
      mission: {
        tag: 'CORE PURPOSE',
        title: 'Our Mission',
        text: 'To develop distinctive local brands, represent trusted international brands, and deliver quality products that meet market needs through a deep understanding of consumers and a commitment to sustainable growth.',
      },
      goalsSection: {
        tag: 'STRATEGIC PILLARS',
        title: 'Business Goals & Objectives',
        subtitle:
          'Six foundational pillars driving Al-Naour City’s sustainable expansion across Iraq and regional markets.',
        items: [
          {
            num: '01',
            title: 'Brand Development',
            desc: 'Build and grow a strong portfolio of distinctive local brands that respond to evolving consumer needs.',
          },
          {
            num: '02',
            title: 'Market Expansion',
            desc: 'Strengthen the company’s presence in Iraq and expand into selected regional markets.',
          },
          {
            num: '03',
            title: 'International Partnerships',
            desc: 'Establish strategic partnerships with reputable international brands to bring quality products to local and regional markets.',
          },
          {
            num: '04',
            title: 'Portfolio Diversification',
            desc: 'Expand across complementary food and beverage categories to address a wider range of market opportunities.',
          },
          {
            num: '05',
            title: 'Market Leadership',
            desc: 'Build competitive advantages through product quality, consumer understanding, and effective market positioning.',
          },
          {
            num: '06',
            title: 'Sustainable Growth',
            desc: 'Develop scalable business operations that support long-term growth, operational efficiency, and lasting value.',
          },
        ],
      },
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
    ourPeoplePage: {
      badge: 'تأسست ١٩٩٧ • بغداد، العراق',
      heroTitle: 'شركتنا، إرثنا ورؤيتنا',
      heroSubtitle:
        'من مكتب رائد لتجارة المواد الغذائية بالجملة في منطقة جميلة الصناعية إلى شركة إقليمية رائدة في بناء العلامات التجارية الاستهلاكية.',
      stats: [
        { value: '1997', label: 'التأسيس كمكتب سيد عقلة' },
        { value: '2021', label: 'التسجيل الرسمي وإطلاق علامة الخان' },
        { value: '+4', label: 'فئات غذائية رئيسية متكاملة' },
        { value: '100%', label: 'التزام مطلق بالجودة والأصالة' },
      ],
      historySection: {
        tag: 'تاريخنا العريق',
        title: 'تاريخ الشركة',
        photoCaption: 'صورة أرشيفية نادرة • مستودع منطقة جميلة الصناعية (١٩٩٧)',
        photoBadge: 'أرشيف الشركة • ١٩٩٧',
        milestones: [
          {
            year: '1997',
            label: 'البداية والتأسيس',
            text: 'بدأت شركة مدينة الناعور مسيرتها في قطاع تجارة المواد الغذائية بالجملة عام 1997 تحت اسم "مكتب سيد عقلة"، حيث عملت في منطقة جميلة الصناعية من خلال نموذج البيع النقدي المباشر (Cash & Carry)، مما مكن الشركة من ترسيخ مكانة قوية في السوق العراقي.',
          },
          {
            year: '2021',
            label: 'التحول وإطلاق الخان',
            text: 'في عام 2021، دخلت الشركة مرحلة جديدة من النمو في قطاع السلع الاستهلاكية سريعة التداول (FMCG) مع تسجيلها الرسمي وإطلاق علامتها التجارية الرائدة "الخان"، مما شكل تحولاً جوهرياً من التجارة التقليدية نحو تطوير وبناء علاماتها التجارية الخاصة.',
          },
          {
            year: 'التوسع',
            label: 'تنوع المنتجات ومقهى شاي الخان',
            text: 'ومنذ ذلك الحين، وسعت مدينة الناعور محفظة منتجاتها لتشمل فئات غذائية متنوعة مثل الشاي والأرز وزيت الزيتون وزيت نخالة الأرز، إلى جانب تطوير علامات تجارية إضافية لتلبية الاحتياجات المتنوعة للسوق. كما تطورت علامة "الخان" لتتجاوز المنتجات المعبأة وتقدم تجربة استهلاكية متكاملة من خلال تأسيس "شاي الخان"، وهو مقهى واسع ومميز في منطقة الجادرية ببغداد.',
          },
          {
            year: 'المستقبل',
            label: 'جسر إقليمي وعالمي',
            text: 'استناداً إلى فهمها العميق للسوق العراقي وخبرتها في تطوير العلامات التجارية، تهدف مدينة الناعور إلى تعزيز دورها كجسر يربط بين ابتكار العلامات المحلية والوصول إلى الأسواق العالمية، حيث تمثل علاماتها الخاصة جنباً إلى جنب مع العلامات العالمية وفق رؤية طويلة الأمد للتوسع الإقليمي.',
          },
        ],
      },
      vision: {
        tag: 'تطلعاتنا المستقبلية',
        title: 'رؤيتنا (Our Vision)',
        text: 'أن نصبح شركة إقليمية رائدة في بناء العلامات التجارية المحلية وربط العلامات التجارية العالمية بالأسواق في جميع أنحاء المنطقة.',
      },
      mission: {
        tag: 'رسالتنا الأساسية',
        title: 'مهمتنا (Our Mission)',
        text: 'تطوير علامات تجارية محلية مميزة، وتمثيل علامات تجارية عالمية موثوقة، وتقديم منتجات عالية الجودة تلبي احتياجات السوق من خلال فهم عميق للمستهلكين والالتزام بالنمو المستدام.',
      },
      goalsSection: {
        tag: 'الركائز الاستراتيجية',
        title: 'أهداف العمل والركائز الاستراتيجية',
        subtitle:
          'ست ركائز أساسية تقود التوسع المستدام لشركة مدينة الناعور في العراق والأسواق الإقليمية.',
        items: [
          {
            num: '01',
            title: 'تطوير العلامات التجارية (Brand Development)',
            desc: 'بناء وتنمية محفظة قوية من العلامات التجارية المحلية المميزة التي تستجيب لاحتياجات المستهلكين المتطورة.',
          },
          {
            num: '02',
            title: 'التوسع في الأسواق (Market Expansion)',
            desc: 'تعزيز حضور الشركة في العراق والتوسع نحو أسواق إقليمية مختارة.',
          },
          {
            num: '03',
            title: 'الشراكات الدولية (International Partnerships)',
            desc: 'إقامة شراكات استراتيجية مع علامات تجارية عالمية مرموقة لتقديم منتجات عالية الجودة للأسواق المحلية والإقليمية.',
          },
          {
            num: '04',
            title: 'تنويع المحفظة (Portfolio Diversification)',
            desc: 'التوسع عبر فئات الأغذية والمشروبات المتكاملة لتلبية نطاق أوسع من فرص السوق.',
          },
          {
            num: '05',
            title: 'ريادة السوق (Market Leadership)',
            desc: 'بناء مزايا تنافسية من خلال جودة المنتج، وفهم المستهلك، والتموضع الفعال في السوق.',
          },
          {
            num: '06',
            title: 'النمو المستدام (Sustainable Growth)',
            desc: 'تطوير عمليات تجارية قابلة للتوسع تدعم النمو طويل الأمد والكفاءة التشغيلية والقيمة المستدامة.',
          },
        ],
      },
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
