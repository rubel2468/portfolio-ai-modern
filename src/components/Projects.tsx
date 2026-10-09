"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Code } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title:"Taxi Ride-Hailing App",            description:"A modern, full-stack taxi application with real-time tracking, map integration, and seamless booking experience.",  image:"/taxi-app-ui.jpg",          tags:["Next.js","MongoDB","Tailwind CSS","MERN"],       liveUrl:"https://taxi-app-delta-plum.vercel.app/",     githubUrl:"#" },
  { title:"MFunL - Healthcare Digital Marketing", description:"A professional marketing platform for a healthcare digital agency. Features high-converting designs and SEO.",     image:"/mfunl-ui.jpg",             tags:["React","Next.js","Tailwind CSS","SEO"],          liveUrl:"https://mfunl.vercel.app/",                   githubUrl:"#" },
  { title:"Tiger Bhai E-Commerce",            description:"Full-featured e-commerce platform for fashion. Includes product catalog, shopping cart, and high-performance UI.",   image:"/tiger-bhai-ui.jpg",        tags:["Next.js","E-Commerce","Tailwind CSS","React"],  liveUrl:"https://tiger-bhai-gold.vercel.app/",         githubUrl:"#" },
  { title:"Hotel Management System",          description:"A comprehensive hotel booking platform with real-time room availability, elegant UI, and seamless reservation flows.", image:"/hotel-management-ui.jpg",  tags:["MERN","Next.js","Tailwind CSS","Booking"],      liveUrl:"https://port-ai-modern.vercel.app/",          githubUrl:"#" },
  { title:"ERP Dashboard System",             description:"Enterprise Resource Planning dashboard with KPIs, sales analytics, inventory tracking, HR and finance modules.",      image:"/erp-dashboard-ui.jpg",     tags:["Next.js","ERP","Dashboard","Analytics"],        liveUrl:"https://new-erp-11.vercel.app/dashboard",    githubUrl:"#" },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Heading wipe ── */
      gsap.fromTo(".projects-heading",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: ".projects-heading", start: "top 85%" } }
      );

      /* ── Cards — stagger reveal from below with clip ── */
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 100, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.9, ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
            delay: (i % 3) * 0.1
          }
        );
      });

      /* ── Hover tilt on cards ── */
      gsap.utils.toArray<HTMLElement>(".project-card").forEach(card => {
        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
          const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -12;
          gsap.to(card, { rotateY: x, rotateX: y, duration: 0.4, ease: "power2.out", transformPerspective: 800 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
        });
      });

      /* ── Image parallax inside each card ── */
      gsap.utils.toArray<HTMLElement>(".proj-img").forEach(img => {
        gsap.to(img, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-4 bg-slate-800 text-white relative overflow-hidden">
      {/* bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[5%]  left-[10%] w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-[5%] right-[10%] w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 overflow-hidden">
          <h2 className="projects-heading text-4xl md:text-5xl font-bold mb-4 will-anim">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div
              key={i}
              className="project-card bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 group hover:border-purple-500/50 transition-colors will-anim"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Image with parallax */}
              <div className="relative h-52 overflow-hidden">
                <div className="proj-img absolute inset-0 scale-110">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                {/* shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{p.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((tag, j) => (
                    <span key={j} className="px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-blue-400 border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-800">
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm font-medium hover:border-slate-500 transition-all duration-200">
                    <Code size={14} /> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
