import Navbar from "../layout/Navbar";
import THEMES from "../../data/themes";
import pfp from "../../assets/pfp.png";

const CORNER_POSITIONS = [
  { top: -5, left: -5 },
  { top: -5, right: -5 },
  { bottom: -5, left: -5 },
  { bottom: -5, right: -5 },
];

/**
 * Hero section — greeting, browser chrome with profile pic, theme switcher, and preview card.
 * Props: theme, onSwitchTheme, sectionStyle, containerStyle
 */
export default function HeroSection({ theme, onSwitchTheme, onScrollTo, sectionStyle, containerStyle }) {
  const t = theme.vars;

  const headingFont = { fontFamily: "Russo One, sans-serif", fontWeight: 500, color: t.mainText };
  const bodyFont    = { fontFamily: "Roboto Mono, monospace", color: t.mainText };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>

        {/* Greeting */}
        <div style={{ display: "grid", textAlign: "center", alignContent: "center", minHeight: "10em" }}>
          <h1 style={{ ...headingFont, fontSize: "clamp(32px, 6vw, 56px)", margin: 0, padding: "20px 0" }}>
            Hi, I'm Shlok Kokate
          </h1>
        </div>

        {/* Browser window */}
        <div
          className="intro-grid"
          style={{
            backgroundColor: t.secondaryColor,
            border: `1px solid ${t.borderColor}`,
            borderRadius: "5px 5px 0 0",
            boxShadow: "-1px 1px 3px -1px rgba(0,0,0,0.75)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateAreas: "'nav nav' 'left right'",
          }}
        >
          <Navbar theme={theme} onSwitchTheme={onSwitchTheme} onScrollTo={onScrollTo} />

          {/* Left — profile pic + theme switcher */}
          <div className="left-col" style={{ gridArea: "left", paddingTop: 50, paddingBottom: 50 }}>
            <img
              src={pfp} alt="Profile"
              className="profile-pic"
              style={{
                display: "block",
                margin: "0 auto",
                height: 200,
                width: 200,
                objectFit: "cover",
                border: `2px solid ${t.borderColor}`,
                borderRadius: "50%",
              }}
            />

            <h5 style={{ ...headingFont, fontSize: 20, textAlign: "center", marginTop: 24, marginBottom: 0 }}>
              Personalize Theme
            </h5>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
              {Object.entries(THEMES).map(([key, th]) => (
                <div
                  key={key}
                  className="theme-dot"
                  title={key}
                  onClick={() => onSwitchTheme(key)}
                  style={{
                    backgroundColor: th.dot,
                    borderColor: t.themeDotBorder,
                  }}
                />
              ))}
            </div>

            <p style={{ ...bodyFont, fontSize: 12, fontStyle: "italic", textAlign: "center" }}>
              *Theme settings will be saved for<br />your next visit
            </p>
          </div>

          {/* Right — "What I Do" preview card */}
          <div className="right-col" style={{ gridArea: "right", display: "grid", alignContent: "center", paddingTop: 50, paddingBottom: 50 }}>
            <div
              className="preview-shadow"
              style={{ backgroundColor: t.previewShadow, width: 300, height: 180, paddingLeft: 30, paddingTop: 30 }}
            >
              <div style={{
                width: 300,
                border: "1.5px solid #17a2b8",
                backgroundColor: t.previewBg,
                padding: 15,
                position: "relative",
              }}>
                {CORNER_POSITIONS.map((pos, i) => (
                  <div key={i} style={{
                    width: 7, height: 7,
                    borderRadius: "50%",
                    border: "1.5px solid #17a2b8",
                    backgroundColor: "#fff",
                    position: "absolute",
                    ...pos,
                  }} />
                ))}
                <h3 style={{ ...headingFont, fontSize: 28, margin: 0 }}>What I Do</h3>
                <p style={{ ...bodyFont, fontSize: 14 }}>
                  Data Aquisition At Team RGIT<br></br>
                  UI / UX Design<br></br>
                  Backend Development<br></br>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
