import Navbar    from "@/components/Navbar";
import Hero      from "@/components/Hero";
import About     from "@/components/About";
import Skills    from "@/components/Skills";
import Projects  from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import CV        from "@/components/CV";
import Contact   from "@/components/Contact";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CursorFollower from "@/components/CursorFollower";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-slate-900 font-sans selection:bg-purple-500/30">
        <CursorFollower />
        <Navbar />

      <div id="home">
        <Hero />
      </div>

      <About />

      <div id="skills">
        <Skills />
      </div>

      <div id="projects">
        <Projects />
      </div>

      <div id="experience">
        <Experience />
      </div>

      <div id="education">
        <Education />
      </div>

      <div id="resume">
        <CV />
      </div>

      <Contact />

      {/* Footer */}
      <footer className="py-8 bg-slate-950 text-center text-slate-500 border-t border-slate-800">
        <p>© {new Date().getFullYear()} Md. Rubel. All rights reserved.</p>
        <p className="mt-2 text-sm">Built with Next.js, Tailwind CSS, GSAP &amp; Framer Motion</p>
      </footer>
      </main>
    </SmoothScrollProvider>
  );
}
