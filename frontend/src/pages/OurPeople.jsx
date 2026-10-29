import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '@assets/photos/logo.png';
import bgLeavesImg from '@assets/photos/fresh-green-tea-leaves-lush-plantation.jpg';
import taglineMapImg from '@assets/photos/taglinewithmap.png';

gsap.registerPlugin(ScrollTrigger);

export default function OurPeople() {
  const { lang, t } = useLanguage();
  const pageRef = useRef(null);
  const businessCardRef = useRef(null);
  const cardGlareRef = useRef(null);

  const tp = t.teamPage;

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(tp.members[0].id);
  const [copiedId, setCopiedId] = useState(null);

  const filteredMembers =
    activeFilter === 'all'
      ? tp.members
      : tp.members.filter((m) => m.department === activeFilter);

  const activeMember =
    tp.members.find((m) => m.id === selectedId) || tp.members[0];

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.tp-hero-anim',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.1 }
      )
        .fromTo(
          '.tp-roster-row',
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
          '-=0.35'
        )
        .fromTo(
          '.tp-sticky-card',
          { y: 35, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8 },
          '-=0.55'
        );

      gsap.fromTo(
        '.tp-grid-card',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.tp-grid-section',
            start: 'top 85%',
          },
        }
      );
    },
    { scope: pageRef }
  );

  // Animate the 3D Business Card whenever selected member changes
  const handleSelectMember = (id) => {
    if (id === selectedId) return;
    setSelectedId(id);

    if (businessCardRef.current) {
      gsap.fromTo(
        businessCardRef.current,
        { scale: 0.96, rotateX: -6, opacity: 0.75 },
        {
          scale: 1,
          rotateX: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'back.out(1.6)',
        }
      );
    }
  };

  // Interactive 3D tilt on the Digital Business Card
  const handleCardMouseMove = (e) => {
    if (!businessCardRef.current) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) return;
    const rect = businessCardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(businessCardRef.current, {
      rotateY: relX * 16,
      rotateX: -relY * 16,
      transformPerspective: 1100,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
      force3D: true,
    });

    if (cardGlareRef.current) {
      gsap.to(cardGlareRef.current, {
        x: relX * 180,
        y: relY * 180,
        opacity: 0.28,
        duration: 0.3,
        overwrite: 'auto',
      });
    }
  };

  const handleCardMouseLeave = () => {
    if (!businessCardRef.current) return;
    gsap.to(businessCardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.6)',
    });
    if (cardGlareRef.current) {
      gsap.to(cardGlareRef.current, { opacity: 0, duration: 0.4 });
    }
  };

  const handleCopyPhone = (phone, id) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 2200);
  };

  const formatWhatsAppUrl = (phone) => {
    const digits = phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${digits}`;
  };

  const formatTelUrl = (phone) => {
    return `tel:${phone.replace(/\s+/g, '')}`;
  };

  return (
    <main
      ref={pageRef}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="relative w-full min-h-screen bg-gradient-to-b from-[#13380A] via-[#0F2C09] to-[#163D0C] text-white overflow-hidden"
    >
      {/* Ambient Theme Glows (Royal Purple & Tea Green) */}
      <div className="pointer-events-none absolute top-28 -left-32 w-[500px] h-[500px] rounded-full bg-[#4A2368]/35 blur-[130px]" />
      <div className="pointer-events-none absolute top-[45%] -right-32 w-[480px] h-[480px] rounded-full bg-[#66E347]/12 blur-[140px]" />

      {/* =========================================================
          1. ARCHITECTURAL CURVED ROYAL-PURPLE & GREEN HEADER BAND
      ========================================================= */}
      <section className="relative bg-gradient-to-br from-[#2B113F]/95 via-[#4A2368]/90 to-[#1A4E0D]/95 text-white pt-32 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-10 rounded-b-[44px] sm:rounded-b-[64px] border-b border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.45)] overflow-hidden">
        {/* Subtle Tea Leaves Texture & Map Watermark */}
        <img
          src={bgLeavesImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-15 pointer-events-none"
        />
        <img
          src={taglineMapImg}
          alt=""
          aria-hidden="true"
          className="absolute right-[-4%] top-8 w-[480px] lg:w-[620px] opacity-15 mix-blend-screen pointer-events-none select-none"
        />

        {/* Decorative Geometric Grid Lines */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative z-10 max-w-[1380px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="tp-hero-anim inline-flex items-center gap-2.5 rounded-full bg-white/12 backdrop-blur-md border border-white/20 px-4 py-1.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#66E347] animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#98f580]">
                {tp.badge}
              </span>
            </div>

            <h1 className="tp-hero-anim text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              {tp.title}
            </h1>

            <p className="tp-hero-anim text-lg sm:text-xl text-white/85 font-light leading-relaxed mt-4">
              {tp.subtitle}
            </p>
          </div>

          {/* Department Filter Capsule Bar */}
          <div className="tp-hero-anim flex flex-wrap items-center gap-2 bg-black/30 backdrop-blur-xl p-1.5 rounded-3xl sm:rounded-full border border-white/15 self-start lg:self-end">
            {[
              { key: 'all', label: tp.filters.all },
              { key: 'executive', label: tp.filters.executive },
              { key: 'commercial', label: tp.filters.commercial },
              { key: 'operations', label: tp.filters.operations },
            ].map((tab) => {
              const active = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setActiveFilter(tab.key);
                    const firstMatch =
                      tab.key === 'all'
                        ? tp.members[0]
                        : tp.members.find((m) => m.department === tab.key);
                    if (firstMatch) setSelectedId(firstMatch.id);
                  }}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                    active
                      ? 'bg-[#66E347] text-[#0F2C09] font-semibold shadow-md'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          2. INTERACTIVE EXECUTIVE DIRECTORY + 3D DIGITAL PASS
      ========================================================= */}
      <section className="relative z-10 py-14 sm:py-20 px-4 sm:px-6 lg:px-10 max-w-[1380px] mx-auto">
        <div className="mb-6 flex items-center justify-between text-xs sm:text-sm text-white/75 font-light px-2">
          <span>{tp.actions.selectHint}</span>
          <span className="hidden sm:inline-block uppercase tracking-widest text-[#98f580] font-semibold">
            AL-NAOUR CITY • EXECUTIVE ROSTER
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT 7 COLUMNS: Interactive Accordion Roster */}
          <div className="lg:col-span-7 space-y-3.5">
            {filteredMembers.map((member, index) => {
              const isSelected = activeMember.id === member.id;
              const isFounder = member.tier === 'founder';
              const isCopied = copiedId === `roster-${member.id}`;

              return (
                <div
                  key={member.id}
                  onMouseEnter={() => handleSelectMember(member.id)}
                  onClick={() => handleSelectMember(member.id)}
                  className={`tp-roster-row group relative rounded-[28px] p-5 sm:p-6 transition-all duration-300 cursor-pointer border backdrop-blur-xl ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#4A2368]/90 via-[#3B1B54]/90 to-[#22660F]/80 text-white border-[#66E347]/65 shadow-[0_20px_45px_rgba(0,0,0,0.42)] -translate-y-0.5'
                      : 'bg-white/[0.06] hover:bg-white/[0.11] text-white border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.2)]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left: Number + Monogram Avatar + Name & Role */}
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs font-bold tracking-widest w-6 ${
                          isSelected ? 'text-[#66E347]' : 'text-white/45'
                        }`}
                      >
                        0{index + 1}
                      </span>

                      {/* Monogram Emblem */}
                      <div
                        className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-bold text-lg tracking-wider shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                          isFounder
                            ? 'bg-gradient-to-br from-[#D4AF37] via-[#B68D1C] to-[#8A6608] text-white shadow-md border border-amber-200/40'
                            : isSelected
                            ? 'bg-[#66E347] text-[#0F2C09]'
                            : 'bg-[#4A2368]/80 text-[#98f580] border border-white/15'
                        }`}
                      >
                        {member.initials}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                            {member.name}
                          </h2>
                          {isFounder && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
                              {lang === 'ar' ? 'مؤسس' : 'Executive Board'}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-sm sm:text-base font-medium mt-0.5 ${
                            isSelected ? 'text-[#98f580]' : 'text-white/75'
                          }`}
                        >
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {/* Right: Direct Phone Pill + Quick Copy/Call */}
                    <div
                      className="flex items-center gap-2 self-end sm:self-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href={formatTelUrl(member.phone)}
                        dir="ltr"
                        className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-colors flex items-center gap-2 border ${
                          isSelected
                            ? 'bg-black/30 hover:bg-black/45 text-white border-white/20'
                            : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                        }`}
                      >
                        <span>📞</span>
                        <span>{member.phone}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          handleCopyPhone(member.phone, `roster-${member.id}`)
                        }
                        className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          isCopied
                            ? 'bg-[#66E347] text-[#0f2c09]'
                            : isSelected
                            ? 'bg-white text-[#4A2368] hover:bg-[#98f580]'
                            : 'bg-[#4A2368] text-white hover:bg-[#5c2c82] border border-white/15'
                        }`}
                      >
                        {isCopied ? tp.actions.copied : tp.actions.copy}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Bio Drawer when Selected */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isSelected
                        ? 'max-h-28 opacity-100 mt-4 pt-3.5 border-t border-white/15'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm sm:text-[15px] text-white/90 font-light leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT 5 COLUMNS: Sticky 3D Interactive Executive Business Card */}
          <div className="tp-sticky-card lg:col-span-5 lg:sticky lg:top-28">
            <div
              ref={businessCardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className={`relative rounded-[32px] p-7 sm:p-8 text-white shadow-[0_28px_65px_rgba(0,0,0,0.5)] border overflow-hidden transition-colors duration-500 ${
                activeMember.tier === 'founder'
                  ? 'bg-gradient-to-br from-[#35164D] via-[#4A2368] to-[#1D0B2B] border-amber-300/45'
                  : 'bg-gradient-to-br from-[#1D570D] via-[#22660F] to-[#35164D] border-[#66E347]/40'
              }`}
            >
              {/* Holographic Mouse Glare */}
              <div
                ref={cardGlareRef}
                className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/30 blur-2xl opacity-0 z-20"
              />

              {/* Top Row inside Digital Business Card: Brand Pill + Department Badge */}
              <div className="relative z-10 flex items-center justify-between gap-3 mb-8">
                <div className="flex items-center gap-2.5 bg-white rounded-full px-3.5 py-1.5 shadow-md">
                  <img
                    src={logoImg}
                    alt="Al-Naour City"
                    className="h-7 w-auto object-contain"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#22660F] pr-1">
                    Al-Naour City
                  </span>
                </div>

                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/20 text-[#98f580]">
                  {activeMember.deptLabel}
                </span>
              </div>

              {/* Center Identity Block */}
              <div className="relative z-10 flex items-center gap-5 mb-7">
                <div
                  className={`w-20 h-20 rounded-3xl flex items-center justify-center text-2xl font-bold tracking-wider shadow-xl shrink-0 border ${
                    activeMember.tier === 'founder'
                      ? 'bg-gradient-to-br from-[#E5C158] via-[#C59B27] to-[#8F6B0A] text-white border-amber-200/50'
                      : 'bg-white/15 backdrop-blur-md text-[#66E347] border-white/25'
                  }`}
                >
                  {activeMember.initials}
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {activeMember.name}
                  </h3>
                  <p className="text-base sm:text-lg text-[#98f580] font-medium mt-1">
                    {activeMember.role}
                  </p>
                </div>
              </div>

              {/* Bio Summary */}
              <p className="relative z-10 text-sm sm:text-[15px] text-white/85 font-light leading-relaxed mb-7 bg-black/25 rounded-2xl p-4 border border-white/10">
                {activeMember.bio}
              </p>

              {/* Direct Contact Details Box */}
              <div className="relative z-10 space-y-2.5 mb-7 text-sm">
                <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 border border-white/15">
                  <span className="text-white/75 text-xs uppercase tracking-wider">
                    {lang === 'ar' ? 'الهاتف المباشر' : 'Direct Line'}
                  </span>
                  <span dir="ltr" className="font-semibold text-base tracking-wide text-white">
                    {activeMember.phone}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 border border-white/15">
                  <span className="text-white/75 text-xs uppercase tracking-wider">
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </span>
                  <a
                    href={`mailto:${activeMember.email}`}
                    className="font-medium text-white hover:text-[#98f580] underline underline-offset-4"
                  >
                    {activeMember.email}
                  </a>
                </div>
              </div>

              {/* 2 Interactive Action Buttons on Business Card (Call Direct & WhatsApp) */}
              <div className="relative z-10 grid grid-cols-2 gap-3">
                <a
                  href={formatTelUrl(activeMember.phone)}
                  className="flex items-center justify-center gap-2 rounded-full bg-white text-[#4A2368] hover:bg-[#f3eaf8] font-semibold text-xs sm:text-sm py-3.5 px-4 shadow-md transition-transform hover:scale-[1.03]"
                >
                  <span>📞</span>
                  <span>{tp.actions.call}</span>
                </a>

                <a
                  href={formatWhatsAppUrl(activeMember.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#267312] hover:bg-[#308f17] text-white font-semibold text-xs sm:text-sm py-3.5 px-4 shadow-md border border-white/20 transition-transform hover:scale-[1.03]"
                >
                  <span>💬</span>
                  <span>{tp.actions.whatsapp}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. QUICK-DIAL ALL TEAM CARDS GRID (BOTTOM OVERVIEW)
      ========================================================= */}
      <section className="tp-grid-section relative z-10 py-12 sm:py-16 px-4 sm:px-6 lg:px-10 max-w-[1380px] mx-auto pb-24">
        <div className="border-t border-white/15 pt-12 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#66E347]">
              {lang === 'ar' ? 'دليل الاتصال المباشر' : 'DIRECT CONTACT CARDS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              {lang === 'ar'
                ? 'تواصل مباشرة مع فريق الإدارة'
                : 'Connect Directly With Our Team'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tp.members.map((member) => {
            const isFounder = member.tier === 'founder';
            const isCopied = copiedId === `grid-${member.id}`;

            return (
              <div
                key={member.id}
                onClick={() => handleSelectMember(member.id)}
                className="tp-grid-card group relative rounded-[28px] bg-white/[0.06] hover:bg-[#4A2368]/85 backdrop-blur-xl text-white border border-white/15 hover:border-[#66E347]/60 p-6 sm:p-7 shadow-[0_14px_35px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base ${
                        isFounder
                          ? 'bg-gradient-to-br from-[#D4AF37] to-[#9A740E] text-white border border-amber-200/40'
                          : 'bg-[#4A2368] group-hover:bg-[#66E347] text-[#98f580] group-hover:text-[#0F2C09] border border-white/15 transition-colors'
                      }`}
                    >
                      {member.initials}
                    </div>

                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 border border-white/10 text-[#98f580]">
                      {member.deptLabel}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-[#98f580] mt-1">
                    {member.role}
                  </p>
                </div>

                <div
                  className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={formatTelUrl(member.phone)}
                    dir="ltr"
                    className="text-sm sm:text-[15px] font-semibold text-white hover:text-[#98f580] hover:underline"
                  >
                    {member.phone}
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyPhone(member.phone, `grid-${member.id}`)
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                        isCopied
                          ? 'bg-[#66E347] text-[#0f2c09]'
                          : 'bg-white/12 hover:bg-white/25 text-white'
                      }`}
                    >
                      {isCopied ? tp.actions.copied : tp.actions.copy}
                    </button>

                    <a
                      href={formatWhatsAppUrl(member.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="WhatsApp"
                      className="w-8 h-8 rounded-full bg-[#267312] hover:bg-[#308f17] text-white flex items-center justify-center text-xs hover:scale-110 transition-transform"
                    >
                      💬
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
