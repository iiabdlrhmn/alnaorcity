import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { t } = useLanguage();
  const footerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.footer-reveal',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 92%',
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#22660F] text-white pt-12 pb-5 px-6 sm:px-12 lg:px-16 relative z-20"
    >
      <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 pb-10">
        {/* Left Info Column */}
        <div className="flex flex-col space-y-3.5 text-[16px] sm:text-[18px] lg:text-[19px] font-light tracking-wide">
          {/* Company Title */}
          <h2 className="footer-reveal text-[18px] sm:text-[20px] lg:text-[21px] font-normal text-white mb-1.5">
            {t.footer.companyName}
          </h2>

          {/* Address Row */}
          <a
            href={t.footer.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-reveal flex items-start sm:items-center gap-3.5 text-white/95 hover:text-white transition-colors group"
          >
            {/* Pin Icon matching mockup */}
            <svg
              className="w-6 h-6 shrink-0 mt-0.5 sm:mt-0 transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span className="group-hover:underline underline-offset-4">
              {t.footer.address}
            </span>
          </a>

          {/* Email Rows */}
          {t.footer.emails.map((email) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="footer-reveal flex items-center gap-3.5 text-white/95 hover:text-white transition-colors group w-fit"
            >
              {/* Envelope Icon matching mockup */}
              <svg
                className="w-6 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
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
              <span className="group-hover:underline underline-offset-4">
                {email}
              </span>
            </a>
          ))}

          {/* Website Row with Rounded-Square Cursor Icon matching mockup */}
          <a
            href="https://www.alnaorcity.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-reveal flex items-center gap-3.5 text-white/95 hover:text-white transition-colors group w-fit"
          >
            <svg
              className="w-6 h-6 shrink-0 transition-transform duration-300 group-hover:scale-110"
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
            <span className="group-hover:underline underline-offset-4">
              {t.footer.website}
            </span>
          </a>
        </div>

        {/* Right Map Card */}
        <div className="footer-reveal w-full sm:w-[340px] lg:w-[360px] h-[195px] rounded-[2px] overflow-hidden shadow-lg relative group shrink-0 border border-white/20 bg-[#e8ecef]">
          {/* Embedded Map of Jamila Industrial Area, Baghdad */}
          <iframe
            title="Al-Naour City Location Map - Jamila Industrial Area, Baghdad"
            src="https://www.google.com/maps?q=33.3638,44.4265&z=16&output=embed"
            className="w-full h-full border-0 pointer-events-none scale-110 transition-transform duration-500 group-hover:scale-125"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Clickable Overlay to open the exact Google Maps link from info.txt */}
          <a
            href={t.footer.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.footer.openMap}
            className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-end justify-end p-2.5"
          >
            <span className="bg-[#4A2368]/95 text-white text-xs px-3 py-1.5 rounded shadow-md opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 font-medium">
              {t.footer.openMap} ↗
            </span>
          </a>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-reveal text-center text-[13px] sm:text-[14px] text-white/90 font-light pt-2">
        {t.footer.copyright}
      </div>
    </footer>
  );
}
