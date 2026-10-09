"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const tasks = [
  "Developed and maintained full-stack web applications using the MERN stack (MongoDB, Express, React, Node.js).",
  "Built scalable, server-side rendered (SSR) applications and static websites with Next.js.",
  "Integrated GSAP and Framer Motion for complex, high-performance UI animations.",
  "Designed responsive, mobile-first interfaces using Tailwind CSS.",
  "Created secure RESTful APIs with Node.js and Express, integrated with MongoDB databases.",
  "Collaborated with teams to implement clean architecture and reusable components."
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Heading wipe ── */
      gsap.fromTo(".exp-heading",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: ".exp-heading", start: "top 85%" } }
      );

      /* ── Timeline center line draw ── */
      gsap.fromTo(".timeline-line",
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 1.5, ease: "expo.inOut",
          scrollTrigger: { trigger: ".timeline-wrap", start: "top 70%" } }
      );

      /* ── Timeline dot pop ── */
      gsap.fromTo(".timeline-dot",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".timeline-dot", start: "top 75%" } }
      );

      /* ── Left content slide ── */
      gsap.fromTo(".exp-left",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".exp-left", start: "top 80%" } }
      );

      /* ── Right tasks list stagger ── */
      gsap.fromTo(".exp-task",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".exp-right", start: "top 80%" } }
      );

      /* ── Parallax on the whole card wrapper ── */
      gsap.to(".timeline-wrap", {
        y: -30,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-4 bg-slate-900 text-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-[10%] w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-emerald-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-20 overflow-hidden">
          <h2 className="exp-heading text-4xl md:text-5xl font-bold mb-4 will-anim">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full" />
        </div>

        <div className="timeline-wrap relative pl-8 md:pl-0 will-anim">
          {/* Timeline Line */}
          <div className="timeline-line hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-emerald-500 to-slate-700 -translate-x-1/2 will-anim" />

          <div className="md:grid md:grid-cols-2 md:gap-12 relative items-center">
            
            {/* Left side: Role info */}
            <div className="exp-left md:text-right mb-8 md:mb-0 relative will-anim">
              <h3 className="text-3xl font-bold text-white mb-2">MERN Stack Developer</h3>
              <p className="text-xl text-blue-400 font-medium mb-3">Freelance / Remote</p>
              <span className="inline-block px-4 py-1.5 bg-slate-800 border border-slate-700 rounded-full text-sm font-medium text-slate-300 shadow-inner">
                2021 - Present
              </span>
            </div>

            {/* Timeline dot */}
            <div className="timeline-dot absolute left-[-32px] md:left-[50%] md:-translate-x-1/2 top-2 md:top-1/2 md:-translate-y-1/2 w-12 h-12 rounded-full bg-slate-900 border-4 border-emerald-500 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(16,185,129,0.4)] will-anim">
              <Briefcase size={20} className="text-emerald-400" />
            </div>

            {/* Right side: Tasks list */}
            <div className="exp-right bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-md shadow-2xl hover:border-emerald-500/30 transition-colors">
              <ul className="space-y-4">
                {tasks.map((task, i) => (
                  <li key={i} className="exp-task flex items-start gap-4 will-anim">
                    <div className="mt-2 w-2 h-2 rounded-full bg-blue-400 shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                    <span className="text-slate-300 leading-relaxed text-sm md:text-base">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
