/**
 * ProjectCard — Unique, recruiter-ready project card component.
 * Props: project { title, description, tryLink, sourceLink, img, tag }, theme, onPrivacyNotice
 */
export default function ProjectCard({ project, theme, onPrivacyNotice }) {
  if (!project) return null;

  const { title, description, tryLink, sourceLink, img, tag } = project;
  const hasLive = !!tryLink;
  const hasSource = !!sourceLink;

  const handleLink = (url) => {
    if (!url) return;
    if (onPrivacyNotice) {
      onPrivacyNotice(url);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div style={styles.card}>
      {/* Thumbnail */}
      <div style={styles.thumbWrap}>
        <img
          src={img}
          alt={title}
          style={styles.thumb}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.filter = "brightness(1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.filter = "brightness(0.85)";
          }}
        />
        {tag && <span style={styles.tag}>{tag}</span>}
      </div>

      {/* Body */}
      <div style={styles.body}>
        <p style={styles.title}>{title}</p>
        <p style={styles.desc}>{description}</p>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        {hasLive && (
          <button
            onClick={() => handleLink(tryLink)}
            style={{ ...styles.btn, ...styles.btnPrimary }}
          >
            ↗ Try It
          </button>
        )}
        {hasSource && (
          <button
            onClick={() => handleLink(sourceLink)}
            style={styles.btn}
          >
            ~# Source
          </button>
        )}
        <span
          style={{
            ...styles.dot,
            background: hasLive ? "#22c55e" : "#9ca3af",
            marginLeft: "auto",
          }}
          title={hasLive ? "Live" : "In development"}
        />
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    border: "0.5px solid rgba(0,0,0,0.1)",
    borderRadius: 16,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease, border-color 0.3s ease",
    cursor: "default",
  },
  thumbWrap: {
    position: "relative",
    width: "100%",
    aspectRatio: "16/9",
    overflow: "hidden",
    background: "#f3f4f6",
  },
  thumb: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    filter: "brightness(0.85)",
    transition: "transform 0.4s ease, filter 0.3s ease",
  },
  tag: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "3px 8px",
    borderRadius: 6,
    background: "rgba(255,255,255,0.92)",
    color: "#555",
    border: "0.5px solid rgba(0,0,0,0.1)",
  },
  body: {
    padding: "18px 18px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: "#111",
    letterSpacing: "-0.01em",
    margin: 0,
  },
  desc: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 1.65,
    margin: 0,
    flex: 1,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "14px 18px 16px",
    borderTop: "0.5px solid rgba(0,0,0,0.07)",
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    fontSize: 13,
    fontWeight: 500,
    padding: "6px 14px",
    borderRadius: 8,
    border: "0.5px solid rgba(0,0,0,0.15)",
    color: "#111",
    background: "transparent",
    cursor: "pointer",
    transition: "background 0.18s",
    fontFamily: "inherit",
  },
  btnPrimary: {
    background: "#111",
    color: "#fff",
    border: "0.5px solid transparent",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    flexShrink: 0,
  },
};