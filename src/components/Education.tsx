"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const education = [
  { degree: "BA/BSS", institution: "Bangladesh Open University", year: "2017 - 2020", gpa: "2.20" },
  { degree: "HSC",    institution: "Omargoni MES College",       year: "2006 - 2008", gpa: "2.25" },
  { degree: "SSC",    institution: "Bagmoniram Abdur Rashid City Corporation High School", year: "2004 - 2006", gpa: "3.50" }
];

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      /* ── Heading wipe ── */
      gsap.fromTo(".edu-heading",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: ".edu-heading", start: "top 85%" } }
      );

      /* ── Cards stagger reveal ── */
      gsap.fromTo(".edu-card",
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".edu-grid", start: "top 80%" } }
      );

      /* ── 3D Hover tilt on cards ── */
      gsap.utils.toArray<HTMLElement>(".edu-card").forEach(card => {
        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
          const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
          gsap.to(card, { rotateY: x, rotateX: y, duration: 0.4, ease: "power2.out", transformPerspective: 1000 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-24 px-4 bg-slate-950 text-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-80 h-80 bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-[20%] right-[20%] w-80 h-80 bg-pink-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 overflow-hidden">
          <h2 className="edu-heading text-4xl md:text-5xl font-bold mb-4 will-anim">
            Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">History</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </div>

        {/* Grid */}
        <div className="edu-grid grid md:grid-cols-3 gap-8">
          {education.map((item, index) => (
            <div
              key={index}
              className="edu-card bg-slate-900/80 p-8 rounded-3xl border border-slate-700 relative overflow-hidden group hover:border-purple-500/50 transition-colors backdrop-blur-sm shadow-xl will-anim"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Background gradient blob that expands on hover */}
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full group-hover:scale-[2.5] transition-transform duration-700 ease-out" />
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex p-4 bg-slate-800 border border-slate-700 rounded-2xl text-purple-400 group-hover:text-pink-400 transition-colors">
                  <GraduationCap size={28} />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{item.degree}</h3>
                <p className="text-slate-400 mb-6 min-h-[48px] leading-relaxed">{item.institution}</p>
                
                <div className="flex justify-between items-center pt-5 border-t border-slate-700/80">
                  <span className="text-sm font-medium px-4 py-1.5 bg-slate-800 rounded-full text-slate-300">
                    {item.year}
                  </span>
                  <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    GPA: {item.gpa}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
