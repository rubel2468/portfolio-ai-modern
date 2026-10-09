"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send, ExternalLink, Layers, Globe, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: <Mail    size={20} />, label: "Email",    value: "rk1769950@gmail.com",       href: "mailto:rk1769950@gmail.com",     color: "text-purple-400" },
  { icon: <Phone   size={20} />, label: "Phone",    value: "01811535328",               href: "tel:+8801811535328",              color: "text-blue-400"   },
  { icon: <MapPin  size={20} />, label: "Location", value: "Lalkhan Bazar, Chattogram", href: "#",                              color: "text-pink-400"   },
];

const socials = [
  { icon: <ExternalLink size={20} />, label: "GitHub",   href: "https://github.com/",    color: "hover:bg-gray-700"    },
  { icon: <Layers       size={20} />, label: "LinkedIn",  href: "https://linkedin.com/",  color: "hover:bg-blue-700"   },
  { icon: <Globe        size={20} />, label: "Facebook",  href: "https://facebook.com/",  color: "hover:bg-blue-600"   },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-left",
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".contact-left", start: "top 80%" } }
      );
      gsap.fromTo(
        ".contact-right",
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".contact-right", start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:rk1769950@gmail.com?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailtoLink;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-4 bg-slate-950 relative overflow-hidden"
    >
      {/* bg blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[5%] w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4" />
          <p className="text-slate-400 max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* ── LEFT: photo + info ── */}
          <div className="contact-left space-y-8">
            {/* illustration card */}
            <div className="relative rounded-3xl overflow-hidden h-72 md:h-80 shadow-2xl border border-purple-500/20">
              <Image
                src="/contact-illustration.jpg"
                alt="Contact Illustration"
                fill
                className="object-cover object-center"
              />
              {/* bottom overlay with text */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-bold text-xl">Let&apos;s Work Together!</p>
                <p className="text-purple-300 text-sm mt-1">Open for freelance & remote projects</p>
              </div>
            </div>

            {/* contact info */}
            <div className="space-y-4">
              {contactInfo.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  className="flex items-center gap-4 bg-slate-800/60 border border-slate-700/50 rounded-xl px-5 py-4 hover:border-purple-500/50 hover:bg-slate-800 transition-all duration-200 group"
                >
                  <span className={`${c.color} group-hover:scale-110 transition-transform flex-shrink-0`}>{c.icon}</span>
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider">{c.label}</p>
                    <p className="text-white font-medium text-sm">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* socials */}
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`p-3 rounded-xl bg-slate-800 border border-slate-700/50 text-slate-300 ${s.color} hover:text-white hover:border-transparent transition-all duration-200`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div className="contact-right">
            <form onSubmit={handleSubmit} className="space-y-5 bg-slate-800/40 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-slate-400 mb-2" htmlFor="name">Your Name</label>
                  <input
                    id="name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    placeholder="Md. Rubel"
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2" htmlFor="email">Email Address</label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2" htmlFor="subject">Subject</label>
                <input
                  id="subject" name="subject" type="text"
                  value={form.subject} onChange={handleChange}
                  placeholder="Project Inquiry"
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message" name="message" rows={5} required
                  value={form.message} onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] transition-all duration-200"
              >
                {sent ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
