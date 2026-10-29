import React, { useRef, useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '@assets/photos/logo.png';
import canImg from '@assets/photos/can.png';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const headerRef = useRef(null);
  const pillRef = useRef(null);

  const [isUnpinned, setIsUnpinned] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setHoveredDropdown(null);
    setLangMenuOpen(false);
  }, [location.pathname]);

  // BaselArea.swiss Headroom behavior (hide on scroll down, show on scroll up)
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 30);

      if (currentY > 120 && currentY > lastScrollY + 6 && !mobileMenuOpen) {
        setIsUnpinned(true);
        setLangMenuOpen(false);
        setHoveredDropdown(null);
      } else if (currentY < lastScrollY - 6 || currentY <= 80) {
        setIsUnpinned(false);
      }
      lastScrollY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Entrance GSAP animation
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        pillRef.current,
        { y: -60, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9 }
      )
        .fromTo(
          '.basel-logo-badge',
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6 },
          '-=0.55'
        )
        .fromTo(
          '.basel-nav-item',
          { y: -14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.07 },
          '-=0.45'
        )
        .fromTo(
          '.basel-right-item',
          { x: 16, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          '-=0.4'
        );
    },
    { scope: headerRef }
  );

  const navItems = [
    {
      id: 'home',
      label: t.nav.home,
      path: '/',
    },
    {
      id: 'products',
      label: t.nav.products,
      path: '/products',
      subItems: [
        {
          title: lang === 'ar' ? 'شاي الخان الملكي' : 'Al-Khan Royal Tea',
          desc:
            lang === 'ar'
              ? 'كل ورقة شاي مختارة تصنع فرق الجودة'
              : 'Every selected tea leaf defines the quality',
          path: '/products',
          featuredImg: canImg,
        },
        {
          title: lang === 'ar' ? 'تشكيلة الشاي الفاخر' : 'Premium Tea Selection',
          desc:
            lang === 'ar'
              ? 'أجود أوراق الشاي السيلاني المختارة بعناية'
              : 'Finest hand-picked Ceylon & global tea blends',
          path: '/products',
        },
      ],
    },
    {
      id: 'company',
      label: t.nav.company,
      path: '/company',
      subItems: [
        {
          title: lang === 'ar' ? 'جذور عراقية . وصول عالمي' : 'Iraqi Roots. Global Reach.',
          desc:
            lang === 'ar'
              ? 'قصة شركة مدينة الناعور للتجارة العامة المحدودة'
              : 'The story of Al-Naour City General Trading Co.',
          path: '/company',
        },
        {
          title: lang === 'ar' ? 'معايير الجودة' : 'Quality & Standards',
          desc:
            lang === 'ar'
              ? 'التزامنا بأعلى معايير الجودة الغذائية العالمية'
              : 'Our commitment to world-class food trading standards',
          path: '/company',
        },
      ],
    },
    {
      id: 'contacts',
      label: t.nav.contacts,
      path: '/contacts',
    },
  ];

  return (
    <>
      {/* Backdrop dim overlay when a submenu is hovered (exact baselarea.swiss behavior) */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-[2px] z-30 transition-opacity duration-300 pointer-events-none ${
          hoveredDropdown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <header
        ref={headerRef}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        className={`fixed top-0 left-0 right-0 z-40 mt-3.5 sm:mt-4 px-3 sm:px-6 lg:px-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isUnpinned ? '-translate-y-[150%]' : 'translate-y-0'
        }`}
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Floating Capsule Row (baselarea.swiss .header__row) */}
          <div
            ref={pillRef}
            className={`relative flex items-center justify-between rounded-full p-2 sm:p-2.5 lg:px-3.5 lg:py-2.5 transition-all duration-300 border ${
              isScrolled
                ? 'bg-[#3D1B56]/95 backdrop-blur-xl border-white/20 shadow-[0_18px_45px_rgba(0,0,0,0.45)]'
                : 'bg-[#4A2368]/92 backdrop-blur-md border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.32)]'
            }`}
          >
            {/* LEFT: Clean White Pill Brand Badge with Logo */}
            <div className="flex items-center shrink-0">
              <Link
                to="/"
                aria-label="Al-Naour City Home"
                className="basel-logo-badge group flex items-center gap-3 bg-white hover:bg-[#fcfaff] text-[#4A2368] rounded-full px-4 sm:px-5 py-1.5 sm:py-2 shadow-[0_4px_15px_rgba(0,0,0,0.18)] transition-all duration-300 hover:scale-[1.02]"
              >
                <img
                  src={logoImg}
                  alt="City of Naour - مدينة الناعور"
                  className="h-10 sm:h-12 lg:h-[54px] w-auto object-contain select-none transition-transform duration-300 group-hover:scale-105"
                  draggable={false}
                />
                <div className="hidden xl:flex flex-col leading-tight pr-1">
                  <span className="text-[14px] font-bold tracking-wider text-[#22660F] uppercase">
                    City of Naour
                  </span>
                  <span
                    className="text-[12px] font-semibold text-[#4A2368]"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    مدينة الناعور
                  </span>
                </div>
              </Link>
            </div>

            {/* MIDDLE: Horizontal Pill Menu (baselarea.swiss .header__menu) */}
            <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
              {navItems.map((item, idx) => {
                const hasSub = Boolean(item.subItems);
                const isOpen = hoveredDropdown === item.id;

                return (
                  <React.Fragment key={item.id}>
                    <div
                      className="relative"
                      onMouseEnter={() => hasSub && setHoveredDropdown(item.id)}
                      onMouseLeave={() => hasSub && setHoveredDropdown(null)}
                    >
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `basel-nav-item group inline-flex items-center gap-2 rounded-full px-5 xl:px-6 py-2.5 text-[16px] xl:text-[18px] tracking-wide transition-all duration-300 ${
                            isActive
                              ? 'bg-white text-[#4A2368] font-semibold shadow-sm'
                              : isOpen
                              ? 'bg-white/15 text-white font-normal'
                              : 'text-white/90 hover:bg-white/12 hover:text-white font-light'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span>{item.label}</span>
                            {hasSub && (
                              <svg
                                className={`w-3 h-3 transition-transform duration-300 ${
                                  isOpen
                                    ? 'rotate-180 text-[#66E347]'
                                    : isActive
                                    ? 'text-[#22660F]'
                                    : 'text-white/75 group-hover:text-white'
                                }`}
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <path
                                  d="M11.4985 4.82911L8.47547 7.85218C7.10971 9.21793 4.88731 9.21793 3.52156 7.85218L0.49849 4.82911L1.87496 3.45264L4.93748 6.51734C5.52335 7.10363 6.47368 7.10363 7.05955 6.51734L10.1221 3.45265L11.4985 4.82911Z"
                                  fill="currentColor"
                                />
                              </svg>
                            )}
                          </>
                        )}
                      </NavLink>

                      {/* Invisible hover bridge (like baselarea.swiss :before 36px bridge) */}
                      {hasSub && (
                        <div
                          className={`absolute top-full left-0 pt-4 w-[390px] z-50 transition-all duration-300 origin-top ${
                            isOpen
                              ? 'opacity-100 scale-y-100 translate-y-0 visible pointer-events-auto'
                              : 'opacity-0 scale-y-95 -translate-y-2 invisible pointer-events-none'
                          }`}
                        >
                          <div className="bg-white text-[#1f122b] rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-[#4A2368]/10 overflow-hidden">
                            <ul className="space-y-1">
                              {item.subItems.map((sub, sIdx) => (
                                <li key={sIdx}>
                                  <Link
                                    to={sub.path}
                                    className="group/sub flex items-center justify-between gap-4 rounded-xl p-3.5 hover:bg-[#f6f0fa] transition-colors duration-200"
                                  >
                                    <div className="flex items-center gap-3.5">
                                      {sub.featuredImg && (
                                        <img
                                          src={sub.featuredImg}
                                          alt={sub.title}
                                          className="w-10 h-12 object-contain shrink-0 drop-shadow-sm group-hover/sub:scale-105 transition-transform duration-300"
                                        />
                                      )}
                                      <div>
                                        <div className="flex items-center gap-2 font-semibold text-[16px] text-[#4A2368] group-hover/sub:text-[#22660F] transition-colors">
                                          <span>{sub.title}</span>
                                          {/* BaselArea arrow SVG */}
                                          <svg
                                            className="w-3.5 h-3 transition-transform duration-300 group-hover/sub:translate-x-1 text-[#22660F]"
                                            viewBox="0 0 14 12"
                                            fill="none"
                                          >
                                            <path
                                              d="M7.1277 10.6365L8.40744 11.9986L14 6.04614L8.31945 0L7.03842 1.36348L10.4959 5.0435H0V6.97165H10.571L7.1277 10.6365Z"
                                              fill="currentColor"
                                            />
                                          </svg>
                                        </div>
                                        <p className="text-[13px] text-gray-600 mt-0.5 leading-snug">
                                          {sub.desc}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Subtle green dot/line accent between items matching Al-Naour palette */}
                    {idx < navItems.length - 1 && (
                      <span
                        className="w-[1.5px] h-5 bg-[#379B23]/70 rounded-full shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </nav>

            {/* RIGHT: BaselArea Globe Language Selector + Pill CTA Button + Mobile Toggle */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
              {/* BaselArea.swiss Globe Language Selector */}
              <div className="basel-right-item relative">
                <button
                  type="button"
                  onClick={() => setLangMenuOpen((prev) => !prev)}
                  aria-label="Select language"
                  aria-expanded={langMenuOpen}
                  className="flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-3.5 py-2 text-white text-[14px] font-medium transition-all duration-200 cursor-pointer"
                >
                  {/* Exact Globe SVG from baselarea.swiss */}
                  <svg
                    className="w-4 h-4 text-[#66E347]"
                    viewBox="0 0 13 14"
                    fill="none"
                  >
                    <path
                      d="M6.5 0.5C2.91586 0.5 0 3.41586 0 7C0 10.5842 2.91586 13.5 6.5 13.5C10.0842 13.5 13 10.5842 13 7C13 3.41586 10.0842 0.5 6.5 0.5ZM6.11914 3.69049C5.53972 3.6656 4.96615 3.58417 4.41846 3.45176C4.50595 3.24447 4.60086 3.04541 4.70321 2.85676C5.12315 2.08294 5.6387 1.53993 6.11914 1.34324V3.69049ZM6.11914 4.4528V6.61914H3.74025C3.77378 5.77361 3.91789 4.93424 4.15623 4.17073C4.78782 4.32982 5.45085 4.42612 6.11914 4.4528ZM6.11914 7.38086V9.54719C5.45085 9.57384 4.78782 9.6702 4.15623 9.82929C3.91789 9.06578 3.77378 8.22639 3.74025 7.38086H6.11914ZM6.11914 10.3095V12.6568C5.6387 12.4601 5.12315 11.9171 4.70321 11.1433C4.60086 10.9546 4.50595 10.7555 4.41846 10.5483C4.96615 10.4158 5.53962 10.3344 6.11914 10.3095ZM6.88086 10.3095C7.46029 10.3344 8.03384 10.4158 8.58154 10.5483C8.49404 10.7555 8.39914 10.9546 8.29676 11.1433C7.87686 11.9171 7.36133 12.4601 6.88086 12.6568V10.3095ZM6.88086 9.54719V7.38086H9.25974C9.22618 8.22639 9.08212 9.06578 8.84374 9.82929C8.21218 9.6702 7.54918 9.57384 6.88086 9.54719ZM6.88086 6.61914V4.4528C7.54918 4.42612 8.21218 4.32982 8.84374 4.17073C9.08212 4.93424 9.22618 5.77361 9.25974 6.61914H6.88086ZM6.88086 3.69049V1.34324C7.36133 1.53993 7.87686 2.08294 8.29676 2.85676C8.39914 3.04541 8.49404 3.24447 8.58154 3.45176C8.03384 3.58417 7.46029 3.6656 6.88086 3.69049ZM8.96626 2.49346C8.77557 2.14196 8.56838 1.83212 8.34998 1.5678C9.11146 1.82785 9.80127 2.24392 10.3814 2.77752C10.0505 2.95476 9.69394 3.10869 9.31889 3.23733C9.21245 2.97886 9.0948 2.73021 8.96626 2.49346ZM4.03374 2.49346C3.9052 2.73021 3.78757 2.97886 3.68115 3.23733C3.30604 3.10869 2.94948 2.95466 2.61861 2.77752C3.19872 2.24392 3.88854 1.82785 4.65005 1.5678C4.43166 1.83212 4.22456 2.14186 4.03374 2.49346ZM3.42347 3.95322C3.16351 4.78487 3.01067 5.69149 2.97775 6.61914H0.774711C0.856237 5.38125 1.33162 4.24918 2.07708 3.34802C2.49076 3.58526 2.94383 3.78819 3.42347 3.95322ZM2.97775 7.38086C3.01067 8.30861 3.16351 9.21512 3.42347 10.0468C2.94383 10.2118 2.49076 10.4148 2.07708 10.652C1.33162 9.7508 0.856237 8.61874 0.774711 7.38086H2.97775ZM3.68115 10.7627C3.78757 11.0211 3.9052 11.2698 4.03374 11.5065C4.22456 11.858 4.43166 12.1679 4.65005 12.4322C3.88854 12.1721 3.19872 11.7561 2.6187 11.2225C2.94938 11.0454 3.30604 10.8913 3.68115 10.7627ZM8.96626 11.5065C9.0948 11.2698 9.21245 11.0211 9.31889 10.7627C9.69394 10.8913 10.0505 10.0454 10.3814 11.2225C9.80127 11.7561 9.11146 12.1721 8.34998 12.4322C8.56838 12.1679 8.77541 11.8581 8.96626 11.5065ZM9.57653 10.0468C9.83645 9.21512 9.98936 8.30853 10.0223 7.38086H12.2253C12.1438 8.61874 11.6684 9.7508 10.9229 10.652C10.5092 10.4148 10.0562 10.2118 9.57653 10.0468ZM10.0223 6.61914C9.98936 5.69139 9.83645 4.78487 9.57653 3.95322C10.0562 3.78819 10.5092 3.58526 10.9229 3.34802C11.6684 4.24918 12.1438 5.38125 12.2253 6.61914H10.0223Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="tracking-wider uppercase">
                    {lang === 'en' ? 'EN' : 'العربية'}
                  </span>
                  <svg
                    className={`w-2.5 h-2.5 transition-transform duration-200 ${
                      langMenuOpen ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M11.4985 4.82911L8.47547 7.85218C7.10971 9.21793 4.88731 9.21793 3.52156 7.85218L0.49849 4.82911L1.87496 3.45264L4.93748 6.51734C5.52335 7.10363 6.47368 7.10363 7.05955 6.51734L10.1221 3.45265L11.4985 4.82911Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>

                {/* Language Dropdown Menu */}
                {langMenuOpen && (
                  <ul
                    role="listbox"
                    className="absolute right-0 mt-2.5 w-36 bg-white text-[#2b143d] rounded-2xl shadow-[0_14px_34px_rgba(0,0,0,0.3)] border border-[#4A2368]/10 py-1.5 z-50 overflow-hidden"
                  >
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setLang('en');
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors cursor-pointer ${
                          lang === 'en'
                            ? 'bg-[#f3ebf8] text-[#4A2368] font-semibold'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span>English</span>
                        <span className="text-xs font-bold text-[#22660F]">EN</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setLang('ar');
                          setLangMenuOpen(false);
                        }}
                        style={{ fontFamily: "'Cairo', sans-serif" }}
                        className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors cursor-pointer ${
                          lang === 'ar'
                            ? 'bg-[#f3ebf8] text-[#4A2368] font-semibold'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span>العربية</span>
                        <span className="text-xs font-bold text-[#22660F]">AR</span>
                      </button>
                    </li>
                  </ul>
                )}
              </div>

              {/* BaselArea.swiss Pill CTA Button ("Contact us") */}
              <Link
                to="/contacts"
                className="basel-right-item hidden sm:inline-flex items-center gap-2.5 rounded-full bg-[#267312] hover:bg-[#2f8c17] text-white font-medium text-[15px] xl:text-[16px] px-5 xl:px-6 py-2.5 shadow-[0_6px_18px_rgba(34,102,15,0.45)] hover:shadow-[0_8px_22px_rgba(47,140,23,0.65)] transition-all duration-300 group"
              >
                <span className="relative">
                  {lang === 'ar' ? 'تواصل معنا' : 'Contact us'}
                  <span className="block h-[1.5px] w-0 group-hover:w-full bg-white transition-all duration-300" />
                </span>
                <svg
                  className="w-3.5 h-3 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 14 12"
                  fill="none"
                >
                  <path
                    d="M7.1277 10.6365L8.40744 11.9986L14 6.04614L8.31945 0L7.03842 1.36348L10.4959 5.0435H0V6.97165H10.571L7.1277 10.6365Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>

              {/* BaselArea.swiss Minimal 2-Line Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white relative transition-colors cursor-pointer mr-1"
              >
                <span
                  className={`block absolute w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                  }`}
                />
                <span
                  className={`block absolute w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Mobile Drawer Menu */}
          <div
            className={`lg:hidden mt-2.5 rounded-3xl bg-[#3D1B56]/98 backdrop-blur-xl border border-white/15 shadow-2xl overflow-hidden transition-all duration-300 ${
              mobileMenuOpen
                ? 'max-h-[420px] opacity-100 py-4 px-5'
                : 'max-h-0 opacity-0 py-0 px-5 pointer-events-none'
            }`}
          >
            <nav className="flex flex-col space-y-1.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-2xl text-[17px] transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-white text-[#4A2368] font-semibold'
                        : 'text-white/90 hover:bg-white/10'
                    }`
                  }
                >
                  <span>{item.label}</span>
                  <svg className="w-3.5 h-3 opacity-70" viewBox="0 0 14 12" fill="none">
                    <path
                      d="M7.1277 10.6365L8.40744 11.9986L14 6.04614L8.31945 0L7.03842 1.36348L10.4959 5.0435H0V6.97165H10.571L7.1277 10.6365Z"
                      fill="currentColor"
                    />
                  </svg>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
