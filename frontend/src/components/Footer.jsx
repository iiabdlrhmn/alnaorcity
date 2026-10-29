import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '@assets/photos/logo.png';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { lang, t } = useLanguage();
  const footerRef = useRef(null);
  const glowRef = useRef(null);
  const mapCardRef = useRef(null);

  const [copiedItem, setCopiedItem] = useState(null);
  const [mapInteractive, setMapInteractive] = useState(false);
  const [mapType, setMapType] = useState('m'); // 'm' = standard map, 'k' = satellite

  useGSAP(
    () => {
      gsap.fromTo(
        '.footer-bento-item',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    },
    { scope: footerRef }
  );

  // Cursor-following ambient glow inside footer
  const handleFooterMouseMove = (e) => {
    if (!footerRef.current || !glowRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x - 220,
      y: y - 220,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  // Subtle 3D tilt on the map card when not in interactive pan mode
  const handleMapMouseMove = (e) => {
    if (mapInteractive || !mapCardRef.current) return;
    const rect = mapCardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(mapCardRef.current, {
      rotateY: relX * 8,
      rotateX: -relY * 8,
      transformPerspective: 900,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMapMouseLeave = () => {
    if (!mapCardRef.current) return;
    gsap.to(mapCardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.6)',
    });
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => {
      setCopiedItem((prev) => (prev === id ? null : prev));
    }, 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      onMouseMove={handleFooterMouseMove}
      className="relative w-full bg-gradient-to-b from-[#1A520B] via-[#18490A] to-[#113507] text-white pt-10 pb-8 px-4 sm:px-6 lg:px-10 overflow-hidden z-20"
    >
      {/* Interactive Cursor-Following Spotlight Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 w-[440px] h-[440px] rounded-full bg-radial from-[#66E347]/20 via-[#4A2368]/15 to-transparent blur-3xl opacity-80"
      />

      <div className="max-w-[1440px] mx-auto relative z-10 space-y-6">
        {/* TOP CAPSULE BAR: Mirrors the baselarea.swiss Header Pill */}
        <div className="footer-bento-item flex flex-wrap items-center justify-between gap-4 rounded-3xl sm:rounded-full bg-[#4A2368]/90 backdrop-blur-xl border border-white/15 p-3 sm:px-5 sm:py-3 shadow-[0_14px_38px_rgba(0,0,0,0.35)]">
          {/* Brand Pill */}
          <div className="flex items-center gap-3.5">
            <Link
              to="/"
              onClick={scrollToTop}
              className="group flex items-center gap-3 bg-white text-[#4A2368] rounded-full px-4 py-1.5 shadow-md transition-transform duration-300 hover:scale-[1.03]"
            >
              <img
                src={logoImg}
                alt="City of Naour"
                className="h-10 sm:h-11 w-auto object-contain"
                draggable={false}
              />
            </Link>
            <div>
              <h2 className="text-[16px] sm:text-[19px] font-semibold text-white tracking-wide leading-snug">
                {t.footer.companyName}
              </h2>
              <p className="text-xs sm:text-sm text-white/75 font-light">
                {lang === 'ar'
                  ? 'جذور عراقية . وصول عالمي'
                  : 'Iraqi Roots. Global Reach.'}
              </p>
            </div>
          </div>

          {/* Quick Nav Pills + Back to Top Pill */}
          <div className="flex items-center flex-wrap gap-2 ml-auto">
            {[
              { label: t.nav.home, path: '/' },
              { label: t.nav.products, path: '/products' },
              { label: t.nav.company, path: '/company' },
              { label: t.nav.contacts, path: '/contacts' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={scrollToTop}
                className="hidden md:inline-flex items-center rounded-full px-4 py-2 text-sm text-white/85 hover:text-white hover:bg-white/12 transition-all duration-200 font-light"
              >
                {item.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 rounded-full bg-[#267312] hover:bg-[#319118] text-white text-sm font-medium px-4 py-2.5 shadow-md transition-all duration-300 cursor-pointer"
              title="Back to top"
            >
              <span>{lang === 'ar' ? 'إلى الأعلى' : 'Top'}</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 -rotate-90"
                viewBox="0 0 14 12"
                fill="none"
              >
                <path
                  d="M7.1277 10.6365L8.40744 11.9986L14 6.04614L8.31945 0L7.03842 1.36348L10.4959 5.0435H0V6.97165H10.571L7.1277 10.6365Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* MAIN BENTO GRID: Interactive Contact Capsules (Left) + Interactive 3D Map Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT 7 COLS: Interactive Contact Cards & Pills */}
          <div className="footer-bento-item lg:col-span-7 rounded-[28px] bg-white/[0.06] backdrop-blur-md border border-white/15 p-5 sm:p-7 flex flex-col justify-between gap-4 shadow-[0_12px_32px_rgba(0,0,0,0.22)]">
            <div className="space-y-3">
              {/* Interactive Address Capsule */}
              <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-white/[0.07] hover:bg-white/[0.13] border border-white/10 hover:border-[#66E347]/50 p-3.5 sm:px-5 transition-all duration-300">
                <a
                  href={t.footer.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start sm:items-center gap-3.5 text-white flex-1"
                >
                  <span className="w-10 h-10 rounded-full bg-[#4A2368] border border-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#5c2c82] transition-all duration-300 shadow-sm">
                    <svg
                      className="w-5 h-5 text-[#66E347]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                  <div className="text-[15px] sm:text-[17px] font-light leading-snug">
                    <span className="block text-xs uppercase tracking-wider text-[#88f26d] font-semibold mb-0.5">
                      {lang === 'ar' ? 'الموقع الرئيسي' : 'Headquarters'}
                    </span>
                    {t.footer.address}
                  </div>
                </a>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy(t.footer.address, 'address')}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-white/90 transition-colors cursor-pointer"
                  >
                    {copiedItem === 'address'
                      ? lang === 'ar'
                        ? 'تم النسخ ✓'
                        : 'Copied ✓'
                      : lang === 'ar'
                      ? 'نسخ'
                      : 'Copy'}
                  </button>
                  <a
                    href={t.footer.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#267312] hover:bg-[#329618] flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-0.5"
                    title={t.footer.openMap}
                  >
                    <svg className="w-3.5 h-3" viewBox="0 0 14 12" fill="none">
                      <path
                        d="M7.1277 10.6365L8.40744 11.9986L14 6.04614L8.31945 0L7.03842 1.36348L10.4959 5.0435H0V6.97165H10.571L7.1277 10.6365Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Interactive Email Capsules Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {t.footer.emails.map((email, idx) => {
                  const id = `email-${idx}`;
                  const isCopied = copiedItem === id;
                  return (
                    <div
                      key={email}
                      className="group relative rounded-2xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/10 hover:border-[#66E347]/50 p-3.5 flex flex-col justify-between gap-2.5 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#4A2368]/90 border border-white/15 flex items-center justify-center shrink-0">
                          <svg
                            className="w-4 h-4 text-[#66E347]"
                            viewBox="0 0 24 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="2" y="2" width="20" height="16" rx="2" />
                            <path d="m2.5 3 9.5 7.5L21.5 3" />
                          </svg>
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleCopy(email, id)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                              isCopied
                                ? 'bg-[#66E347] text-[#113507] font-semibold'
                                : 'bg-white/10 hover:bg-white/25 text-white/90'
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
                          <a
                            href={`mailto:${email}`}
                            className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#4A2368] flex items-center justify-center text-white transition-colors"
                            title={`Email ${email}`}
                          >
                            ↗
                          </a>
                        </div>
                      </div>

                      <a
                        href={`mailto:${email}`}
                        className="text-[14px] sm:text-[15px] font-light text-white/95 group-hover:text-white truncate"
                      >
                        {email}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Row inside Left Card: Website Pill + Status Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
              <a
                href="https://www.alnaorcity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[#4A2368]/80 hover:bg-[#4A2368] border border-white/15 px-4 py-2 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 text-[#66E347] transition-transform duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 20H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v5" />
                  <path d="M10 10l9.5 3.5-4.2 1.5-1.8 4.5L10 10z" />
                </svg>
                <span className="text-[15px] font-light tracking-wide">
                  {t.footer.website}
                </span>
                <svg
                  className="w-3 h-3 opacity-75 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 14 12"
                  fill="none"
                >
                  <path
                    d="M7.1277 10.6365L8.40744 11.9986L14 6.04614L8.31945 0L7.03842 1.36348L10.4959 5.0435H0V6.97165H10.571L7.1277 10.6365Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <div className="flex items-center gap-2 text-xs text-white/80 bg-black/20 rounded-full px-3.5 py-1.5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#66E347] animate-pulse" />
                <span>
                  {lang === 'ar'
                    ? 'بغداد، العراق • منطقة جميلة الصناعية'
                    : 'Baghdad, Iraq • Jamila Industrial Area'}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: Interactive 3D-Tilt & Live-Control Map Capsule Card */}
          <div
            ref={mapCardRef}
            onMouseMove={handleMapMouseMove}
            onMouseLeave={handleMapMouseLeave}
            className="footer-bento-item lg:col-span-5 relative rounded-[28px] overflow-hidden border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.35)] bg-[#1c242b] min-h-[260px] flex flex-col justify-between group"
          >
            {/* Top Floating Map Controls Bar (matches baselarea pill aesthetic) */}
            <div className="relative z-20 flex items-center justify-between gap-2 p-3">
              {/* Map / Satellite Switcher Pill */}
              <div className="flex items-center rounded-full bg-[#4A2368]/90 backdrop-blur-md border border-white/20 p-1 shadow-lg">
                <button
                  type="button"
                  onClick={() => setMapType('m')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    mapType === 'm'
                      ? 'bg-white text-[#4A2368] shadow-sm'
                      : 'text-white/85 hover:text-white'
                  }`}
                >
                  {lang === 'ar' ? 'خريطة' : 'Map'}
                </button>
                <button
                  type="button"
                  onClick={() => setMapType('k')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    mapType === 'k'
                      ? 'bg-white text-[#4A2368] shadow-sm'
                      : 'text-white/85 hover:text-white'
                  }`}
                >
                  {lang === 'ar' ? 'قمر صناعي' : 'Satellite'}
                </button>
              </div>

              {/* Interactive Pan/Zoom Unlock Toggle Pill */}
              <button
                type="button"
                onClick={() => setMapInteractive((prev) => !prev)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border transition-all cursor-pointer shadow-lg ${
                  mapInteractive
                    ? 'bg-[#66E347] text-[#113507] border-[#66E347] font-semibold'
                    : 'bg-black/65 hover:bg-black/80 text-white border-white/20'
                }`}
              >
                {mapInteractive
                  ? lang === 'ar'
                    ? '✓ تفاعل الخريطة مفعل'
                    : '✓ Interactive Mode On'
                  : lang === 'ar'
                  ? 'تحريك الخريطة ✥'
                  : 'Explore Map ✥'}
              </button>
            </div>

            {/* Embedded Google Map of Jamila Industrial Area, Baghdad */}
            <iframe
              title="Al-Naour City Location Map - Jamila Industrial Area, Baghdad"
              src={`https://www.google.com/maps?q=33.3638,44.4265&z=16&t=${mapType}&output=embed`}
              className={`absolute inset-0 w-full h-full border-0 transition-transform duration-700 ${
                mapInteractive
                  ? 'pointer-events-auto scale-100'
                  : 'pointer-events-none scale-105 group-hover:scale-110'
              }`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Bottom Floating Action Pill inside Map Card */}
            <div className="relative z-20 p-3 flex items-center justify-between bg-gradient-to-t from-black/75 via-black/35 to-transparent pt-8 pointer-events-none">
              <div className="flex items-center gap-2 text-xs text-white font-medium drop-shadow">
                <span className="w-2.5 h-2.5 rounded-full bg-[#66E347] ring-4 ring-[#66E347]/30" />
                <span>Jamila Industrial Area, Baghdad</span>
              </div>

              <a
                href={t.footer.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#4A2368] hover:bg-[#5e2c85] text-white text-xs font-medium px-4 py-2 shadow-lg border border-white/20 transition-all duration-300 hover:scale-105"
              >
                <span>{t.footer.openMap}</span>
                <svg className="w-3 h-2.5" viewBox="0 0 14 12" fill="none">
                  <path
                    d="M7.1277 10.6365L8.40744 11.9986L14 6.04614L8.31945 0L7.03842 1.36348L10.4959 5.0435H0V6.97165H10.571L7.1277 10.6365Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="footer-bento-item flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] text-white/80 font-light pt-2 px-2">
          <span>{t.footer.copyright}</span>
          <span className="text-white/65">
            Al-Naour City General Trading Company Ltd. • Baghdad, Iraq
          </span>
        </div>
      </div>
    </footer>
  );
}
