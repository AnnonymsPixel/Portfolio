const BROWSER_DOTS = [
  { id: "dot-1", color: "#FC6058" },
  { id: "dot-2", color: "#FEC02F" },
  { id: "dot-3", color: "#2ACA3E" },
];

const NAV_ITEMS = [
  { label: "Projects", target: "projects"     },
  { label: "Github",   target: "github"       },
  { label: "Contact",  target: "contact-form" },
];

/**
 * The macOS-style browser nav bar inside the hero "window" chrome.
 * Props: theme, onSwitchTheme, onScrollTo
 */
export default function Navbar({ theme, onSwitchTheme, onScrollTo }) {
  const t = theme.vars;

  return (
    <div style={{
      gridArea: "nav",
      borderBottom: `1px solid ${t.borderColor}`,
      borderRadius: "5px 5px 0 0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: t.mainColor,
    }}>
      {/* Browser dots */}
      <div style={{ display: "flex", padding: 10 }}>
        {BROWSER_DOTS.map((d) => (
          <div
            key={d.id}
            style={{
              backgroundColor: d.color,
              height: 15,
              width: 15,
              borderRadius: "50%",
              margin: 5,
              boxShadow: "-1px 1px 3px -1px rgba(0,0,0,0.75)",
            }}
          />
        ))}
      </div>

      {/* Nav links */}
      <ul style={{ margin: 0, padding: 10, listStyle: "none", display: "flex" }}>
        {NAV_ITEMS.map((item) => (
          <li
            key={item.label}
            className="nav-link"
            onClick={() => onScrollTo(item.target)}
            style={{
              color: t.mainText,
              fontFamily: "Roboto Mono, monospace",
              fontSize: 14,
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
