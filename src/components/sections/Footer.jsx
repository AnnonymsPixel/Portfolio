/**
 * Footer — just the heart emoji that changes with the theme.
 * Props: theme, sectionStyle, containerStyle
 */
export default function Footer({ theme, sectionStyle, containerStyle }) {
  const t = theme.vars;
  const headingFont = { fontFamily: "Russo One, sans-serif", fontWeight: 500, color: t.mainText };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h6 style={{ ...headingFont, fontSize: 14, textAlign: "center", padding: "20px 0" }}>
          Made with {theme.heart}
        </h6>
      </div>
    </section>
  );
}
