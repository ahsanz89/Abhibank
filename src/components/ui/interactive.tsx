"use client";

import { ArrowUp, ChevronLeft, ChevronRight, Pause, Play, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "@/lib/hooks";

/* ───────── Reveal on scroll (content stays visible without JS) ───────── */
export function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: { children: ReactNode; as?: "div" | "section" | "li"; className?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}

/* ───────── Animated counter ───────── */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const [n, setN] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1400;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        setN(value * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref} aria-label={`${prefix}${value.toFixed(decimals)}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {n.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}

/* ───────── Accordion ───────── */
export function Accordion({ items, defaultOpen = 0 }: { items: { q: ReactNode; a: ReactNode }[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="accordion">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div className="accordion__item" key={i}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                id={`${id}-t${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {it.q}
                <span className="accordion__icon" aria-hidden="true">
                  <Plus size={18} />
                </span>
              </button>
            </h3>
            <div className="accordion__panel" data-open={isOpen} id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-t${i}`}>
              <div>
                <div className="accordion__content">{it.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ───────── Modal ───────── */
export function Modal({ open, onClose, label, children, media }: { open: boolean; onClose: () => void; label: string; children: ReactNode; media?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const body = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => ref.current?.querySelector<HTMLElement>("button, a, iframe, video, [tabindex]")?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), iframe, video, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = body;
      prev?.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} className={`modal${media ? " modal--media" : ""}`} role="dialog" aria-modal="true" aria-label={label}>
        <button type="button" className="icon-btn modal__close" aria-label="Close" onClick={onClose}>
          <X size={18} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}

/* ───────── Video card + lightbox (mp4 or YouTube) ───────── */
export function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export function VideoCard({
  title,
  text,
  poster,
  video,
  aspect = "16 / 10",
  posterFit = "cover",
}: {
  title: string;
  text?: string;
  poster?: string;
  video: string;
  aspect?: string;
  posterFit?: "cover" | "contain";
}) {
  const [open, setOpen] = useState(false);
  const yt = youtubeId(video);
  const thumb = poster ?? (yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : undefined);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <button type="button" className="card card--interactive video-card" style={{ overflow: "hidden", padding: 0, textAlign: "left", font: "inherit" }} onClick={() => setOpen(true)} aria-label={`Play video: ${title}`}>
        <span className="dots" style={{ display: "block", position: "relative", aspectRatio: aspect, backgroundColor: "var(--navy-800)" }}>
          {thumb && (
            <Image src={thumb} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" style={{ objectFit: posterFit }} unoptimized={thumb.startsWith("https://i.ytimg")} />
          )}
          <span className="play-btn" aria-hidden="true">
            <Play size={28} fill="currentColor" />
          </span>
        </span>
        <span className="stack" style={{ gap: 6, padding: "22px 26px 26px" }}>
          <span className="h4" style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500 }}>
            {title}
          </span>
          {text && <span className="muted small" style={{ fontWeight: 300 }}>{text}</span>}
        </span>
      </button>
      <Modal open={open} onClose={close} label={title} media>
        <div className="ratio-16x9">
          {yt ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video src={video} controls autoPlay playsInline style={{ background: "#000" }} />
          )}
        </div>
      </Modal>
    </>
  );
}

/** Click-to-load YouTube embed (no third-party requests until the visitor asks). */
export function LiteYouTube({ url, title, poster }: { url: string; title: string; poster?: string }) {
  const [on, setOn] = useState(false);
  const id = youtubeId(url)!;
  return (
    <div className="media-frame ratio-16x9">
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setOn(true)} aria-label={`Play video: ${title}`} style={{ position: "absolute", inset: 0, border: 0, padding: 0, background: "transparent" }}>
          <Image src={poster ?? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" fill sizes="(max-width: 960px) 100vw, 60vw" style={{ objectFit: "cover" }} unoptimized={!poster} />
          <span style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(4,10,18,.7))" }} />
          <span className="play-btn" aria-hidden="true">
            <Play size={28} fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}

/* ───────── Image slider (campaign banners) ───────── */
export function Slider({ slides, interval = 6000, label }: { slides: { src: string; alt: string; href?: string }[]; interval?: number; label: string }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduced = useReducedMotion();
  const n = slides.length;
  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);
  useEffect(() => {
    if (!playing || reduced) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), interval);
    return () => clearInterval(t);
  }, [playing, reduced, interval, n]);
  const touch = useRef<number | null>(null);
  return (
    <div
      className="slider"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1);
        if (e.key === "ArrowLeft") go(i - 1);
      }}
    >
      <div
        className="slider__viewport"
        onMouseEnter={() => setPlaying(false)}
        onMouseLeave={() => setPlaying(true)}
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
          touch.current = null;
        }}
      >
        <div className="slider__track" style={{ transform: `translateX(-${i * 100}%)` }} aria-live={playing ? "off" : "polite"}>
          {slides.map((s, k) => {
            const img = <Image src={s.src} alt={s.alt} fill sizes="(max-width: 1440px) 100vw, 1280px" priority={k === 0} />;
            return (
              <div className="slider__slide" key={s.src} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${n}`} aria-hidden={k !== i}>
                {s.href ? (
                  <Link href={s.href} tabIndex={k === i ? 0 : -1} aria-label={s.alt}>
                    {img}
                  </Link>
                ) : (
                  img
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="slider__controls">
        <div className="slider__dots">
          {slides.map((s, k) => (
            <button key={s.src} type="button" className="slider__dot-hit" onClick={() => go(k)} aria-label={`Show slide ${k + 1}`}>
              <span className="slider__dot" style={{ display: "block" }} aria-current={k === i} />
            </button>
          ))}
        </div>
        <div className="cluster" style={{ gap: 8 }}>
          <button type="button" className="icon-btn" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause slideshow" : "Play slideshow"}>
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button type="button" className="icon-btn" onClick={() => go(i - 1)} aria-label="Previous slide">
            <ChevronLeft size={18} />
          </button>
          <button type="button" className="icon-btn" onClick={() => go(i + 1)} aria-label="Next slide">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── Back to top ───────── */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 900);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button type="button" className="to-top" data-visible={show} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} tabIndex={show ? 0 : -1}>
      <ArrowUp size={18} />
    </button>
  );
}
