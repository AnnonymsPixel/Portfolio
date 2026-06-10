import { useState, useEffect } from "react";
import pfp from "../../assets/pfp.png";

/**
 * Full-screen loading overlay with a progress bar.
 * Calls onComplete() once the animation finishes.
 */
export default function LoadingScreen({ theme, onComplete }) {
  
  const [progress, setProgress] = useState(0);
  const [hidden,   setHidden]   = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 3 + 1;

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setHidden(true);
            setTimeout(onComplete, 400);
          }, 500);
          return 100;
        }

        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      id="loading-screen"
      className={hidden ? "hidden" : ""}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: 30 }}>
          <img
            src={pfp} alt="Profile"
            className="loading-gif"
          />
        </div>

        <div className="progress-bar-track">
    <div
      className="progress-bar-fill"
      style={{
        width: `${progress}%`,
        height: "10px",
        backgroundColor: theme.vars.buttonColor,
        transition: "width 0.3s ease",
        borderRadius: "15px",
    }}
  />
</div>

        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
}