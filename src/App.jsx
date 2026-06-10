import { useState, useCallback } from "react";

// Styles
import "./styles/global.css";

// Hooks
import { useTheme }            from "./hooks/useTheme";
import { useTitleTypewriter }  from "./hooks/useTitleTypewriter";
import { useNotification }     from "./hooks/useNotification";

// UI components
import LoadingScreen from "./components/ui/LoadingScreen";
import Notification  from "./components/ui/Notification";

// Page sections
import HeroSection     from "./components/sections/HeroSection";
import AboutSection    from "./components/sections/AboutSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import GithubSection   from "./components/sections/GithubSection";
import ContactSection  from "./components/sections/ContactSection";
import Footer          from "./components/sections/Footer";

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  const { theme, switchTheme }          = useTheme();
  const { notification, notify, dismiss } = useNotification();

  // Animate the browser tab title
  useTitleTypewriter(["Shlok"]);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const t = theme.vars;

  // Shared section background styles
  const s1 = {
    background: `linear-gradient(135deg, ${t.mainColor} 0%, ${t.gradientColor} 100%)`,
    borderBottom: `1px solid ${t.borderColor}`,
    overflow: "auto",
  };
  const s2 = {
    background: `linear-gradient(135deg, ${t.gradientColor} 0%, ${t.secondaryColor} 100%)`,
    borderBottom: `1px solid ${t.borderColor}`,
    overflow: "auto",
  };

  // Shared container width
  const containerStyle = {
    width: "min(1200px, 95%)",
    margin: "0 auto",
  };

  const sharedProps = { theme, sectionStyle: s1, containerStyle };
  const altProps    = { theme, sectionStyle: s2, containerStyle };

  return (
    <>
      {/* Loading overlay */}
      {!appLoaded && <LoadingScreen theme={theme} onComplete={() => setAppLoaded(true)} />}

      {/* Toast notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onDismiss={dismiss}
        />
      )}

      {/* Main content — hidden until loading completes */}
      {appLoaded && (
        <main>
          <HeroSection
            {...sharedProps}
            onSwitchTheme={switchTheme}
            onScrollTo={scrollTo}
          />

          <AboutSection {...altProps} />

          <ProjectsSection
            {...sharedProps}
            onPrivacyNotice={() =>
              notify("Source isn't available because of privacy reasons", "error")
            }
          />

          <GithubSection {...altProps} />

          <ContactSection
            {...sharedProps}
            onNotify={notify}
          />

          <Footer {...altProps} />
        </main>
      )}
    </>
  );
}
