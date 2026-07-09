import { useEffect, useRef, useState } from "react";

// Shared observer to reduce performance overhead
let sharedObserver: IntersectionObserver | null = null;
const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -60px 0px" };

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    // Use shared observer for better performance
    if (!sharedObserver) {
      sharedObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const target = e.target as HTMLElement;
              target.dataset.revealed = "true";
            }
          });
        },
        observerOptions
      );
    }
    
    // Check if already revealed
    if (el.dataset.revealed === "true") {
      setShown(true);
      return;
    }
    
    const checkReveal = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.target === el) {
          setShown(true);
          sharedObserver?.unobserve(el);
        }
      });
    };
    
    // Use individual observer for this element
    const io = new IntersectionObserver(checkReveal, { threshold, rootMargin: "0px 0px -60px 0px" });
    io.observe(el);
    
    return () => {
      io.disconnect();
    };
  }, [threshold]);
  
  return { ref, shown };
}
