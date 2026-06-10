import Goofy from "../../assets/Goofy.gif";

const SKILLS = [
  ["Java", "Kotlin", "Python", "Javascript", "C++"],
  ["Sqlite", "Discord APIs", "HTML", "CSS","flask"],
];

/**
 * About section — bio, skills grid, and social links.
 * Props: theme, sectionStyle, containerStyle
 */
export default function AboutSection({ theme, sectionStyle, containerStyle }) {
  const t = theme.vars;

  const headingFont = { fontFamily: "Russo One, sans-serif",   fontWeight: 500, color: t.mainText };
  const bodyFont    = { fontFamily: "Roboto Mono, monospace",  color: t.mainText };
  const linkStyle   = { color: "#17a2b8", textDecoration: "none", ...bodyFont, fontSize: 14 };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          paddingTop: 50,
          paddingBottom: 50,
          gap: 100,
        }}>

          {/* Bio + Skills */}
          <div>
            <h4 style={{ ...headingFont, fontSize: 24 }}>More about me</h4>
            <p style={{ ...bodyFont, fontSize: 14, lineHeight: 1.7 }}>
              My name is Shlok Kokate, and I'm a 19-year-old programer from India.
              Passionate about building software / hardware projects that don't feel like tools
              but more like but companions.
            </p>
            <p style={{ ...bodyFont, fontSize: 14, lineHeight: 1.7 }}>
              I want to Contribute more to my opensource projects.
              I have a hobby of writing fiveM Scripts for games like GTAV and RDR2.
            </p>

            <hr style={{ borderColor: t.borderColor }} />

            <h4 style={{ ...headingFont, fontSize: 24 }}>TOP EXPERTISE</h4>
            <p style={{ ...bodyFont, fontSize: 14 }}>
              Advance Level Programmer with primary focus on Python, Micro-controllers
            </p>

            <div style={{
              display: "flex",
              justifyContent: "space-evenly",
              backgroundColor: t.previewShadow,
              padding: "10px 0",
            }}>
              {SKILLS.map((col, ci) => (
                <ul key={ci} style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {col.map((skill) => (
                    <li key={skill} style={{ ...bodyFont, fontSize: 14, padding: "4px 0" }}>
                      {skill}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div style={{
            display: "grid",
            alignContent: "center",
            textAlign: "center",
            ...bodyFont,
            fontWeight: 600,
          }}>
            <a href="https://discord.gg/KSCFxtM2nC" target="_blank" rel="noopener noreferrer">
              <img
                src={Goofy}
                alt="Social"
                style={{ width: "60%", borderRadius: 12 }}
              />
            </a>

            <h3 style={{ ...headingFont, fontSize: 28, marginTop: 20 }}>
              Find me on Instagram &amp; Discord
            </h3>

            <a href="https://discord.gg/KSCFxtM2nC"              target="_blank" rel="noopener noreferrer" style={linkStyle}>Discord: annonymspixel</a>
            <br />
            <a href="https://www.instagram.com/ihadadreame/"      target="_blank" rel="noopener noreferrer" style={linkStyle}>Instagram: @ihadadreame</a>
            <br />
            <a href="https://github.com/AnnonymsPixel"            target="_blank" rel="noopener noreferrer" style={linkStyle}>Github: @AnnonymsPixel</a>
          </div>

        </div>
      </div>
    </section>
  );
}
