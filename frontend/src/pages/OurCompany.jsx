import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import warehouseImg from '@assets/photos/Vintage Warehouse Film Photograph.png';
import bgLeavesImg from '@assets/photos/fresh-green-tea-leaves-lush-plantation.jpg';
import taglineMapImg from '@assets/photos/taglinewithmap.png';

gsap.registerPlugin(ScrollTrigger);

export default function OurCompany() {
  const { lang, t } = useLanguage();
  const location = useLocation();
  const pageRef = useRef(null);
  const photoCardRef = useRef(null);
  const photoSheenRef = useRef(null);

  const [activeMilestone, setActiveMilestone] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const p = t.ourPeoplePage;

  // Smoothly scroll to section when navigating via dropdown hash (#history, #vision-mission, #goals)
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  useGSAP(
    () => {
      // 1. Hero Entrance Timeline
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroTl
        .fromTo(
          '.op-hero-badge',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 }
        )
        .fromTo(
          '.op-hero-title',
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          '-=0.45'
        )
        .fromTo(
          '.op-hero-sub',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          '-=0.55'
        )
        .fromTo(
          '.op-stat-pill',
          { y: 28, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.1 },
          '-=0.45'
        );

      // 2. History Section Scroll Reveal
      gsap.fromTo(
        '.op-history-left',
        { x: -45, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.op-history-section',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.op-history-right',
        { x: 45, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.op-history-section',
            start: 'top 80%',
          },
        }
      );

      // 3. Vision & Mission Cards Scroll Reveal
      gsap.fromTo(
        '.op-vm-card',
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.op-vm-section',
            start: 'top 82%',
          },
        }
      );

      // 4. Business Goals & Objectives Bento Cards Stagger Reveal
      gsap.fromTo(
        '.op-goal-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.op-goals-section',
            start: 'top 82%',
          },
        }
      );
    },
    { scope: pageRef }
  );

  // Interactive 3D tilt & film sheen on the Vintage Warehouse Photograph
  const handlePhotoMouseMove = (e) => {
    if (!photoCardRef.current) return;
    const rect = photoCardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(photoCardRef.current, {
      rotateY: relX * 12,
      rotateX: -relY * 12,
      scale: 1.015,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out',
    });

    if (photoSheenRef.current) {
      gsap.to(photoSheenRef.current, {
        x: relX * 140,
        y: relY * 140,
        opacity: 0.35,
        duration: 0.4,
      });
    }
  };

  const handlePhotoMouseLeave = () => {
    if (!photoCardRef.current) return;
    gsap.to(photoCardRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.7,
      ease: 'elastic.out(1, 0.65)',
    });
    if (photoSheenRef.current) {
      gsap.to(photoSheenRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }
  };

  // Custom SVG icons for the 6 Strategic Goals
  const renderGoalIcon = (idx) => {
    switch (idx) {
      case 0: // Brand Development
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        );
      case 1: // Market Expansion
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        );
      case 2: // International Partnerships
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 3: // Portfolio Diversification
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
          </svg>
        );
      case 4: // Market Leadership
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
        );
      default: // Sustainable Growth
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M22 7L13.5 15.5L8.5 10.5L2 17" />
            <path d="M16 7h6v6" />
          </svg>
        );
    }
  };

  return (
    <main
      ref={pageRef}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="relative w-full min-h-screen bg-[#0f2c09] text-white overflow-hidden"
    >
      {/* =========================================================
          1. HERO BANNER SECTION
      ========================================================= */}
      <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-10 overflow-hidden">
        {/* Background Tea Plantation with Deep Royal Purple & Green Mesh */}
        <img
          src={bgLeavesImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25 scale-105 pointer-events-none"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 20% 25%, rgba(74,35,104,0.72) 0%, rgba(15,44,9,0.92) 65%), linear-gradient(to bottom, rgba(15,44,9,0.5) 0%, #0f2c09 100%)',
          }}
        />

        {/* Subtle Watermark of Iraq Map Outline */}
        <img
          src={taglineMapImg}
          alt=""
          aria-hidden="true"
          className="absolute right-[-5%] top-12 w-[520px] lg:w-[680px] opacity-15 mix-blend-screen pointer-events-none select-none"
        />

        <div className="relative z-10 max-w-[1380px] mx-auto">
          <div className="max-w-3xl">
            {/* Capsule Badge */}
            <div className="op-hero-badge inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 mb-6 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#66E347] animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#98f580]">
                {p.badge}
              </span>
            </div>

            {/* Hero Title */}
            <h1 className="op-hero-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] mb-5">
              {p.heroTitle}
            </h1>

            {/* Hero Subtitle */}
            <p className="op-hero-sub text-lg sm:text-xl text-white/85 font-light leading-relaxed max-w-2xl">
              {p.heroSubtitle}
            </p>
          </div>

          {/* 4 Key Milestone Pills Bar */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {p.stats.map((st, idx) => (
              <div
                key={idx}
                className="op-stat-pill group rounded-3xl bg-white/[0.07] hover:bg-white/[0.12] backdrop-blur-xl border border-white/15 hover:border-[#66E347]/50 p-5 sm:p-6 transition-all duration-300 shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
              >
                <div className="text-3xl sm:text-4xl font-bold text-[#66E347] group-hover:scale-105 transition-transform origin-left">
                  {st.value}
                </div>
                <div className="text-sm sm:text-base text-white/85 font-light mt-1.5">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          2. OUR HISTORY SECTION (SIDE-BY-SIDE WITH VINTAGE WAREHOUSE PHOTO)
      ========================================================= */}
      <section
        id="history"
        className="op-history-section scroll-mt-24 relative py-12 sm:py-20 px-4 sm:px-6 lg:px-10"
      >
        <div className="max-w-[1380px] mx-auto">
          <div className="rounded-[36px] bg-gradient-to-br from-white/[0.08] via-[#4A2368]/25 to-white/[0.04] backdrop-blur-xl border border-white/15 p-6 sm:p-10 lg:p-14 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* LEFT 7 COLUMNS: Our History Text & Interactive Timeline */}
              <div className="op-history-left lg:col-span-7 space-y-6">
                <div>
                  <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#66E347] mb-2">
                    {p.historySection.tag}
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight">
                    {p.historySection.title}
                  </h2>
                </div>

                {/* Interactive Milestone Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {p.historySection.milestones.map((ms, idx) => {
                    const isSelected = activeMilestone === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          setActiveMilestone(isSelected ? null : idx)
                        }
                        onMouseEnter={() => setActiveMilestone(idx)}
                        onMouseLeave={() => setActiveMilestone(null)}
                        className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#66E347] text-[#0f2c09] border-[#66E347] font-semibold shadow-[0_0_16px_rgba(102,227,71,0.5)] scale-105'
                            : 'bg-[#4A2368]/70 hover:bg-[#4A2368] text-white/90 border-white/15'
                        }`}
                      >
                        {ms.year} • {ms.label}
                      </button>
                    );
                  })}
                </div>

                {/* History Paragraphs with Timeline Line */}
                <div className="relative space-y-4 pt-2">
                  {p.historySection.milestones.map((ms, idx) => {
                    const isHighlighted = activeMilestone === idx;
                    const isDimmed =
                      activeMilestone !== null && activeMilestone !== idx;

                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setActiveMilestone(idx)}
                        onMouseLeave={() => setActiveMilestone(null)}
                        className={`relative rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${
                          isHighlighted
                            ? 'bg-white/[0.13] border-[#66E347]/60 shadow-lg translate-x-1'
                            : isDimmed
                            ? 'bg-white/[0.03] border-white/5 opacity-55'
                            : 'bg-white/[0.06] border-white/10 hover:bg-white/[0.1]'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                              isHighlighted
                                ? 'bg-[#66E347] text-[#0f2c09]'
                                : 'bg-[#4A2368] text-[#98f580] border border-white/15'
                            }`}
                          >
                            {ms.year}
                          </span>
                          <p className="text-[15.5px] sm:text-[17px] text-white/92 font-light leading-relaxed">
                            {ms.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT 5 COLUMNS: Vintage Warehouse Film Photograph in Interactive 3D Frame */}
              <div className="op-history-right lg:col-span-5 flex flex-col items-center">
                <div
                  ref={photoCardRef}
                  onMouseMove={handlePhotoMouseMove}
                  onMouseLeave={handlePhotoMouseLeave}
                  onClick={() => setLightboxOpen(true)}
                  className="relative w-full max-w-[460px] rounded-[28px] bg-[#141118] p-3 sm:p-4 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.65)] cursor-pointer group overflow-hidden"
                  title="Click to view full archival photograph"
                >
                  {/* Dynamic Light Sheen */}
                  <div
                    ref={photoSheenRef}
                    className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/30 blur-2xl opacity-0 z-20"
                  />

                  {/* Top Floating Archival Film Badge */}
                  <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/75 backdrop-blur-md border border-amber-400/40 px-3.5 py-1 text-[11px] font-semibold tracking-wider text-amber-300 uppercase shadow-md">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      {p.historySection.photoBadge}
                    </span>

                    <span className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      ⤢
                    </span>
                  </div>

                  {/* The Vintage Warehouse Film Photograph */}
                  <div className="relative rounded-[20px] overflow-hidden bg-black">
                    <img
                      src={warehouseImg}
                      alt={p.historySection.photoCaption}
                      className="w-full h-auto max-h-[580px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.03] select-none"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Bottom Caption inside Photo Frame */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-amber-300/90 font-semibold">
                          Sayed Ugla Office • 1997
                        </p>
                        <p className="text-sm text-white/95 font-light mt-0.5">
                          {p.historySection.photoCaption}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. OUR VISION & OUR MISSION SECTION
      ========================================================= */}
      <section
        id="vision-mission"
        className="op-vm-section scroll-mt-24 relative py-10 sm:py-16 px-4 sm:px-6 lg:px-10"
      >
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Our Vision Card (Royal Purple Capsule Bento) */}
          <div className="op-vm-card group relative rounded-[32px] bg-gradient-to-br from-[#4A2368]/90 via-[#3b1b54]/90 to-[#281139]/95 backdrop-blur-xl border border-white/20 hover:border-[#66E347]/60 p-8 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#66E347]/15 blur-3xl pointer-events-none group-hover:bg-[#66E347]/25 transition-colors" />

            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#98f580]">
                {p.vision.tag}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#66E347] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {p.vision.title}
            </h2>
            <p className="text-lg sm:text-xl text-white/90 font-light leading-relaxed">
              {p.vision.text}
            </p>
          </div>

          {/* Our Mission Card (Lush Green Capsule Bento) */}
          <div className="op-vm-card group relative rounded-[32px] bg-gradient-to-br from-[#22660F]/90 via-[#1b520c]/90 to-[#123808]/95 backdrop-blur-xl border border-white/20 hover:border-[#66E347]/60 p-8 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#4A2368]/35 blur-3xl pointer-events-none group-hover:bg-[#4A2368]/50 transition-colors" />

            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#4A2368]/80 border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#98f580]">
                {p.mission.tag}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-[#4A2368] border border-white/20 flex items-center justify-center text-[#66E347] group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {p.mission.title}
            </h2>
            <p className="text-lg sm:text-xl text-white/90 font-light leading-relaxed">
              {p.mission.text}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. BUSINESS GOALS & OBJECTIVES (6 INTERACTIVE BENTO CARDS)
      ========================================================= */}
      <section
        id="goals"
        className="op-goals-section scroll-mt-24 relative py-14 sm:py-20 px-4 sm:px-6 lg:px-10 pb-24"
      >
        <div className="max-w-[1380px] mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <span className="inline-block rounded-full bg-[#4A2368]/80 border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#66E347] mb-3">
              {p.goalsSection.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              {p.goalsSection.title}
            </h2>
            <p className="text-base sm:text-lg text-white/80 font-light">
              {p.goalsSection.subtitle}
            </p>
          </div>

          {/* 6-Card Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {p.goalsSection.items.map((goal, idx) => (
              <div
                key={goal.num}
                className="op-goal-card group relative rounded-[28px] bg-white/[0.06] hover:bg-white/[0.11] backdrop-blur-xl border border-white/15 hover:border-[#66E347]/55 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-[0_14px_35px_rgba(0,0,0,0.28)] overflow-hidden"
              >
                <div>
                  {/* Top Row: Icon + Number Pill */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#4A2368] group-hover:bg-[#66E347] text-[#66E347] group-hover:text-[#0f2c09] border border-white/15 flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110">
                      {renderGoalIcon(idx)}
                    </div>
                    <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-bold tracking-wider text-white/75 group-hover:text-[#66E347] group-hover:border-[#66E347]/40 transition-colors">
                      {goal.num}
                    </span>
                  </div>

                  {/* Goal Title */}
                  <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-[#98f580] transition-colors mb-3">
                    {goal.title}
                  </h3>

                  {/* Goal Description */}
                  <p className="text-[15.5px] sm:text-[16.5px] text-white/85 font-light leading-relaxed">
                    {goal.desc}
                  </p>
                </div>

                {/* Bottom Animated Progress Line */}
                <div className="mt-7 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-10 group-hover:w-full bg-gradient-to-r from-[#4A2368] via-[#267312] to-[#66E347] transition-all duration-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          ARCHIVAL PHOTO LIGHTBOX MODAL
      ========================================================= */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full rounded-3xl bg-[#141118] border border-white/20 p-3 sm:p-5 shadow-2xl cursor-default"
          >
            <div className="flex items-center justify-between pb-3 px-2">
              <span className="text-xs sm:text-sm font-semibold text-amber-300 tracking-wider uppercase">
                {p.historySection.photoCaption}
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>
            <img
              src={warehouseImg}
              alt={p.historySection.photoCaption}
              className="w-full max-h-[78vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </main>
  );
}

