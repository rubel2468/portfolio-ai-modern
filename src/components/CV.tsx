"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code2, Download, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── All colours as plain hex so html2canvas never sees oklch() ── */
const C = {
  headerBg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #1d4ed8 100%)",
  sidebarBg: "#f1f5f9",
  white:     "#ffffff",
  indigo700: "#4338ca",
  indigo600: "#4f46e5",
  indigo500: "#6366f1",
  indigo200: "#c7d2fe",
  indigo100: "#e0e7ff",
  blue400:   "#60a5fa",
  gray900:   "#111827",
  gray700:   "#374151",
  gray600:   "#4b5563",
  gray500:   "#6b7280",
  gray300:   "#d1d5db",
  card:      "#f8fafc",
  cardBorder:"#e2e8f0",
  divider:   "#e0e7ff",
  textLight: "#bfdbfe",   // blue-200
};

const font = "Arial, Helvetica, sans-serif";

/* ── Strip oklch from computed styles before html2canvas captures ── */
function flattenOklch(root: HTMLElement) {
  const all = root.querySelectorAll("*");
  const props = ["color","background-color","border-color","outline-color","fill","stroke","box-shadow","text-decoration-color","caret-color","accent-color"];
  all.forEach((el) => {
    const cs = window.getComputedStyle(el as HTMLElement);
    props.forEach((p) => {
      const val = cs.getPropertyValue(p);
      if (val.includes("oklch") || val.includes("lab(") || val.includes("lch(")) {
        (el as HTMLElement).style.setProperty(p, "#000000");
      }
    });
  });
}

export default function CV() {
  const cvRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cv-anim",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleDownload = async () => {
    const element = cvRef.current;
    if (!element) return;

    // Flatten any remaining oklch colours before capture
    flattenOklch(element);

    const html2pdf = (await import("html2pdf.js")).default;
    const opt = {
      margin: 0,
      filename: "Md-Rubel-CV.pdf",
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false, allowTaint: true },
      jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    /* ── Outer section — dark slate (website bg) ── */
    <div ref={sectionRef} style={{ padding: "80px 16px", background: "#0f172a" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Section title */}
        <div className="cv-anim" style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: "#ffffff", fontFamily: font, marginBottom: 12 }}>
            My Resume
          </h2>
          <div style={{ width: 80, height: 4, background: "linear-gradient(90deg,#a855f7,#3b82f6)", borderRadius: 9999, margin: "0 auto 32px" }} />

          {/* Download button */}
          <button
            onClick={handleDownload}
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "14px 32px",
              background: "linear-gradient(90deg,#7c3aed,#2563eb)",
              border: "none", borderRadius: 9999,
              color: "#ffffff", fontFamily: font, fontSize: 18, fontWeight: 600,
              cursor: "pointer", boxShadow: "0 8px 24px rgba(124,58,237,.4)",
              transition: "transform .2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Download size={22} />
            Download CV (PDF)
          </button>
        </div>

        {/* ══════════ CV CARD (this is what gets exported) ══════════ */}
        <div className="cv-anim">
        <div
          ref={cvRef}
          style={{ background: C.white, borderRadius: 16, overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,.4)", fontFamily: font }}
        >

          {/* ── HEADER ── */}
          <div style={{ background: C.headerBg, padding: "40px 40px 36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>

              {/* Avatar */}
              <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
                {/* gradient ring */}
                <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"linear-gradient(135deg,#a78bfa,#60a5fa,#f472b6)" }} />
                <div style={{ position:"absolute", inset:3, borderRadius:"50%", background:"#1e1b4b", overflow:"hidden" }}>
                  <Image src="/profile.png" alt="Md. Rubel" fill style={{ objectFit:"cover", objectPosition:"top" }} crossOrigin="anonymous" />
                </div>
              </div>

              {/* Name / title / contacts */}
              <div>
                <h1 style={{ fontSize:36, fontWeight:800, color:"#ffffff", margin:"0 0 4px", letterSpacing:1 }}>
                  Md. Rubel
                </h1>
                <p style={{ fontSize:16, fontWeight:500, color: C.textLight, margin:"0 0 16px", textTransform:"uppercase", letterSpacing:3 }}>
                  MERN Stack &amp; Next.js Developer
                </p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:16, color: C.textLight, fontSize:13 }}>
                  <span style={{ display:"flex", alignItems:"center", gap:6 }}><Phone size={13}/> 01811535328</span>
                  <span style={{ display:"flex", alignItems:"center", gap:6 }}><Mail size={13}/> rk1769950@gmail.com</span>
                  <span style={{ display:"flex", alignItems:"center", gap:6 }}><MapPin size={13}/> Lalkhan Bazar, Chattogram</span>
                  <span style={{ display:"flex", alignItems:"center", gap:6 }}><Globe size={13}/> Available Remotely</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── BODY (sidebar + main) ── */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr" }}>

            {/* ── LEFT SIDEBAR ── */}
            <div style={{ background: C.sidebarBg, padding: "32px 28px", display:"flex", flexDirection:"column", gap:32 }}>

              {/* Skills with bars */}
              <div>
                <h3 style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:2, color: C.indigo700, marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>
                  <Code2 size={14}/> Technical Skills
                </h3>
                {[
                  { name:"React.js & Next.js", level:95 },
                  { name:"Node.js & Express",   level:90 },
                  { name:"MongoDB & Mongoose",   level:88 },
                  { name:"TypeScript & JS",      level:85 },
                  { name:"Tailwind CSS",         level:95 },
                  { name:"GSAP & Framer Motion", level:80 },
                ].map(s => (
                  <div key={s.name} style={{ marginBottom:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, fontWeight:500, color: C.gray700, marginBottom:4 }}>
                      <span>{s.name}</span><span>{s.level}%</span>
                    </div>
                    <div style={{ background: C.gray300, borderRadius:99, height:6 }}>
                      <div style={{ width:`${s.level}%`, height:6, borderRadius:99, background:"linear-gradient(90deg,#6366f1,#3b82f6)" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tools */}
              <div>
                <h3 style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:2, color: C.indigo700, marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
                  <Star size={14}/> Tools & Others
                </h3>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {["Git & GitHub","REST API","Vercel","Postman","VS Code","Figma","JWT Auth","Redux"].map(t => (
                    <span key={t} style={{ padding:"3px 8px", fontSize:11, fontWeight:500, borderRadius:4, background: C.indigo100, color: C.indigo700, border:`1px solid ${C.indigo200}` }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:2, color: C.indigo700, marginBottom:12 }}>
                  Languages
                </h3>
                {[["Bengali","Native"],["English","Professional"]].map(([lang, level]) => (
                  <div key={lang} style={{ display:"flex", justifyContent:"space-between", fontSize:13, color: C.gray700, marginBottom:6 }}>
                    <span>{lang}</span>
                    <span style={{ fontWeight:600, color: C.indigo600 }}>{level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT MAIN ── */}
            <div style={{ background: C.white, padding:"32px 32px", display:"flex", flexDirection:"column", gap:28 }}>

              {/* About */}
              <div>
                <h3 style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:2, color: C.indigo700, paddingBottom:8, borderBottom:`2px solid ${C.divider}`, marginBottom:12 }}>
                  About Me
                </h3>
                <p style={{ fontSize:13, color: C.gray600, lineHeight:1.7, margin:0 }}>
                  A passionate Full Stack Developer specializing in building modern, scalable, and highly interactive
                  web applications using the MERN stack and Next.js. I focus on delivering seamless user experiences
                  with smooth animations and responsive designs. Experienced in freelance and remote environments
                  with a strong commitment to clean, maintainable code.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h3 style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:2, color: C.indigo700, paddingBottom:8, borderBottom:`2px solid ${C.divider}`, marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
                  <Briefcase size={13}/> Work Experience
                </h3>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                  <div>
                    <h4 style={{ fontSize:15, fontWeight:700, color: C.gray900, margin:"0 0 2px" }}>MERN Stack Developer</h4>
                    <p style={{ fontSize:13, color: C.indigo600, fontWeight:500, margin:0 }}>Freelance / Remote</p>
                  </div>
                  <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:99, background: C.indigo100, color: C.indigo700, whiteSpace:"nowrap" }}>2021 – Present</span>
                </div>
                <ul style={{ margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:6 }}>
                  {[
                    "Developed full-stack web applications using MERN stack (MongoDB, Express, React, Node.js).",
                    "Built SSR applications and static websites with Next.js for performance and SEO.",
                    "Integrated GSAP and Framer Motion for complex, high-performance UI animations.",
                    "Designed responsive, mobile-first interfaces using Tailwind CSS.",
                    "Created secure RESTful APIs integrated with MongoDB databases.",
                    "Collaborated with teams to implement clean architecture and reusable components.",
                  ].map((item, i) => (
                    <li key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, fontSize:12, color: C.gray600 }}>
                      <span style={{ marginTop:5, width:6, height:6, borderRadius:"50%", background: C.indigo500, flexShrink:0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects */}
              <div>
                <h3 style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:2, color: C.indigo700, paddingBottom:8, borderBottom:`2px solid ${C.divider}`, marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
                  <Globe size={13}/> Featured Projects
                </h3>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {[
                    { title:"Taxi Ride-Hailing App",             tech:"Next.js, MongoDB, Tailwind CSS",     url:"taxi-app-delta-plum.vercel.app", desc:"Real-time ride-hailing with map integration and booking system." },
                    { title:"MFunL – Healthcare Digital Marketing",tech:"React, Next.js, Tailwind CSS, SEO", url:"mfunl.vercel.app",               desc:"Professional marketing platform for healthcare digital agency." },
                    { title:"Tiger Bhai E-Commerce",             tech:"Next.js, React, Tailwind CSS",       url:"tiger-bhai-gold.vercel.app",     desc:"Full-featured fashion e-commerce with cart and product catalog." },
                    { title:"Hotel Management System",           tech:"MERN, Next.js, Tailwind CSS",       url:"port-ai-modern.vercel.app",      desc:"Real-time room booking and hotel management platform." },
                  ].map(p => (
                    <div key={p.title} style={{ padding:"10px 12px", borderRadius:8, background: C.card, border:`1px solid ${C.cardBorder}` }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:2 }}>
                        <span style={{ fontSize:13, fontWeight:700, color: C.gray900 }}>{p.title}</span>
                        <span style={{ fontSize:10, color: C.indigo600 }}>{p.url}</span>
                      </div>
                      <p style={{ fontSize:11, color: C.gray500, margin:"0 0 3px" }}>{p.desc}</p>
                      <p style={{ fontSize:11, fontWeight:600, color: C.indigo600, margin:0 }}>Stack: {p.tech}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:2, color: C.indigo700, paddingBottom:8, borderBottom:`2px solid ${C.divider}`, marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
                  <GraduationCap size={13}/> Education
                </h3>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {[
                    { degree:"BA/BSS", institution:"Bangladesh Open University",                        year:"2017 – 2020", gpa:"2.20" },
                    { degree:"HSC",    institution:"Omargoni MES College",                              year:"2006 – 2008", gpa:"2.25" },
                    { degree:"SSC",    institution:"Bagmoniram Abdur Rashid City Corporation High School", year:"2004 – 2006", gpa:"3.50" },
                  ].map(e => (
                    <div key={e.degree} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                      <div>
                        <h4 style={{ fontSize:13, fontWeight:700, color: C.gray900, margin:"0 0 2px" }}>{e.degree}</h4>
                        <p style={{ fontSize:11, color: C.gray500, margin:0 }}>{e.institution}</p>
                      </div>
                      <div style={{ textAlign:"right", flexShrink:0, marginLeft:12 }}>
                        <span style={{ display:"block", fontSize:10, padding:"2px 8px", borderRadius:99, background: C.indigo100, color: C.indigo700, marginBottom:3 }}>{e.year}</span>
                        <span style={{ fontSize:11, fontWeight:700, color: C.indigo600 }}>GPA: {e.gpa}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div style={{ background: C.headerBg, padding:"12px 40px", textAlign:"center", fontSize:11, color: C.textLight }}>
            rk1769950@gmail.com &nbsp;|&nbsp; 01811535328 &nbsp;|&nbsp; Lalkhan Bazar, Chattogram, Bangladesh
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
