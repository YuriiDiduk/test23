import { DESKTOP_QUERY, MOBILE_QUERY } from "const";
import { useState, useEffect } from "react";

export const  useMedia = () => {
  const queryMobile = MOBILE_QUERY;
  const queryDesktop = DESKTOP_QUERY;

  const mediaMobile = window.matchMedia(queryMobile);
  const mediaDesktop = window.matchMedia(queryDesktop);

  const [isMobile, setMobile] = useState(mediaMobile.matches);
  const [isDesktop, setDesktop] = useState(mediaMobile.matches);

  const listenerMobile = () => {
    setMobile(mediaMobile.matches);
  };

  const listenerDesktop = () => {
    setDesktop(mediaDesktop.matches);
  };

  useEffect(() => {
    listenerMobile();
    listenerDesktop();

    if (mediaMobile.addEventListener) {
      mediaMobile.addEventListener("change", listenerMobile);
      mediaDesktop.addEventListener("change", listenerDesktop);
      return () =>  {
        mediaMobile.removeEventListener("change", listenerMobile);
        mediaDesktop.removeEventListener("change", listenerDesktop);
      }
    } else {
      mediaMobile.addListener(listenerMobile);
      mediaDesktop.addListener(listenerDesktop);
      return () =>  {
        mediaMobile.removeListener(listenerMobile);
        mediaDesktop.removeListener(listenerDesktop);
      }
    }
  }, [queryMobile, queryDesktop]);

  return {isMobile, isDesktop};
}
