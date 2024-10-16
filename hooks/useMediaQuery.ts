import { useEffect, useState } from "react";

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const windowChangeHandler = () => setMatches(mediaQuery.matches);

    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener("change", windowChangeHandler);
    return () => mediaQuery.removeEventListener("change", windowChangeHandler);
  }, [query]);
  return matches;
}
