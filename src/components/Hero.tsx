"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, ArrowRight, ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      /* ── 1. Badge pop ── */
      tl.fromTo(".hero-badge",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }
      )

      /* ── 2. Massive Text Stagger ── */
      .fromTo(".hero-title-line",
        { yPercent: 120, rotateZ: 3, opacity: 0 },
        { yPercent: 0, rotateZ: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" },
        "-=0.5"
      )

      /* ── 3. Image Mask Reveal ── */
      .fromTo(".hero-img-mask",
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "expo.inOut" },
        "-=1"
      )
      .fromTo(".hero-img-inner",
        { scale: 1.4 },
        { scale: 1, duration: 1.5, ease: "expo.inOut" },
        "<"
      )

      /* ── 4. Bottom content fade ── */
      .fromTo(".hero-fade",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
        "-=0.8"
      );

      /* ── Scroll Parallax ── */
      gsap.to(".hero-img-mask", {
        yPercent: 15, ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true }
      });
      gsap.to(".hero-text-block", {
        yPercent: -20, ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-[#050505] overflow-hidden pt-24 pb-12"
    >
      {/* Ultra-modern animated gradient mesh BG */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-600 rounded-full mix-blend-screen filter blur-[150px] animate-blob" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600 rounded-full mix-blend-screen filter blur-[150px] animate-blob animation-delay-2000" />
      </div>

      {/* Noise Texture */}
      <div className="noise absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay" />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left: Content */}
        <div className="hero-text-block w-full lg:w-3/5 flex flex-col justify-center relative z-20">
          
          {/* Availability Badge */}
          <div className="hero-badge flex items-center gap-3 w-max px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-300 tracking-wide">Available for freelance work</span>
          </div>

          {/* Massive Typography */}
          <h1 className="text-[12vw] sm:text-[8vw] lg:text-[6.5rem] font-black leading-[0.9] tracking-tighter uppercase mb-6">
            <div className="line-mask">
              <span className="hero-title-line block text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">MD. RUBEL</span>
            </div>
            <div className="line-mask mt-2">
              <span className="hero-title-line block text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}>FULL STACK</span>
            </div>
            <div className="line-mask">
              <span className="hero-title-line block text-white">DEVELOPER</span>
            </div>
          </h1>

          <p className="hero-fade text-lg sm:text-xl text-slate-400 max-w-lg mb-10 leading-relaxed font-light">
            Crafting immersive digital experiences with <strong className="text-white font-medium">MERN</strong> & <strong className="text-white font-medium">Next.js</strong>. Specialized in high-performance web applications and fluid animations.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-6">
            <a href="#projects" className="hero-fade group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full overflow-hidden transition-transform hover:scale-105">
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-[250ms] ease-out group-hover:w-full" />
              <span className="relative flex items-center gap-2">View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
            </a>
            
            <a href="#contact" className="hero-fade flex items-center gap-3 text-slate-300 hover:text-white transition-colors font-medium">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                <Mail size={16} />
              </div>
              Contact Me
            </a>
          </div>
        </div>

        {/* Right: Modern Image Reveal */}
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end perspective-[1200px]">
          <div className="hero-img-mask relative w-[300px] h-[400px] sm:w-[380px] sm:h-[500px] lg:w-[420px] lg:h-[560px] rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(147,51,234,0.3)] group will-anim">
            
            <div className="hero-img-inner absolute inset-0 w-full h-full will-anim">
              <Image 
                src="/profile.png" 
                alt="Md. Rubel" 
                fill 
                className="object-cover object-top filter grayscale-[20%] contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                priority 
                sizes="(max-width: 768px) 300px, 420px"
              />
              {/* Glassmorphism gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-80" />
            </div>

            {/* Floating Glass Card on Image */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🚀</div>
                <div>
                  <p className="text-white font-bold text-sm">5+ Years Exp.</p>
                  <p className="text-slate-400 text-xs">MERN & Next.js</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="hero-fade absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
