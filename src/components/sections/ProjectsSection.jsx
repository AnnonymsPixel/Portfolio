import { useState, useRef, useEffect } from "react";
import PROJECTS from "../../data/projects";

const ACCENTS = [
  { base: "#7F77DD", bg: "#EEEDFE", text: "#534AB7" },
  { base: "#1D9E75", bg: "#E1F5EE", text: "#0F6E56" },
  { base: "#D85A30", bg: "#FAECE7", text: "#993C1D" },
  { base: "#378ADD", bg: "#E6F1FB", text: "#185FA5" },
  { base: "#639922", bg: "#EAF3DE", text: "#3B6D11" },
  { base: "#BA7517", bg: "#FAEEDA", text: "#854F0B" },
];

const SKILLS = [
  { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Java",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "PHP",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "Kotlin",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
  { name: "C++",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "HTML",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "MongoDB",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Flask",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
  { name: "Django",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Bootstrap",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Node.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Git",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Docker",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "AWS",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Netlify",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" },
  { name: "Expo",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/expo/expo-original.svg" },
];

const GAP = 16;
const mod = (n, N) => ((n % N) + N) % N;

export default function ProjectsSection({ theme, onPrivacyNotice, sectionStyle, containerStyle }) {
  const t = theme.vars;
  const [cur, setCur] = useState(0);
  const [busy, setBusy] = useState(false);
  const vpRef = useRef(null);
  const [vpW, setVpW] = useState(0);
  const touchStartX = useRef(null);
  const N = PROJECTS.length;

  useEffect(() => {
    if (!vpRef.current) return;
    const ro = new ResizeObserver(([e]) => setVpW(e.contentRect.width));
    ro.observe(vpRef.current);
    setVpW(vpRef.current.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const isMobile = vpW > 0 && vpW < 600;
  const CW = vpW > 0
    ? isMobile
      ? Math.floor(vpW * 0.78)
      : Math.floor((vpW - GAP * 2) / 3)
    : 0;

  const centerLeft = (vpW - CW) / 2;
  const trackShift = 2 * (CW + GAP) - centerLeft;

  const step = (dir) => {
    if (busy) return;
    setBusy(true);
    setCur((c) => c + dir);
    setTimeout(() => setBusy(false), 680);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) dx > 0 ? step(1) : step(-1);
    touchStartX.current = null;
  };

  const handleLink = (url) => {
    if (!url) return;
    if (onPrivacyNotice) onPrivacyNotice(url);
    else window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="projects" style={sectionStyle}>
      <div style={containerStyle}>

        <h3 style={{
          fontFamily: "Russo One, sans-serif",
          fontWeight: 500,
          color: t.mainText,
          fontSize: 28,
          textAlign: "center",
          paddingTop: 36,
          marginBottom: 10,
        }}>
          Some of my Projects
        </h3>

        {/* Carousel row */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 6 : 10, padding: "32px 0 16px" }}>

          {/* Left arrow */}
          <button
            onClick={() => step(-1)}
            style={{
              flexShrink: 0,
              width: isMobile ? 30 : 36,
              height: isMobile ? 30 : 36,
              borderRadius: "50%",
              border: `0.5px solid ${t.borderColor}`,
              background: "transparent",
              color: t.mainText,
              cursor: "pointer",
              fontSize: isMobile ? 14 : 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.15s",
            }}
          >‹</button>

          {/* Viewport */}
          <div
            ref={vpRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ flex: 1, overflow: "hidden" }}
          >
            {CW > 0 && (
              <div style={{
                display: "flex",
                gap: GAP,
                transform: `translateX(${-trackShift}px)`,
                transition: "transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                willChange: "transform",
              }}>
                {[-2, -1, 0, 1, 2].map((offset, s) => {
                  const i = mod(cur + offset, N);
                  const acc = ACCENTS[i % ACCENTS.length];
                  const project = PROJECTS[i];
                  const isCenter = offset === 0;
                  const isSide = Math.abs(offset) === 1;
                  const hasLive = !!project.tryLink;
                  const hasSource = !!project.sourceLink;

                  return (
                    <div
                      key={s}
                      style={{
                        width: CW,
                        flexShrink: 0,
                        borderRadius: 18,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        background: "#ffffff",
                        border: `0.5px solid ${isCenter ? acc.base : "rgba(0,0,0,0.08)"}`,
                        transform: `scale(${isCenter ? 1 : 0.88})`,
                        opacity: isCenter ? 1 : isSide ? (isMobile ? 0.25 : 0.42) : 0,
                        pointerEvents: isCenter || isSide ? "auto" : "none",
                        boxShadow: isCenter ? `0 10px 32px ${acc.base}30` : "none",
                        transition: "transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.65s, border-color 0.4s, box-shadow 0.4s",
                      }}
                    >
                      {/* Thumbnail */}
                      <div style={{
                        width: "100%",
                        height: isMobile ? 160 : 185,
                        overflow: "hidden",
                        background: acc.bg,
                        flexShrink: 0,
                      }}>
                        <img
                          src={project.img}
                          alt={project.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                            filter: isCenter ? "brightness(1)" : "brightness(0.85)",
                            transition: "filter 0.4s",
                          }}
                        />
                      </div>

                      {/* Body */}
                      <div style={{ padding: isMobile ? "12px 14px 8px" : "16px 18px 10px", flex: 1 }}>
                        <p style={{
                          fontSize: isMobile ? 14 : 16,
                          fontWeight: 500,
                          color: "#111",
                          letterSpacing: "-0.01em",
                          margin: "0 0 6px",
                          fontFamily: "Russo One, sans-serif",
                        }}>
                          {project.title}
                        </p>
                        <p style={{
                          fontSize: isMobile ? 11 : 12,
                          color: "#6b7280",
                          lineHeight: 1.65,
                          margin: 0,
                        }}>
                          {project.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: isMobile ? "8px 14px 12px" : "10px 18px 16px",
                        borderTop: "0.5px solid rgba(0,0,0,0.06)",
                      }}>
                        {hasLive && (
                          <button
                            onClick={() => handleLink(project.tryLink)}
                            style={{
                              fontSize: isMobile ? 11 : 12,
                              fontWeight: 500,
                              padding: isMobile ? "4px 11px" : "5px 14px",
                              borderRadius: 8,
                              border: "none",
                              color: "#fff",
                              cursor: "pointer",
                              fontFamily: "inherit",
                              background: acc.base,
                            }}
                          >
                             Try it
                          </button>
                        )}
                        {hasSource && (
                          <button
                            onClick={() => handleLink(project.sourceLink)}
                            style={{
                              fontSize: isMobile ? 11 : 12,
                              fontWeight: 500,
                              padding: isMobile ? "4px 11px" : "5px 14px",
                              borderRadius: 8,
                              border: "0.5px solid rgba(0,0,0,0.15)",
                              background: "transparent",
                              color: "#111",
                              cursor: "pointer",
                              fontFamily: "inherit",
                            }}
                          >
                            # Source
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => step(1)}
            style={{
              flexShrink: 0,
              width: isMobile ? 30 : 36,
              height: isMobile ? 30 : 36,
              borderRadius: "50%",
              border: `0.5px solid ${t.borderColor}`,
              background: "transparent",
              color: t.mainText,
              cursor: "pointer",
              fontSize: isMobile ? 14 : 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.15s",
            }}
          >›</button>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 32 }}>
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCur(i)}
              style={{
                height: 3,
                width: i === mod(cur, N) ? 22 : 6,
                borderRadius: 99,
                border: "none",
                cursor: "pointer",
                padding: 0,
                background: i === mod(cur, N)
                  ? ACCENTS[i % ACCENTS.length].base
                  : "rgba(128,128,128,0.25)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        {/* Skills belt */}
        <div style={{ paddingBottom: 50 }}>
          <p style={{
            textAlign: "center",
            fontFamily: "Russo One, sans-serif",
            fontSize: 13,
            color: t.secondaryText,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}>
            Tech Stack
          </p>
          <div style={{ overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(to right, ${t.mainColor}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(to left, ${t.mainColor}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
            <div style={{ display: "flex", animation: "skillScroll 32s linear infinite", width: "max-content" }}>
              {[...SKILLS, ...SKILLS].map((skill, i) => (
                <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 18px", margin: "0 6px", borderRadius: 99, border: `1px solid ${t.borderColor}`, background: t.secondaryColor, whiteSpace: "nowrap", flexShrink: 0 }}>
                  <img src={skill.icon} alt={skill.name} width={22} height={22} style={{ display: "block", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: t.mainText, fontFamily: "Roboto Mono, monospace" }}>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes skillScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}