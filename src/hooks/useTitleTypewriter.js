import { useEffect } from "react";

/**
 * Animates the browser tab title with a typewriter effect.
 * Loops through the provided messages array forever.
 */
export function useTitleTypewriter(messages = ["Shlok"], options = {}) {
  const {
    typeSpeed   = 280,
    deleteSpeed = 280,
    pauseEnd    = 2000,
    pauseStart  = 400,
    baseTitle   = "• ",
  } = options;

  useEffect(() => {
    let animId;
    let messageIndex = 0;
    let charIndex    = 0;
    let isDeleting   = false;
    let lastTime     = 0;
    let accumulator  = 0;

    document.title = baseTitle;

    function frame(now) {
      if (!lastTime) lastTime = now;
      accumulator += now - lastTime;
      lastTime = now;

      const delay = isDeleting ? deleteSpeed : typeSpeed;

      if (accumulator >= delay) {
        accumulator = 0;
        const current = messages[messageIndex];

        if (isDeleting) {
          charIndex--;
          document.title = baseTitle + current.substring(0, charIndex);

          if (charIndex === 0) {
            isDeleting   = false;
            messageIndex = (messageIndex + 1) % messages.length;
            lastTime     = 0;
            setTimeout(() => { animId = requestAnimationFrame(frame); }, pauseStart);
            return;
          }
        } else {
          charIndex++;
          document.title = baseTitle + current.substring(0, charIndex);

          if (charIndex === current.length) {
            isDeleting = true;
            lastTime   = 0;
            setTimeout(() => { animId = requestAnimationFrame(frame); }, pauseEnd);
            return;
          }
        }
      }

      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
