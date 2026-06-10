const GITHUB_USER  = "AnnonymsPixel";
const STATS_BASE   = "https://github-readme-stats.codestackr.vercel.app/api?username=zone-infinity&show_icons=true&hide_border=true";
const STREAKS_BASE = "https://github-readme-streak-stats.herokuapp.com/?user=zone-infinity&hide_border=true";

/**
 * GitHub section — stats and streak cards.
 * Props: theme, sectionStyle, containerStyle
 */
export default function GithubSection({ theme, sectionStyle, containerStyle }) {
  const t = theme.vars;
  const headingFont = { fontFamily: "Russo One, sans-serif", fontWeight: 500, color: t.mainText };

  const cardStyle = {
    borderRadius: 10,
    boxShadow: "-2px 7px 21px -9px rgba(0,0,0,0.75)",
    maxWidth: "100%",
  };

  return (
    <section id="github" style={sectionStyle}>
      <div style={containerStyle}>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <h3 style={{ ...headingFont, fontSize: 28, textAlign: "center", paddingTop: 30 }}>
            My Github
          </h3>
        </a>

        <div style={{ display: "grid", gap: 20, justifyContent: "center", paddingBottom: 50 }}>
          <img src={STATS_BASE   + t.githubTheme} alt="GitHub Stats"   style={cardStyle} />
          <img src={STREAKS_BASE + t.githubTheme} alt="GitHub Streaks" style={cardStyle} />
        </div>
      </div>
    </section>
  );
}
