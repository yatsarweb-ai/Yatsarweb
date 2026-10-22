'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './final-contact.module.css';

type Props = { contactLink: (className: string, label: string) => ReactNode };

export default function FinalContact({ contactLink }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = video.current;
    const host = section.current;
    if (!element || !host) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let nearby = false;
    const synchronize = () => {
      if (preference.matches) {
        element.pause();
        if (element.hasAttribute('src')) {
          element.removeAttribute('src');
          element.load();
        }
      } else if (nearby && !document.hidden) {
        if (!element.hasAttribute('src'))
          element.src = '/Contenido Grafico/video fondo.mp4';
        element.play().catch(() => {
          // The dark section remains readable when autoplay is unavailable.
        });
      } else {
        element.pause();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        nearby = entry.isIntersecting;
        synchronize();
      },
      { rootMargin: '300px 0px' },
    );
    observer.observe(host);
    preference.addEventListener('change', synchronize);
    document.addEventListener('visibilitychange', synchronize);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', synchronize);
      document.removeEventListener('visibilitychange', synchronize);
      element.pause();
      element.removeAttribute('src');
      element.load();
    };
  }, []);

  return (
    <section
      ref={section}
      id="contacto"
      className={styles.section}
      aria-labelledby="contact-title"
    >
      <video
        ref={video}
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <h2 id="contact-title" data-scroll-reveal>
          Tus próximos clientes están
          <br className={styles.desktopBreak} /> más cerca de lo que imaginás.
        </h2>
        <p data-scroll-reveal data-reveal-delay="0.08">
          Contame qué tenés en mente y descubramos cómo llevarlo a la web.
        </p>
        <div data-scroll-reveal data-reveal-delay="0.16">
          {contactLink(styles.button, 'Hablemos por WhatsApp')}
        </div>
      </div>
    </section>
  );
}
