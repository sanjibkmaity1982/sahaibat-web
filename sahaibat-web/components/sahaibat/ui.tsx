"use client";
import React, { useEffect, useRef, useState } from "react";
import { C } from "@/lib/sahaibat/theme";

export function Counter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const inc = end / 60;
        let cur = 0;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= end) {
            setCount(end);
            clearInterval(t);
          } else setCount(Math.floor(cur));
        }, 33);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span
      style={{
        background: `${color}12`,
        border: `1px solid ${color}30`,
        color,
        fontSize: 11,
        padding: "4px 10px",
        borderRadius: 20,
        fontWeight: 600,
        whiteSpace: "nowrap" as const,
      }}
    >
      {label}
    </span>
  );
}

export function Pill({ children, color = C.teal }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: `${color}12`,
        border: `1px solid ${color}35`,
        borderRadius: 20,
        padding: "6px 16px",
        marginBottom: 20,
      }}
    >
      <span style={{ color, fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>{children}</span>
    </div>
  );
}
