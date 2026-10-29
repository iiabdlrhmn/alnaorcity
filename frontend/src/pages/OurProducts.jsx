import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import bgLeavesImg from '@assets/photos/fresh-green-tea-leaves-lush-plantation.jpg';
import taglineMapImg from '@assets/photos/taglinewithmap.png';

// Import all 31 product PNGs from assets/photos/products
import bobaTeaImg from '@assets/photos/products/Al-khan Boba Tea.png';
import branOil1000Img from '@assets/photos/products/Al-khan Bran Oil 1000ml.png';
import branOil2000Img from '@assets/photos/products/Al-khan Bran Oil 2000ml.png';
import branOil5000Img from '@assets/photos/products/Al-khan Bran Oil 5000ml.png';
import karak1kgCardamomImg from '@assets/photos/products/Al-khan Karak Tea 1kg with Cardamom.png';
import karak1kgCinnamonImg from '@assets/photos/products/Al-khan Karak Tea 1kg with Cinnamon.png';
import karak1kgHotChocImg from '@assets/photos/products/Al-khan Karak Tea 1kg with hot chocolate.png';
import karak1kgSaffronImg from '@assets/photos/products/Al-khan Karak Tea 1kg with Saffron.png';
import karak1kgOriginalImg from '@assets/photos/products/Al-khan Karak Tea 1kg.png';
import karak25gHotChocImg from '@assets/photos/products/Al-khan Karak Tea 25g  with hot chocolate.png';
import karak25gCardamomImg from '@assets/photos/products/Al-khan Karak Tea 25g with Cardamom.png';
import karak25gCinnamonImg from '@assets/photos/products/Al-khan Karak Tea 25g with Cinnamon.png';
import karak25gSaffronImg from '@assets/photos/products/PHOTO-2026-05-09-18-50-15 copy.png';
import oliveOil1000Img from '@assets/photos/products/Al-khan Olive Oil 1000ml.png';
import oliveOil250Img from '@assets/photos/products/Al-khan Olive Oil 250ml.png';
import oliveOil5000Img from '@assets/photos/products/Al-khan Olive Oil 5000ml.png';
import tea10kgGoldenImg from '@assets/photos/products/Al-khan Tea 10kg Golden.png';
import tea1kgBagBlueRoseImg from '@assets/photos/products/Al-khan Tea 1kg Bag with cardamom and Blue Rose.png';
import tea1kgBoxCardamomImg from '@assets/photos/products/Al-khan Tea 1kg box with cardamom.png';
import tea1kgGoldenImg from '@assets/photos/products/Al-khan Tea 1kg Golden.png';
import tea1kgTinBlueRoseImg from '@assets/photos/products/Al-khan Tea 1kg with cardamom and Blue Rose.png';
import tea1kgPinkRoseImg from '@assets/photos/products/Al-khan Tea 1Kg with cardamom and Pink Rose.png';
import tea1kgCardamomImg from '@assets/photos/products/Al-khan Tea 1kg with cardamom.png';
import tea200gBlueRoseImg from '@assets/photos/products/Al-khan Tea 200g with cardamom and Blue Rose.png';
import tea200gPinkRoseImg from '@assets/photos/products/Al-khan Tea 200g with cardamom and pink Rose.png';
import tea200gCardamomImg from '@assets/photos/products/Al-khan Tea 200g with cardamom.png';
import tea500gBlueRoseImg from '@assets/photos/products/Al-khan Tea 500g with cardamom and Blue Rose.png';
import tea500gPinkRoseImg from '@assets/photos/products/Al-khan Tea 500g with cardamom with Pink Rose.png';
import tea500gCardamomImg from '@assets/photos/products/Al-khan Tea 500g with cardamom.png';
import tea5kgBagBlueRoseImg from '@assets/photos/products/Al-khan Tea 5kg Bag with cardamom and Blue Rose.png';
import tea800gOpaImg from '@assets/photos/products/Al-khan Tea 800g OPA.png';

gsap.registerPlugin(Draggable, ScrollTrigger);

export const PRODUCTS_DATA = [
  // ================= LOOSE & FLAVORED TEA (15) =================
  {
    id: 'tea-1kg-cardamom',
    category: 'tea',
    sizeGroup: 'medium',
    size: '1 kg Tin',
    image: tea1kgCardamomImg,
    enName: 'Al-Khan Tea with Cardamom',
    arName: 'شاي الخان بالهيل الفاخر',
    enTag: 'Natural Cardamom Aroma',
    arTag: 'نكهة الهيل الطبيعي الأصيل',
    accent: '#22660F',
  },
  {
    id: 'tea-1kg-golden',
    category: 'tea',
    sizeGroup: 'medium',
    size: '1 kg Golden',
    image: tea1kgGoldenImg,
    enName: 'Al-Khan Golden Blend Tea',
    arName: 'شاي الخان الخلطة الذهبية',
    enTag: 'Royal Golden Selection',
    arTag: 'مذاق ملكي فاخر',
    accent: '#D4AF37',
  },
  {
    id: 'tea-1kg-tin-bluerose',
    category: 'tea',
    sizeGroup: 'medium',
    size: '1 kg Tin',
    image: tea1kgTinBlueRoseImg,
    enName: 'Al-Khan Tea with Cardamom & Blue Rose',
    arName: 'شاي الخان بالهيل والورد الأزرق (علبة)',
    enTag: 'Cardamom & Blue Rose Infusion',
    arTag: 'مزيج الهيل والورد الأزرق',
    accent: '#3B4CCA',
  },
  {
    id: 'tea-1kg-pinkrose',
    category: 'tea',
    sizeGroup: 'medium',
    size: '1 kg Tin',
    image: tea1kgPinkRoseImg,
    enName: 'Al-Khan Tea with Cardamom & Pink Rose',
    arName: 'شاي الخان بالهيل والورد الوردي',
    enTag: 'Cardamom & Damask Pink Rose',
    arTag: 'بالهيل والورد الجوري',
    accent: '#C23B78',
  },
  {
    id: 'tea-1kg-box-cardamom',
    category: 'tea',
    sizeGroup: 'medium',
    size: '1 kg Box',
    image: tea1kgBoxCardamomImg,
    enName: 'Al-Khan Tea with Cardamom (Box)',
    arName: 'شاي الخان بالهيل (عبوة كارتون)',
    enTag: 'Classic Family Pack',
    arTag: 'العبوة العائلية الكلاسيكية',
    accent: '#22660F',
  },
  {
    id: 'tea-1kg-bag-bluerose',
    category: 'tea',
    sizeGroup: 'medium',
    size: '1 kg Bag',
    image: tea1kgBagBlueRoseImg,
    enName: 'Al-Khan Tea with Cardamom & Blue Rose (Bag)',
    arName: 'شاي الخان بالهيل والورد الأزرق (كيس)',
    enTag: 'Freshness Sealed Pouch',
    arTag: 'كيس محكم لحفظ النكهة',
    accent: '#3B4CCA',
  },
  {
    id: 'tea-800g-opa',
    category: 'tea',
    sizeGroup: 'small',
    size: '800 g',
    image: tea800gOpaImg,
    enName: 'Al-Khan Pure Ceylon OPA Tea',
    arName: 'شاي الخان سيلاني خالص (OPA)',
    enTag: 'Large Leaf Orange Pekoe A',
    arTag: 'أوراق شاي سيلاني طويلة فاخرة',
    accent: '#4A2368',
  },
  {
    id: 'tea-500g-cardamom',
    category: 'tea',
    sizeGroup: 'small',
    size: '500 g',
    image: tea500gCardamomImg,
    enName: 'Al-Khan Tea with Cardamom (500g)',
    arName: 'شاي الخان بالهيل (٥٠٠ غرام)',
    enTag: 'Rich Cardamom Blend',
    arTag: 'غني بنكهة الهيل الطبيعي',
    accent: '#22660F',
  },
  {
    id: 'tea-500g-bluerose',
    category: 'tea',
    sizeGroup: 'small',
    size: '500 g',
    image: tea500gBlueRoseImg,
    enName: 'Al-Khan Tea with Cardamom & Blue Rose (500g)',
    arName: 'شاي الخان بالهيل والورد الأزرق (٥٠٠ غرام)',
    enTag: 'Floral & Aromatic',
    arTag: 'عطر الورد الأزرق والهيل',
    accent: '#3B4CCA',
  },
  {
    id: 'tea-500g-pinkrose',
    category: 'tea',
    sizeGroup: 'small',
    size: '500 g',
    image: tea500gPinkRoseImg,
    enName: 'Al-Khan Tea with Cardamom & Pink Rose (500g)',
    arName: 'شاي الخان بالهيل والورد الوردي (٥٠٠ غرام)',
    enTag: 'Delicate Rose & Cardamom',
    arTag: 'مذاق الورد الوردي والهيل',
    accent: '#C23B78',
  },
  {
    id: 'tea-200g-cardamom',
    category: 'tea',
    sizeGroup: 'small',
    size: '200 g',
    image: tea200gCardamomImg,
    enName: 'Al-Khan Tea with Cardamom (200g)',
    arName: 'شاي الخان بالهيل (٢٠٠ غرام)',
    enTag: 'Everyday Fresh Pack',
    arTag: 'عبوة الاستخدام اليومي',
    accent: '#22660F',
  },
  {
    id: 'tea-200g-bluerose',
    category: 'tea',
    sizeGroup: 'small',
    size: '200 g',
    image: tea200gBlueRoseImg,
    enName: 'Al-Khan Tea with Cardamom & Blue Rose (200g)',
    arName: 'شاي الخان بالهيل والورد الأزرق (٢٠٠ غرام)',
    enTag: 'Botanical Infusion',
    arTag: 'توليفة الورد الأزرق والهيل',
    accent: '#3B4CCA',
  },
  {
    id: 'tea-200g-pinkrose',
    category: 'tea',
    sizeGroup: 'small',
    size: '200 g',
    image: tea200gPinkRoseImg,
    enName: 'Al-Khan Tea with Cardamom & Pink Rose (200g)',
    arName: 'شاي الخان بالهيل والورد الوردي (٢٠٠ غرام)',
    enTag: 'Aromatic Pink Rose Blend',
    arTag: 'توليفة الورد الوردي والهيل',
    accent: '#C23B78',
  },
  {
    id: 'tea-5kg-bag-bluerose',
    category: 'tea',
    sizeGroup: 'bulk',
    size: '5 kg Bag',
    image: tea5kgBagBlueRoseImg,
    enName: 'Al-Khan Tea with Cardamom & Blue Rose (5kg)',
    arName: 'شاي الخان بالهيل والورد الأزرق (٥ كغم)',
    enTag: 'Hospitality & Catering Pack',
    arTag: 'العبوة الاقتصادية للمقاهي والعائلات',
    accent: '#3B4CCA',
  },
  {
    id: 'tea-10kg-golden',
    category: 'tea',
    sizeGroup: 'bulk',
    size: '10 kg Golden',
    image: tea10kgGoldenImg,
    enName: 'Al-Khan Golden Tea (10kg Bulk)',
    arName: 'شاي الخان الذهبي (١٠ كغم)',
    enTag: 'Master Wholesale & Café Pack',
    arTag: 'العبوة الذهبية الكبرى',
    accent: '#D4AF37',
  },

  // ================= KARAK TEA COLLECTION (9) =================
  {
    id: 'karak-1kg-original',
    category: 'karak',
    sizeGroup: 'medium',
    size: '1 kg',
    image: karak1kgOriginalImg,
    enName: 'Al-Khan Original Karak Tea',
    arName: 'شاي كرك الخان الأصلي (١ كغم)',
    enTag: 'Rich & Creamy Traditional Karak',
    arTag: 'مذاق الكرك الغني والأصيل',
    accent: '#4A2368',
  },
  {
    id: 'karak-1kg-cardamom',
    category: 'karak',
    sizeGroup: 'medium',
    size: '1 kg',
    image: karak1kgCardamomImg,
    enName: 'Al-Khan Karak Tea with Cardamom',
    arName: 'شاي كرك الخان بالهيل (١ كغم)',
    enTag: 'Spiced Green Cardamom Karak',
    arTag: 'كرك فاخر ممزوج بالهيل',
    accent: '#22660F',
  },
  {
    id: 'karak-1kg-saffron',
    category: 'karak',
    sizeGroup: 'medium',
    size: '1 kg',
    image: karak1kgSaffronImg,
    enName: 'Al-Khan Karak Tea with Saffron',
    arName: 'شاي كرك الخان بالزعفران (١ كغم)',
    enTag: 'Luxurious Royal Saffron Blend',
    arTag: 'كرك ملكي بنكهة الزعفران',
    accent: '#D4AF37',
  },
  {
    id: 'karak-1kg-cinnamon',
    category: 'karak',
    sizeGroup: 'medium',
    size: '1 kg',
    image: karak1kgCinnamonImg,
    enName: 'Al-Khan Karak Tea with Cinnamon',
    arName: 'شاي كرك الخان بالقرفة (١ كغم)',
    enTag: 'Warm Aromatic Cinnamon',
    arTag: 'كرك دافئ بنكهة الدارسين',
    accent: '#9E4718',
  },
  {
    id: 'karak-1kg-hotchoc',
    category: 'karak',
    sizeGroup: 'medium',
    size: '1 kg',
    image: karak1kgHotChocImg,
    enName: 'Al-Khan Karak Tea with Hot Chocolate',
    arName: 'شاي كرك الخان بالشوكولاتة الساخنة (١ كغم)',
    enTag: 'Velvety Cocoa & Karak Fusion',
    arTag: 'مزيج الكرك والشوكولاتة الفاخرة',
    accent: '#5E2C18',
  },
  {
    id: 'karak-25g-saffron',
    category: 'karak',
    sizeGroup: 'sachet',
    size: '25 g Sachet',
    image: karak25gSaffronImg,
    enName: 'Al-Khan Karak Tea with Saffron (25g)',
    arName: 'شاي كرك الخان بالزعفران (٢٥ غرام)',
    enTag: 'Instant Single-Serve Sachet',
    arTag: 'ظرف سريع التحضير بالزعفران',
    accent: '#D4AF37',
  },
  {
    id: 'karak-25g-cardamom',
    category: 'karak',
    sizeGroup: 'sachet',
    size: '25 g Sachet',
    image: karak25gCardamomImg,
    enName: 'Al-Khan Karak Tea with Cardamom (25g)',
    arName: 'شاي كرك الخان بالهيل (٢٥ غرام)',
    enTag: 'Instant Single-Serve Sachet',
    arTag: 'ظرف سريع التحضير بالهيل',
    accent: '#22660F',
  },
  {
    id: 'karak-25g-cinnamon',
    category: 'karak',
    sizeGroup: 'sachet',
    size: '25 g Sachet',
    image: karak25gCinnamonImg,
    enName: 'Al-Khan Karak Tea with Cinnamon (25g)',
    arName: 'شاي كرك الخان بالقرفة (٢٥ غرام)',
    enTag: 'Instant Single-Serve Sachet',
    arTag: 'ظرف سريع التحضير بالقرفة',
    accent: '#9E4718',
  },
  {
    id: 'karak-25g-hotchoc',
    category: 'karak',
    sizeGroup: 'sachet',
    size: '25 g Sachet',
    image: karak25gHotChocImg,
    enName: 'Al-Khan Karak Tea with Hot Chocolate (25g)',
    arName: 'شاي كرك الخان بالشوكولاتة الساخنة (٢٥ غرام)',
    enTag: 'Instant Single-Serve Sachet',
    arTag: 'ظرف سريع التحضير بالشوكولاتة',
    accent: '#5E2C18',
  },

  // ================= OILS COLLECTION (6) =================
  {
    id: 'olive-oil-1000ml',
    category: 'oils',
    sizeGroup: 'medium',
    size: '1000 ml',
    image: oliveOil1000Img,
    enName: 'Al-Khan Aegean Harvest Olive Oil (1L)',
    arName: 'زيت زيتون الخان الفاخر (١٠٠٠ مل)',
    enTag: 'Finest Low-Acid Aegean Olive Oil',
    arTag: 'زيت زيتون نقي للطبخ والقلي والسلطة',
    accent: '#22660F',
  },
  {
    id: 'olive-oil-250ml',
    category: 'oils',
    sizeGroup: 'small',
    size: '250 ml',
    image: oliveOil250Img,
    enName: 'Al-Khan Aegean Harvest Olive Oil (250ml)',
    arName: 'زيت زيتون الخان الفاخر (٢٥٠ مل)',
    enTag: 'Tabletop Glass Bottle',
    arTag: 'عبوة المائدة الزجاجية الفاخرة',
    accent: '#22660F',
  },
  {
    id: 'olive-oil-5000ml',
    category: 'oils',
    sizeGroup: 'bulk',
    size: '5000 ml',
    image: oliveOil5000Img,
    enName: 'Al-Khan Aegean Harvest Olive Oil (5L)',
    arName: 'زيت زيتون الخان الفاخر (٥٠٠٠ مل)',
    enTag: 'Family & Culinary Bulk Pack',
    arTag: 'العبوة العائلية الكبرى ٥ لتر',
    accent: '#22660F',
  },
  {
    id: 'bran-oil-1000ml',
    category: 'oils',
    sizeGroup: 'medium',
    size: '1000 ml',
    image: branOil1000Img,
    enName: 'Al-Khan 100% Pure Rice Bran Oil (1L)',
    arName: 'زيت نخالة الأرز النقي الخان (١٠٠٠ مل)',
    enTag: '10,000 PPM Oryzanol • High Smoke Point',
    arTag: 'غني بالأوريزانول وفيتامين E الصحي',
    accent: '#D4AF37',
  },
  {
    id: 'bran-oil-2000ml',
    category: 'oils',
    sizeGroup: 'medium',
    size: '2000 ml',
    image: branOil2000Img,
    enName: 'Al-Khan 100% Pure Rice Bran Oil (2L)',
    arName: 'زيت نخالة الأرز النقي الخان (٢٠٠٠ مل)',
    enTag: 'Heart-Healthy Omega 3 & 6',
    arTag: 'صحي للقلب ومثالي للقلي والطبخ',
    accent: '#D4AF37',
  },
  {
    id: 'bran-oil-5000ml',
    category: 'oils',
    sizeGroup: 'bulk',
    size: '5000 ml',
    image: branOil5000Img,
    enName: 'Al-Khan 100% Pure Rice Bran Oil (5L)',
    arName: 'زيت نخالة الأرز النقي الخان (٥٠٠٠ مل)',
    enTag: 'Family Value 5-Liter Pack',
    arTag: 'العبوة العائلية الاقتصادية ٥ لتر',
    accent: '#D4AF37',
  },

  // ================= BOBA TEA (1) =================
  {
    id: 'boba-tea-can',
    category: 'boba',
    sizeGroup: 'sachet',
    size: 'Ready Can',
    image: bobaTeaImg,
    enName: 'Al-Khan Brown Sugar Boba Tea',
    arName: 'شاي الفقاعات (بوبا) الخان بالسكر البني',
    enTag: 'Authentic Iraqi Identity • Lower Calories',
    arTag: 'هوية عراقية أصيلة • طعم ألذ وسعرات أقل',
    accent: '#4A2368',
  },
];

/**
 * Reusable GSAP Draggable Product Component!
 * Every product can be grabbed, dragged freely with tilt physics,
 * and automatically springs back to its original place after 2.5 seconds.
 */
function DraggableProductItem({
  src,
  alt,
  imgClassName,
  floatAmplitude = 8,
  floatDuration = 2.4,
  isStage = false,
  onSelect,
}) {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);
  const shadowRef = useRef(null);
  const returnTimerRef = useRef(null);
  const floatTweenRef = useRef(null);
  const shadowTweenRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useGSAP(
    () => {
      const randomDelay = Math.random() * 1.2;

      floatTweenRef.current = gsap.to(innerRef.current, {
        y: -floatAmplitude,
        rotation: 0.8,
        duration: floatDuration,
        delay: randomDelay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        force3D: true,
        paused: true,
      });

      shadowTweenRef.current = gsap.to(shadowRef.current, {
        scale: 0.85,
        opacity: 0.32,
        duration: floatDuration,
        delay: randomDelay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        force3D: true,
        paused: true,
      });

      // Only animate floating when card is visible in viewport (huge FPS boost!)
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            floatTweenRef.current?.resume();
            shadowTweenRef.current?.resume();
          } else {
            floatTweenRef.current?.pause();
            shadowTweenRef.current?.pause();
          }
        },
        { threshold: 0.05 }
      );

      if (wrapperRef.current) {
        observer.observe(wrapperRef.current);
      }

      let lastX = 0;
      const rotQuick = gsap.quickTo(innerRef.current, 'rotation', {
        duration: 0.16,
        ease: 'power2.out',
      });

      const dragInstance = Draggable.create(wrapperRef.current, {
        type: 'x,y',
        inertia: false,
        onPress() {
          if (returnTimerRef.current) {
            clearTimeout(returnTimerRef.current);
            returnTimerRef.current = null;
          }
          gsap.killTweensOf(wrapperRef.current);
          setIsDragging(true);
          setIsWaiting(false);

          floatTweenRef.current?.pause();
          shadowTweenRef.current?.pause();

          lastX = this.x;

          gsap.to(innerRef.current, {
            scale: 1.09,
            y: 0,
            duration: 0.2,
            ease: 'power2.out',
            force3D: true,
          });
        },
        onDrag() {
          const deltaX = this.x - lastX;
          lastX = this.x;
          const tilt = gsap.utils.clamp(-15, 15, deltaX * 0.8);
          rotQuick(tilt);
        },
        onRelease() {
          setIsDragging(false);

          gsap.to(innerRef.current, {
            rotation: 0,
            scale: 1.03,
            duration: 0.3,
            ease: 'power2.out',
            force3D: true,
          });

          // If it was a quick click rather than a drag, trigger onSelect
          if (Math.abs(this.x) < 5 && Math.abs(this.y) < 5) {
            gsap.to(wrapperRef.current, {
              x: 0,
              y: 0,
              duration: 0.25,
              ease: 'power2.out',
              force3D: true,
            });
            gsap.to(innerRef.current, { scale: 1, duration: 0.2 });
            floatTweenRef.current?.resume();
            shadowTweenRef.current?.resume();
            if (onSelect) onSelect();
            return;
          }

          setIsWaiting(true);

          // Wait 2.5 seconds (between 2 - 3 sec), then smoothly return to its original spot
          returnTimerRef.current = setTimeout(() => {
            setIsWaiting(false);

            gsap.to(wrapperRef.current, {
              x: 0,
              y: 0,
              duration: 1.15,
              ease: 'elastic.out(1, 0.65)',
              force3D: true,
              onComplete: () => {
                floatTweenRef.current?.resume();
                shadowTweenRef.current?.resume();
              },
            });

            gsap.to(innerRef.current, {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: 'power3.out',
              force3D: true,
            });
          }, 2500);
        },
      });

      return () => {
        observer.disconnect();
        if (returnTimerRef.current) clearTimeout(returnTimerRef.current);
        if (dragInstance[0]) dragInstance[0].kill();
      };
    },
    { scope: wrapperRef }
  );

  return (
    <div
      ref={wrapperRef}
      className={`gpu-accelerated relative flex flex-col items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none ${
        isDragging || isWaiting ? 'z-50' : 'z-10'
      }`}
      title="Drag me around!"
    >
      <div ref={innerRef} className="gpu-accelerated relative">
        <img
          src={src}
          alt={alt}
          loading={isStage ? 'eager' : 'lazy'}
          decoding="async"
          className={`${imgClassName} object-contain ${
            isStage || isDragging
              ? 'drop-shadow-[0_18px_26px_rgba(0,0,0,0.6)]'
              : ''
          } pointer-events-none select-none`}
          draggable={false}
        />
      </div>
      <div
        ref={shadowRef}
        className="gpu-accelerated w-[60%] h-3.5 bg-black/50 blur-sm rounded-full -mt-1.5 pointer-events-none"
      />
    </div>
  );
}

export default function OurProducts() {
  const { lang } = useLanguage();
  const location = useLocation();
  const pageRef = useRef(null);
  const stageRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSizeGroup, setActiveSizeGroup] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProduct, setFeaturedProduct] = useState(PRODUCTS_DATA[0]);

  // Handle category hash navigation from Header dropdown (#tea, #karak, #oils, #boba)
  useEffect(() => {
    if (location.hash) {
      const cat = location.hash.replace('#', '');
      if (['tea', 'karak', 'oils', 'boba'].includes(cat)) {
        setActiveCategory(cat);
        const firstInCat = PRODUCTS_DATA.find((p) => p.category === cat);
        if (firstInCat) setFeaturedProduct(firstInCat);
      }
    }
  }, [location.hash]);

  const filteredProducts = PRODUCTS_DATA.filter((prod) => {
    const matchesCat =
      activeCategory === 'all' || prod.category === activeCategory;
    const matchesSize =
      activeSizeGroup === 'all' || prod.sizeGroup === activeSizeGroup;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      prod.enName.toLowerCase().includes(q) ||
      prod.arName.includes(q) ||
      prod.enTag.toLowerCase().includes(q) ||
      prod.size.toLowerCase().includes(q);

    return matchesCat && matchesSize && matchesSearch;
  });

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.prod-hero-anim',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.1 }
      ).fromTo(
        '.prod-stage-box',
        { y: 36, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.85 },
        '-=0.45'
      );
    },
    { scope: pageRef }
  );

  // Animate product grid cards when filter changes
  useEffect(() => {
    gsap.fromTo(
      '.prod-card-item',
      { y: 26, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.035,
        ease: 'power3.out',
        overwrite: 'auto',
      }
    );
  }, [activeCategory, activeSizeGroup, searchQuery]);

  const handleSpotlightSelect = (prod) => {
    setFeaturedProduct(prod);
    if (stageRef.current) {
      stageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const categories = [
    {
      key: 'all',
      en: `All Products (${PRODUCTS_DATA.length})`,
      ar: `جميع المنتجات (${PRODUCTS_DATA.length})`,
    },
    {
      key: 'tea',
      en: 'Loose & Flavored Tea (15)',
      ar: 'الشاي الفاخر والمنكه (15)',
    },
    {
      key: 'karak',
      en: 'Karak Tea Collection (9)',
      ar: 'مجموعة شاي الكرك (9)',
    },
    {
      key: 'oils',
      en: 'Olive & Rice Bran Oils (6)',
      ar: 'زيت الزيتون ونخالة الأرز (6)',
    },
    {
      key: 'boba',
      en: 'Boba Tea (1)',
      ar: 'شاي الفقاعات بوبا (1)',
    },
  ];

  const sizeFilters = [
    { key: 'all', en: 'All Sizes', ar: 'كل الأحجام' },
    { key: 'sachet', en: '25g Sachets & Cans', ar: 'أظرف ٢٥غ وعلب جاهزة' },
    { key: 'small', en: '200g – 800g', ar: '٢٠٠ غرام – ٨٠٠ غرام' },
    { key: 'medium', en: '1kg – 2L', ar: '١ كغم – ٢ لتر' },
    { key: 'bulk', en: '5kg – 10kg Bulk', ar: 'عبوات كبرى ٥ – ١٠ كغم' },
  ];

  return (
    <main
      ref={pageRef}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="relative w-full min-h-screen bg-gradient-to-b from-[#113308] via-[#0D2606] to-[#1A0D26] text-white overflow-x-hidden pb-24"
    >
      {/* Ambient Background Glows */}
      <div className="pointer-events-none fixed top-24 -left-32 w-[520px] h-[520px] rounded-full bg-[#4A2368]/35 blur-[140px] z-0" />
      <div className="pointer-events-none fixed bottom-20 -right-32 w-[500px] h-[500px] rounded-full bg-[#66E347]/15 blur-[150px] z-0" />

      {/* =========================================================
          1. HERO & INTERACTIVE DRAGGABLE SPOTLIGHT STAGE
      ========================================================= */}
      <section className="relative pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-10 overflow-hidden z-10">
        {/* Background Tea Plantation Texture */}
        <img
          src={bgLeavesImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20 pointer-events-none"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 25% 25%, rgba(74,35,104,0.65) 0%, rgba(13,38,6,0.92) 70%), linear-gradient(to bottom, rgba(13,38,6,0.3) 0%, #0D2606 100%)',
          }}
        />
        <img
          src={taglineMapImg}
          alt=""
          aria-hidden="true"
          className="absolute right-[-4%] top-10 w-[500px] lg:w-[680px] opacity-12 mix-blend-screen pointer-events-none select-none"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <div className="prod-hero-anim inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#66E347] animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#98f580]">
                  {lang === 'ar'
                    ? 'تشكيلة منتجات الخان الكاملة • اسحب أي منتج!'
                    : 'INTERACTIVE PRODUCT SHOWCASE • DRAG ANY PRODUCT!'}
                </span>
              </div>

              <h1 className="prod-hero-anim text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                {lang === 'ar' ? 'منتجاتنا الفاخرة' : 'Our Products'}
              </h1>

              <p className="prod-hero-anim text-base sm:text-lg text-white/80 font-light mt-3 leading-relaxed">
                {lang === 'ar'
                  ? 'كل منتج في هذه الصفحة تفاعلي بالكامل — يمكنك سحب وتحريك أي عبوة بحرية وستعود تلقائياً إلى مكانها بعد ثانيتين ونصف!'
                  : 'Every product on this page is physically interactive — grab and drag any bottle, tin, or pouch and watch it smoothly spring back to its pedestal after 2.5 seconds!'}
              </p>
            </div>

            {/* Live Search Bar */}
            <div className="prod-hero-anim w-full lg:w-80">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === 'ar'
                      ? 'ابحث عن شاي، كرك، زيت، حجم...'
                      : 'Search tea, karak, oil, size...'
                  }
                  className="w-full rounded-full bg-white/10 hover:bg-white/15 focus:bg-white/15 backdrop-blur-xl border border-white/20 focus:border-[#66E347] px-5 py-3 text-sm text-white placeholder:text-white/55 outline-none transition-all shadow-lg"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 text-xs text-white/70 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* INTERACTIVE SPOTLIGHT PEDESTAL STAGE */}
          <div
            ref={stageRef}
            className="prod-stage-box relative rounded-[36px] bg-gradient-to-br from-[#4A2368]/65 via-[#1C4D0E]/60 to-[#251136]/80 backdrop-blur-2xl border border-white/20 p-6 sm:p-10 lg:p-12 shadow-[0_28px_70px_rgba(0,0,0,0.5)] overflow-visible"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left 5 Cols: Draggable Featured Product Pedestal */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center min-h-[290px] sm:min-h-[340px] relative">
                {/* Glowing Halo Behind Featured Product */}
                <div
                  className="pointer-events-none absolute w-64 h-64 rounded-full blur-3xl opacity-45 transition-colors duration-500"
                  style={{ backgroundColor: featuredProduct.accent }}
                />

                <DraggableProductItem
                  key={featuredProduct.id}
                  src={featuredProduct.image}
                  alt={
                    lang === 'ar'
                      ? featuredProduct.arName
                      : featuredProduct.enName
                  }
                  imgClassName="h-[230px] sm:h-[285px] lg:h-[315px] w-auto"
                  floatAmplitude={11}
                  floatDuration={2.3}
                  isStage={true}
                />
              </div>

              {/* Right 7 Cols: Featured Product Info & Quick Variant Switcher */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-4 py-1.5 rounded-full bg-[#66E347] text-[#0D2606] text-xs font-bold uppercase tracking-wider shadow">
                    {featuredProduct.size}
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-white/12 border border-white/15 text-xs font-semibold text-white/90">
                    {lang === 'ar'
                      ? featuredProduct.arTag
                      : featuredProduct.enTag}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {lang === 'ar'
                    ? featuredProduct.arName
                    : featuredProduct.enName}
                </h2>

                <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-2xl">
                  {lang === 'ar'
                    ? 'منتج أصلي من علامة الخان التجارية التابعة لشركة مدينة الناعور للتجارة العامة المحدودة — مختار بعناية فائقة ليقدم أعلى معايير الجودة والمذاق الملكي.'
                    : 'Crafted under the flagship Al-Khan brand by Al-Naour City General Trading Co. — carefully selected and packaged to deliver royal taste and uncompromising quality.'}
                </p>

                {/* Quick sibling products strip from the same category */}
                <div className="pt-3 border-t border-white/15">
                  <span className="block text-xs uppercase tracking-widest text-white/65 mb-3">
                    {lang === 'ar'
                      ? 'منتجات أخرى في نفس الفئة (اضغط للعرض على المنصة):'
                      : 'More in this category (Click to beam to stage):'}
                  </span>
                  <div className="flex items-center gap-3.5 overflow-x-auto py-2.5 px-2">
                    {PRODUCTS_DATA.filter(
                      (p) => p.category === featuredProduct.category
                    )
                      .slice(0, 7)
                      .map((item) => {
                        const isCurrent = item.id === featuredProduct.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setFeaturedProduct(item)}
                            className={`group shrink-0 rounded-2xl p-2.5 border-2 transition-all duration-200 cursor-pointer flex flex-col items-center w-21 ${
                              isCurrent
                                ? 'bg-white/25 border-[#66E347] scale-105 shadow-[0_0_16px_rgba(102,227,71,0.35)]'
                                : 'bg-white/5 hover:bg-white/15 border-white/10'
                            }`}
                          >
                            <img
                              src={item.image}
                              alt={item.enName}
                              className="h-12 w-auto object-contain group-hover:scale-110 transition-transform"
                              draggable={false}
                            />
                            <span className="text-[10px] text-white/85 font-medium mt-1 truncate w-full text-center">
                              {item.size}
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. CATEGORY & SIZE FILTER CAPSULE BARS
      ========================================================= */}
      <section className="relative z-20 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto mt-4 mb-10 space-y-4">
        {/* Main Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl sm:rounded-full bg-[#4A2368]/85 backdrop-blur-xl border border-white/15 p-2 sm:px-3.5 sm:py-2.5 shadow-[0_14px_35px_rgba(0,0,0,0.35)]">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const active = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                    active
                      ? 'bg-[#66E347] text-[#0D2606] font-bold shadow-[0_0_16px_rgba(102,227,71,0.45)]'
                      : 'text-white/90 hover:text-white hover:bg-white/12'
                  }`}
                >
                  {lang === 'ar' ? cat.ar : cat.en}
                </button>
              );
            })}
          </div>

          <span className="hidden xl:inline-block text-xs text-[#98f580] font-semibold px-3">
            {lang === 'ar'
              ? `يعرض ${filteredProducts.length} منتج تفاعلي`
              : `Showing ${filteredProducts.length} interactive products`}
          </span>
        </div>

        {/* Size / Packaging Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 px-2">
          <span className="text-xs uppercase tracking-wider text-white/60 mr-2">
            {lang === 'ar' ? 'تصفية حسب الحجم:' : 'Filter by Size:'}
          </span>
          {sizeFilters.map((sf) => {
            const active = activeSizeGroup === sf.key;
            return (
              <button
                key={sf.key}
                type="button"
                onClick={() => setActiveSizeGroup(sf.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  active
                    ? 'bg-white text-[#4A2368] border-white font-semibold shadow'
                    : 'bg-white/5 hover:bg-white/15 text-white/80 border-white/15'
                }`}
              >
                {lang === 'ar' ? sf.ar : sf.en}
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          3. ALL 31 DRAGGABLE PRODUCTS INTERACTIVE GRID
      ========================================================= */}
      <section className="relative z-20 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl bg-white/5 border border-white/15 p-12 text-center">
            <p className="text-xl text-white/80 mb-4">
              {lang === 'ar'
                ? 'لم يتم العثور على منتجات مطابقة للبحث.'
                : 'No products matched your filter criteria.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setActiveSizeGroup('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-[#66E347] text-[#0D2606] font-semibold text-sm cursor-pointer"
            >
              {lang === 'ar' ? 'إظهار كل المنتجات' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((prod) => {
              const isFeatured = featuredProduct.id === prod.id;

              return (
                <div
                  key={prod.id}
                  className={`prod-card-item group relative rounded-[30px] p-6 flex flex-col justify-between transition-colors duration-300 border overflow-visible ${
                    isFeatured
                      ? 'bg-gradient-to-b from-[#4A2368]/85 to-[#1B4E0D]/85 border-[#66E347]/70 shadow-[0_18px_42px_rgba(0,0,0,0.4)]'
                      : 'bg-[#173d0e]/85 hover:bg-[#1e4d13]/90 border-white/15 hover:border-[#66E347]/50 shadow-[0_10px_28px_rgba(0,0,0,0.24)]'
                  }`}
                >
                  {/* Top Badges Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#4A2368]/90 text-[#98f580] border border-white/15">
                      {prod.size}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleSpotlightSelect(prod)}
                      className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/10 hover:bg-[#66E347] text-white/85 hover:text-[#0D2606] transition-colors cursor-pointer"
                      title="Inspect on top stage"
                    >
                      {lang === 'ar' ? 'عرض بالمنصة ↑' : 'Stage ↑'}
                    </button>
                  </div>

                  {/* Center Interactive Draggable Product Image */}
                  <div className="relative h-[220px] sm:h-[235px] flex items-center justify-center my-2">
                    {/* Ambient Glow Behind Product */}
                    <div
                      className="pointer-events-none absolute w-36 h-36 rounded-full blur-2xl opacity-25 group-hover:opacity-50 transition-opacity duration-300"
                      style={{ backgroundColor: prod.accent }}
                    />

                    <DraggableProductItem
                      src={prod.image}
                      alt={lang === 'ar' ? prod.arName : prod.enName}
                      imgClassName="max-h-[195px] sm:max-h-[210px] w-auto max-w-[190px]"
                      floatAmplitude={7}
                      floatDuration={2.2 + (prod.id.length % 3) * 0.3}
                      onSelect={() => handleSpotlightSelect(prod)}
                    />
                  </div>

                  {/* Bottom Product Title & Tag */}
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-xs font-semibold text-[#98f580] mb-1">
                      {lang === 'ar' ? prod.arTag : prod.enTag}
                    </p>
                    <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#66E347] transition-colors">
                      {lang === 'ar' ? prod.arName : prod.enName}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

