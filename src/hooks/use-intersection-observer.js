'use client';

import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      setEntry(entry);
    }, {
      threshold: options.threshold || 0,
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [options.threshold, options.root, options.rootMargin]);

  return [elementRef, isIntersecting, entry];
}