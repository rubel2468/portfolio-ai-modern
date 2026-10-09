"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Briefcase, GraduationCap, Heart, Coffee, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: <Briefcase size={22} />, value: "5+",   label: "Years Experience" },
  { icon: <Code2 size={22} />,     value: "50+",  label: "Projects Done"    },
  { icon: <Coffee size={22} />,    value: "∞",    label: "Cups of Coffee"   },
  { icon: <Heart size={22} />,     value: "100%", label: "Passion"          },
];

const highlights = [
  { icon: <Zap size={16} />,           text: "MERN Stack & Next.js Developer"              },
  { icon: <Code2 size={16} />,         text: "Smooth Animations with GSAP & Framer Motion" },
  { icon: <Briefcase size={16} />,     text: "Freelance & Remote Work Experience"           },
  { icon: <GraduationCap size={16} />, text: "BA/BSS Graduate — Bangladesh Open University" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Heading clip-path wipe ── */
      gsap.fromTo(".about-heading",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: ".about-heading", start: "top 85%" } }
      );

      /* ── Divider line grow ── */
      gsap.fromTo(".about-divider",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: ".about-divider", start: "top 88%" } }
      );

      /* ── Image — skew + slide in from left ── */
      gsap.fromTo(".about-img-wrap",
        { x: -100, skewX: -8, opacity: 0 },
        { x: 0, skewX: 0, opacity: 1, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: ".about-img-wrap", start: "top 80%" } }
      );

      /* ── Floating badge pop ── */
      gsap.fromTo(".img-badge",
        { scale: 0, rotation: -20 },
        { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.8)", delay: 0.4,
          scrollTrigger: { trigger: ".about-img-wrap", start: "top 80%" } }
      );

      /* ── Right text lines — stagger reveal ── */
      gsap.fromTo(".about-line",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power4.out",
          scrollTrigger: { trigger: ".about-text-wrap", start: "top 82%" } }
      );

      /* ── Highlight items — slide in stagger ── */
      gsap.fromTo(".highlight-item",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".highlight-item", start: "top 85%" } }
      );

      /* ── Stats cards — scale pop stagger ── */
      gsap.fromTo(".stat-card",
        { scale: 0.6, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".stat-card", start: "top 88%" } }
      );

      /* ── Scroll: parallax on image ── */
      gsap.to(".about-img-inner", {
        y: -40,
        scrollTrigger: { trigger: ".about-img-wrap", start: "top bottom", end: "bottom top", scrub: 1.5 },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-4 bg-slate-900 relative overflow-hidden"
    >
      {/* bg blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-[10%] right-[5%] w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 overflow-hidden">
          <h2 className="about-heading text-4xl md:text-5xl font-bold text-white mb-4 will-anim">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Me</span>
          </h2>
          <div className="about-divider w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto will-anim" />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <div className="about-img-wrap flex justify-center will-anim">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-20 blur-2xl" />
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full p-1 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 shadow-2xl overflow-hidden">
                <div className="about-img-inner w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/about-profile.jpg"
                    alt="Md. Rubel — About"
                    fill
                    className="object-cover object-top rounded-full"
                    sizes="320px"
                  />
                </div>
              </div>
              <div className="img-badge absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg will-anim">
                Full Stack Dev 🚀
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="about-text-wrap space-y-6">
            <div className="line-mask">
              <h3 className="about-line text-2xl md:text-3xl font-bold text-white will-anim">
                Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Md. Rubel</span>
              </h3>
            </div>
            <div className="line-mask">
              <p className="about-line text-slate-400 leading-relaxed text-base md:text-lg will-anim">
                A passionate <strong className="text-purple-400">Full Stack Developer</strong> specializing in building
                modern, scalable, and highly interactive web applications using the{" "}
                <strong className="text-blue-400">MERN stack & Next.js</strong>.
              </p>
            </div>
            <div className="line-mask">
              <p className="about-line text-slate-400 leading-relaxed will-anim">
                With years of freelance and remote work experience, I bring clean architecture,
                reusable components, and strong commitment to every project.
              </p>
            </div>

            <ul className="space-y-3">
              {highlights.map((h, i) => (
                <li key={i} className="highlight-item flex items-center gap-3 text-slate-300 text-sm bg-slate-800/50 px-4 py-3 rounded-xl border border-slate-700/50 will-anim">
                  <span className="text-purple-400 flex-shrink-0">{h.icon}</span>
                  {h.text}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-200"
            >
              Let&apos;s Connect →
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          {stats.map((s, i) => (
            <div key={i} className="stat-card bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 text-center hover:border-purple-500/50 hover:bg-slate-800/80 transition-all duration-300 group will-anim">
              <div className="flex justify-center mb-3 text-purple-400 group-hover:text-blue-400 transition-colors">{s.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
