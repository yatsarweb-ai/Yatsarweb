'use client';

import { useEffect, type RefObject } from 'react';

export default function useScrollReveals(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function setup() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      const root = scope.current;
      if (disposed || !root) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const tweens = new Map<HTMLElement, ReturnType<typeof gsap.fromTo>>();
        const context = gsap.context(() => {
          root
            .querySelectorAll<HTMLElement>('[data-scroll-reveal]')
            .forEach((element, index) => {
              const direction = element.dataset.scrollReveal;
              const tween = gsap.fromTo(
                element,
                {
                  opacity: 0,
                  x:
                    direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
                  y: direction === 'left' || direction === 'right' ? 0 : 22,
                },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  duration: 0.55,
                  delay: Number(element.dataset.revealDelay || 0),
                  ease: 'power3.out',
                  paused: true,
                },
              );
              tweens.set(element, tween);
              ScrollTrigger.create({
                id: `yatsar-reveal-${index}`,
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                onEnter: () => {
                  tween.play();
                },
                // Reverse only after the element has left below the viewport.
                // Leaving above it or changing direction while reading does not hide it.
                onLeaveBack: () => {
                  if (!element.contains(document.activeElement))
                    tween.reverse();
                },
              });
            });
        }, root);
        const revealFocused = (event: FocusEvent) => {
          const target = event.target as Node;
          tweens.forEach((tween, element) => {
            if (element.contains(target)) tween.progress(1).pause();
          });
        };
        root.addEventListener('focusin', revealFocused);
        return () => {
          root.removeEventListener('focusin', revealFocused);
          context.revert();
        };
      });
      cleanup = () => media.revert();
      await document.fonts.ready;
      if (!disposed) ScrollTrigger.refresh();
    }

    setup().catch(() => cleanup?.());
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [scope]);
}
