import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import bgLeavesImg from '@assets/photos/fresh-green-tea-leaves-lush-plantation.jpg';
import taglineMapImg from '@assets/photos/taglinewithmap.png';

export default function Contacts() {
  const { lang, t } = useLanguage();
  const pageRef = useRef(null);
  const [copiedKey, setCopiedKey] = useState(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.contact-anim',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          force3D: true,
        }
      );
    },
    { scope: pageRef }
  );

  const handleCopy = (val, key) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2200);
  };

  return (
    <main
      ref={pageRef}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="relative w-full min-h-[75vh] bg-gradient-to-b from-[#13380A] via-[#0F2C09] to-[#1A520B] text-white pt-32 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-10 overflow-hidden"
    >
      <img
        src={bgLeavesImg}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-20 pointer-events-none"
      />
      <img
        src={taglineMapImg}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="absolute right-[-4%] top-12 w-[480px] lg:w-[640px] opacity-12 mix-blend-screen pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-[1380px] mx-auto">
        <div className="max-w-2xl mb-12">
          <div className="contact-anim inline-flex items-center gap-2.5 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#66E347] animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#98f580]">
              {lang === 'ar' ? 'بغداد، العراق • تواصل معنا' : 'BAGHDAD, IRAQ • GET IN TOUCH'}
            </span>
          </div>

          <h1 className="contact-anim text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            {t.nav.contacts}
          </h1>
          <p className="contact-anim text-lg text-white/80 font-light leading-relaxed">
            {lang === 'ar'
              ? 'يسعدنا تواصلكم مع شركة مدينة الناعور للتجارة العامة المحدودة للاستفسارات التجارية، التوزيع، والشراكات الإقليمية والدولية.'
              : 'Connect directly with Al-Naour City General Trading Company Ltd. for wholesale inquiries, distribution, and regional or international partnerships.'}
          </p>
        </div>

        {/* Interactive Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Headquarters Card */}
          <div className="contact-anim rounded-[28px] bg-[#19470D]/90 border border-white/15 hover:border-[#66E347]/60 p-6 flex flex-col justify-between gap-5 shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div>
              <span className="w-11 h-11 rounded-2xl bg-[#4A2368] border border-white/20 flex items-center justify-center text-[#66E347] mb-4">
                📍
              </span>
              <h2 className="text-lg font-bold text-white mb-1.5">
                {lang === 'ar' ? 'المقر الرئيسي' : 'Headquarters'}
              </h2>
              <p className="text-sm text-white/85 font-light leading-relaxed">
                {t.footer.address}
              </p>
            </div>
            <a
              href={t.footer.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#66E347] text-[#0F2C09] font-semibold text-xs py-2.5 px-4 transition-transform hover:scale-[1.03]"
            >
              <span>{t.footer.openMap}</span>
              <span>↗</span>
            </a>
          </div>

          {/* 3 Official Emails Cards */}
          {t.footer.emails.map((email, idx) => {
            const labelsEn = ['General Inquiries', 'CEO & Co-Founder Office', 'Chairman & Founder Office'];
            const labelsAr = ['الاستفسارات العامة', 'مكتب الرئيس التنفيذي', 'مكتب رئيس مجلس الإدارة'];
            const key = `contact-email-${idx}`;
            const isCopied = copiedKey === key;

            return (
              <div
                key={email}
                className="contact-anim rounded-[28px] bg-[#2D1442]/85 border border-white/15 hover:border-[#66E347]/60 p-6 flex flex-col justify-between gap-5 shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <span className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#98f580] mb-4">
                    ✉
                  </span>
                  <h2 className="text-lg font-bold text-white mb-1.5">
                    {lang === 'ar' ? labelsAr[idx] : labelsEn[idx]}
                  </h2>
                  <p className="text-sm text-[#98f580] font-medium break-all">
                    {email}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${email}`}
                    className="flex-1 text-center rounded-full bg-white text-[#4A2368] font-semibold text-xs py-2.5 px-3 hover:bg-[#f2eaf7] transition-colors"
                  >
                    {lang === 'ar' ? 'إرسال بريد' : 'Send Email'}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(email, key)}
                    className={`rounded-full text-xs font-semibold py-2.5 px-3.5 cursor-pointer transition-colors ${
                      isCopied
                        ? 'bg-[#66E347] text-[#0F2C09]'
                        : 'bg-white/12 hover:bg-white/25 text-white'
                    }`}
                  >
                    {isCopied
                      ? lang === 'ar'
                        ? 'تم النسخ ✓'
                        : 'Copied ✓'
                      : lang === 'ar'
                      ? 'نسخ'
                      : 'Copy'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
