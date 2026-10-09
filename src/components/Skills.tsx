"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React.js & Next.js",       level: 95, color: "#61dafb" },
  { name: "Node.js & Express",        level: 90, color: "#68a063" },
  { name: "MongoDB & Mongoose",       level: 88, color: "#4db33d" },
  { name: "TypeScript & JavaScript",  level: 85, color: "#3178c6" },
  { name: "Tailwind CSS",             level: 95, color: "#38bdf8" },
  { name: "GSAP & Framer Motion",     level: 82, color: "#88ce02" },
];

const tools = ["Git & GitHub","REST API","Vercel","Postman","VS Code","Figma","JWT Auth","Redux","Docker","Next.js SSR"];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Heading wipe ── */
      gsap.fromTo(".skills-heading",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: ".skills-heading", start: "top 85%" } }
      );

      /* ── Skill cards — alternating slide in ── */
      gsap.utils.toArray<HTMLElement>(".skill-card").forEach((el, i) => {
        gsap.fromTo(el,
          { x: i % 2 === 0 ? -80 : 80, opacity: 0, skewX: i % 2 === 0 ? -5 : 5 },
          { x: 0, opacity: 1, skewX: 0, duration: 0.8, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true } }
        );
      });

      /* ── Skill bars — animate width on scroll ── */
      gsap.utils.toArray<HTMLElement>(".skill-bar-fill").forEach((bar) => {
        const target = bar.dataset.width || "0";
        gsap.fromTo(bar,
          { width: "0%" },
          { width: target + "%", duration: 1.2, ease: "expo.out",
            scrollTrigger: { trigger: bar, start: "top 90%", once: true } }
        );
      });

      /* ── Tool tags — scatter pop in ── */
      gsap.fromTo(".tool-tag",
        { scale: 0, opacity: 0, rotation: () => gsap.utils.random(-15, 15) },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.5, stagger: { each: 0.05, from: "random" }, ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".tools-wrap", start: "top 85%" } }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-4 bg-slate-950 text-white relative overflow-hidden">
      {/* bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-[20%] left-[5%] w-72 h-72 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 overflow-hidden">
          <h2 className="skills-heading text-4xl md:text-5xl font-bold mb-4 will-anim">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        </div>

        {/* Skill bars */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {skills.map((s, i) => (
            <div key={i} className="skill-card bg-slate-800/60 border border-slate-700/50 p-6 rounded-2xl hover:border-purple-500/40 transition-colors will-anim">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-white text-sm md:text-base">{s.name}</span>
                <span className="text-sm font-bold" style={{ color: s.color }}>{s.level}%</span>
              </div>
              <div className="w-full bg-slate-700/60 rounded-full h-2 overflow-hidden">
                <div
                  className="skill-bar-fill h-2 rounded-full will-anim"
                  data-width={s.level}
                  style={{ background: `linear-gradient(90deg, ${s.color}88, ${s.color})`, width: 0 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="tools-wrap text-center">
          <h3 className="text-xl font-bold text-slate-300 mb-6">Tools &amp; Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((t, i) => (
              <span key={i} className="tool-tag px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-300 hover:border-purple-500/60 hover:text-purple-300 transition-colors cursor-default will-anim">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
