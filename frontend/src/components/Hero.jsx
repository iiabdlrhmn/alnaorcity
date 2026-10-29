import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';
import canImg from '@assets/photos/can.png';
import bgLeavesImg from '@assets/photos/fresh-green-tea-leaves-lush-plantation.jpg';
import secondPhotoImg from '@assets/photos/second_photo.jpg';
import thirdPhotoImg from '@assets/photos/third_photo.jpg';
import taglineMapImg from '@assets/photos/taglinewithmap.png';

gsap.registerPlugin(Draggable);

const SLIDES = [
  {
    id: 0,
    image: bgLeavesImg,
    alt: 'Fresh Green Tea Leaves Plantation - Al-Khan Tea',
  },
  {
    id: 1,
    image: secondPhotoImg,
    alt: 'Al-Khan Tea Fleet & Distribution Truck',
  },
  {
    id: 2,
    image: thirdPhotoImg,
    alt: 'Al-Khan Tea Team & Community Reach',
  },
];

const AUTO_CYCLE_MS = 5000;

export default function Hero() {
  const heroRef = useRef(null);
  const slideImgRefs = useRef([]);
  const canWrapperRef = useRef(null);
  const canInnerRef = useRef(null);
  const shadowRef = useRef(null);
  const mapWrapperRef = useRef(null);
  const returnTimerRef = useRef(null);
  const floatTweenRef = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isWaitingToReturn, setIsWaitingToReturn] = useState(false);

  // Transition between the 3 background photos while keeping Tea Can & Iraq Map on top
  const goToSlide = useCallback(
    (nextIndex) => {
      if (nextIndex === activeSlide) return;

      const prevImg = slideImgRefs.current[activeSlide];
      const nextImg = slideImgRefs.current[nextIndex];

      // Crossfade & subtle Ken Burns effect on background images
      if (prevImg) {
        gsap.to(prevImg, {
          opacity: 0,
          scale: 1.08,
          duration: 1.2,
          ease: 'power2.inOut',
          overwrite: 'auto',
        });
      }

      if (nextImg) {
        gsap.fromTo(
          nextImg,
          { opacity: 0, scale: 1.12 },
          {
            opacity: 1,
            scale: 1.02,
            duration: 1.4,
            ease: 'power2.out',
            overwrite: 'auto',
          }
        );
      }

      setActiveSlide(nextIndex);
    },
    [activeSlide]
  );

  useGSAP(
    () => {
      // Initialize slide opacities
      slideImgRefs.current.forEach((img, idx) => {
        if (!img) return;
        gsap.set(img, {
          opacity: idx === 0 ? 1 : 0,
          scale: idx === 0 ? 1.03 : 1.1,
        });
      });

      // 1. Entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        slideImgRefs.current[0],
        { scale: 1.14, filter: 'brightness(0.7)' },
        { scale: 1.02, filter: 'brightness(1)', duration: 2.0, ease: 'power2.out' }
      )
        .fromTo(
          canWrapperRef.current,
          { y: 70, opacity: 0, scale: 0.88 },
          { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'back.out(1.4)' },
          '-=1.5'
        )
        .fromTo(
          mapWrapperRef.current,
          { x: 50, opacity: 0, scale: 0.94 },
          { x: 0, opacity: 1, scale: 1, duration: 1.1 },
          '-=0.9'
        )
        .fromTo(
          '.hero-dot',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          '-=0.6'
        );

      // 2. Continuous gentle floating idle animation on the inner jar
      floatTweenRef.current = gsap.to(canInnerRef.current, {
        y: -12,
        rotation: 1.2,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(shadowRef.current, {
        scale: 0.85,
        opacity: 0.35,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 3. GSAP Draggable for the Tea Jar with 2.5s auto-return
      let lastX = 0;

      const draggableInstance = Draggable.create(canWrapperRef.current, {
        type: 'x,y',
        bounds: heroRef.current,
        edgeResistance: 0.65,
        inertia: false,
        onPress() {
          if (returnTimerRef.current) {
            clearTimeout(returnTimerRef.current);
            returnTimerRef.current = null;
          }
          gsap.killTweensOf(canWrapperRef.current);
          setIsDragging(true);
          setIsWaitingToReturn(false);

          if (floatTweenRef.current) {
            floatTweenRef.current.pause();
          }

          lastX = this.x;

          gsap.to(canInnerRef.current, {
            scale: 1.06,
            y: 0,
            duration: 0.25,
            ease: 'power2.out',
          });
        },
        onDrag() {
          const deltaX = this.x - lastX;
          lastX = this.x;
          const clampedTilt = gsap.utils.clamp(-14, 14, deltaX * 0.75);

          gsap.to(canInnerRef.current, {
            rotation: clampedTilt,
            duration: 0.2,
            overwrite: 'auto',
          });
        },
        onRelease() {
          setIsDragging(false);

          gsap.to(canInnerRef.current, {
            rotation: 0,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out',
          });

          if (Math.abs(this.x) < 4 && Math.abs(this.y) < 4) {
            gsap.to(canWrapperRef.current, {
              x: 0,
              y: 0,
              duration: 0.4,
              ease: 'power2.out',
            });
            gsap.to(canInnerRef.current, { scale: 1, duration: 0.3 });
            if (floatTweenRef.current) floatTweenRef.current.resume();
            return;
          }

          setIsWaitingToReturn(true);

          // Wait 2.5 seconds (between 2 - 3 sec), then smoothly return to original place
          returnTimerRef.current = setTimeout(() => {
            setIsWaitingToReturn(false);

            gsap.to(canWrapperRef.current, {
              x: 0,
              y: 0,
              duration: 1.15,
              ease: 'elastic.out(1, 0.68)',
              onComplete: () => {
                if (floatTweenRef.current) {
                  floatTweenRef.current.resume();
                }
              },
            });

            gsap.to(canInnerRef.current, {
              scale: 1,
              rotation: 0,
              duration: 0.7,
              ease: 'power3.out',
            });
          }, 2500);
        },
      });

      return () => {
        if (returnTimerRef.current) clearTimeout(returnTimerRef.current);
        if (draggableInstance[0]) draggableInstance[0].kill();
      };
    },
    { scope: heroRef }
  );

  // Automatic cycling across all 3 photos
  useEffect(() => {
    const timer = setTimeout(() => {
      const next = (activeSlide + 1) % SLIDES.length;
      goToSlide(next);
    }, AUTO_CYCLE_MS);

    return () => clearTimeout(timer);
  }, [activeSlide, goToSlide]);

  // Subtle mouse-move parallax for active background and map outline
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    const currentBg = slideImgRefs.current[activeSlide];
    if (currentBg) {
      gsap.to(currentBg, {
        x: relX * -16,
        y: relY * -16,
        duration: 1.2,
        ease: 'power2.out',
      });
    }

    if (mapWrapperRef.current) {
      gsap.to(mapWrapperRef.current, {
        x: relX * 16,
        y: relY * 12,
        duration: 1.0,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[640px] sm:h-[700px] lg:h-[780px] pt-24 sm:pt-28 overflow-hidden select-none bg-[#0d2607]"
    >
      {/* 3 Background Slide Photos */}
      {SLIDES.map((slide, idx) => (
        <img
          key={slide.id}
          ref={(el) => (slideImgRefs.current[idx] = el)}
          src={slide.image}
          alt={slide.alt}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none will-change-transform"
          draggable={false}
        />
      ))}

      {/* Subtle Vignette, Top Header Readability Gradient & Bottom Shadow Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.08) 25%), radial-gradient(circle at 55% 45%, rgba(0,0,0,0.12) 35%, rgba(0,0,0,0.45) 100%), linear-gradient(to top, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.14) 28%, rgba(0,0,0,0) 58%)',
        }}
      />

      {/* Foreground Content Always on Top: Draggable Tea Jar + Iraq Map Outline */}
      <div className="relative z-20 max-w-[1400px] mx-auto w-full h-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 lg:px-20">
        {/* Left: Draggable Al-Khan Tea Jar */}
        <div className="relative flex items-center justify-center md:w-[42%] h-full pt-4 md:pt-0">
          <div
            ref={canWrapperRef}
            className="relative z-20 cursor-grab active:cursor-grabbing touch-none flex flex-col items-center group"
            title="Drag me around!"
          >
            <div ref={canInnerRef} className="relative will-change-transform">
              <img
                src={canImg}
                alt="Al-Khan Tea - شاي الخان"
                className="w-[185px] sm:w-[230px] lg:w-[275px] xl:w-[295px] h-auto object-contain drop-shadow-[0_22px_32px_rgba(0,0,0,0.65)] select-none pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Contact shadow under the tea tin */}
            <div
              ref={shadowRef}
              className="w-[72%] h-5 bg-black/55 blur-md rounded-full -mt-3 pointer-events-none"
            />
          </div>
        </div>

        {/* Right: Iraq Map Outline & Tagline ("Iraqi Roots. Global Reach. / جذور عراقية . وصول عالمي") */}
        <div className="relative flex items-center justify-center md:w-[58%] h-full pb-12 md:pb-0">
          <div
            ref={mapWrapperRef}
            className="relative w-full max-w-[540px] lg:max-w-[660px] xl:max-w-[730px] pointer-events-none will-change-transform"
          >
            <img
              src={taglineMapImg}
              alt="Iraqi Roots. Global Reach. - جذور عراقية . وصول عالمي"
              className="w-full h-auto object-contain mix-blend-screen drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Bottom Center Slider Dots (● ○ ○) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3.5">
        {SLIDES.map((slide, idx) => {
          const isActive = activeSlide === idx;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`hero-dot w-3.5 h-3.5 rounded-full border-[2px] border-white transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-white scale-115 shadow-[0_0_10px_rgba(255,255,255,0.9)]'
                  : 'bg-transparent hover:bg-white/40'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
