"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function CursorFollower() {
  useEffect(() => {
    const dot  = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    const pos  = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const moveDot = () => {
      gsap.set(dot,  { x: mouse.x, y: mouse.y });
    };
    const moveRing = () => {
      pos.x += (mouse.x - pos.x) * 0.12;
      pos.y += (mouse.y - pos.y) * 0.12;
      gsap.set(ring, { x: pos.x, y: pos.y });
      requestAnimationFrame(moveRing);
    };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      moveDot();
    };
    const onEnter = () => gsap.to(ring, { scale: 1.6, borderColor: "rgba(59,130,246,0.8)", duration: 0.2 });
    const onLeave = () => gsap.to(ring, { scale: 1,   borderColor: "rgba(168,85,247,0.5)", duration: 0.2 });

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    moveRing();

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
    </>
  );
}
