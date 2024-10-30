import type { RefObject } from 'react';
import { useState, useEffect } from 'react';

export const useIntersectionObserver = (
  ref: RefObject<Element>,
  options: IntersectionObserverInit = { threshold: 0.5 },
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setIsIntersecting(entry.isIntersecting);
      });
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};
