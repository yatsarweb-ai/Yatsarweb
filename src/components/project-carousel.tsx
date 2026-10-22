'use client';

import Image from 'next/image';
import { useEffect, useRef, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { featuredProjects } from '@/lib/featured-projects';
import styles from './project-carousel.module.css';

const slides = [0, 1, 2].flatMap((copy) =>
  featuredProjects.map((project) => ({ project, copy })),
);

export default function ProjectCarousel() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = viewport.current!;
    const rail = track.current!;
    const cards = Array.from(
      rail.querySelectorAll<HTMLElement>('[data-carousel-card]'),
    );
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = media.matches;
    let visible = false;
    let frame = 0;
    let previousTime = 0;
    let position = 0;
    let base = 0;
    let cycle = 0;
    let step = 304;
    let velocity = 0;
    let autoSpeed = 0;
    let pauseUntil = 0;
    let target: number | null = null;
    let focused = false;
    let focusedLink = false;
    let keyboardPaused = false;
    let suppressClickUntil = 0;
    let lastRendered = NaN;
    const pointer = { id: -1, x: 0, y: 0, lastX: 0, time: 0, dragging: false };

    const render = () => {
      if (!cycle) return;
      if (!focusedLink) {
        // Rebase whole repeated sets and the target together: no visible seam
        // and no change to the velocity when either direction crosses a loop.
        const normalized =
          base + ((((position - base) % cycle) + cycle) % cycle);
        if (target !== null) target += normalized - position;
        position = normalized;
      }
      if (
        Math.abs(position - lastRendered) > 0.0001 ||
        Number.isNaN(lastRendered)
      ) {
        rail.style.transform = `translate3d(${-position}px, 0, 0)`;
        lastRendered = position;
      }
    };
    const measure = () => {
      const phase = cycle ? (position - base) / cycle : 0;
      step = cards[1].offsetLeft - cards[0].offsetLeft;
      cycle = step * featuredProjects.length;
      base =
        cards[featuredProjects.length].offsetLeft -
        (el.clientWidth - cards[0].offsetWidth) / 2;
      position = base + phase * cycle;
      velocity = 0;
      target = null;
      render();
    };
    const tick = (time: number) => {
      frame = 0;
      const dt = previousTime ? Math.min(time - previousTime, 50) : 0;
      previousTime = time;
      if (pointer.id === -1) {
        if (target !== null) {
          const amount = reduced ? 1 : 1 - Math.exp(-dt / 130);
          position += (target - position) * amount;
          if (Math.abs(target - position) < 0.1) {
            position = target;
            target = null;
          }
        } else {
          if (!reduced && Math.abs(velocity) > 0.001) {
            // Integrate exponential friction independently of the frame rate.
            const decay = Math.exp(-dt / 220);
            position += velocity * 220 * (1 - decay);
            velocity *= decay;
          } else velocity = 0;
          const desiredSpeed =
            !reduced && !focused && !keyboardPaused && time >= pauseUntil
              ? 0.024
              : 0;
          autoSpeed += (desiredSpeed - autoSpeed) * (1 - Math.exp(-dt / 200));
          position += autoSpeed * dt;
        }
      }
      render();
      if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame && visible && !document.hidden) {
        previousTime = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const down = (event: PointerEvent) => {
      if (
        !event.isPrimary ||
        (event.pointerType === 'mouse' && event.button !== 0)
      )
        return;
      pointer.id = event.pointerId;
      pointer.x = pointer.lastX = event.clientX;
      pointer.y = event.clientY;
      pointer.time = event.timeStamp;
      pointer.dragging = false;
      velocity = autoSpeed = 0;
      target = null;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerId !== pointer.id) return;
      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      if (!pointer.dragging) {
        // The browser retains vertical gestures, including diagonal intent.
        if (Math.abs(dx) < 7 || Math.abs(dx) <= Math.abs(dy)) return;
        pointer.dragging = true;
        el.setPointerCapture(event.pointerId);
        if (el.contains(document.activeElement))
          (document.activeElement as HTMLElement).blur();
        focused = focusedLink = false;
        el.dataset.dragging = 'true';
      }
      const distance = pointer.lastX - event.clientX;
      const elapsed = Math.max(8, event.timeStamp - pointer.time);
      position += distance;
      const sample = Math.max(-1.2, Math.min(1.2, distance / elapsed));
      velocity = velocity * 0.35 + sample * 0.65;
      pointer.lastX = event.clientX;
      pointer.time = event.timeStamp;
    };
    const release = (event: PointerEvent) => {
      if (event.pointerId !== pointer.id) return;
      if (pointer.dragging) suppressClickUntil = event.timeStamp + 350;
      if (
        reduced ||
        event.type === 'pointercancel' ||
        event.timeStamp - pointer.time > 100
      )
        velocity = 0;
      pointer.id = -1;
      pointer.dragging = false;
      el.dataset.dragging = 'false';
      pauseUntil = event.timeStamp + 900;
      if (el.hasPointerCapture(event.pointerId))
        el.releasePointerCapture(event.pointerId);
    };
    const click = (event: MouseEvent) => {
      if (event.timeStamp < suppressClickUntil) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    const wheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      target = null;
      velocity = autoSpeed = 0;
      position += event.deltaX * (event.deltaMode === 1 ? 16 : 1);
      pauseUntil = event.timeStamp + 900;
    };
    const focus = (event: FocusEvent) => {
      if (pointer.id !== -1) return;
      focused = true;
      velocity = autoSpeed = 0;
      const card = (event.target as HTMLElement).closest<HTMLElement>(
        '[data-carousel-card]',
      );
      focusedLink = !!card;
      if (card)
        target = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
    };
    const blur = (event: FocusEvent) => {
      if (el.contains(event.relatedTarget as Node | null)) return;
      focused = focusedLink = false;
      pauseUntil = event.timeStamp + 600;
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === ' ' && event.target === el) {
        event.preventDefault();
        keyboardPaused = !keyboardPaused;
      }
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      el.focus({ preventScroll: true });
      focused = true;
      focusedLink = false;
      velocity = autoSpeed = 0;
      target = position + (event.key === 'ArrowRight' ? step : -step);
    };
    const preventDrag = (event: DragEvent) => event.preventDefault();
    const changeMotion = () => {
      reduced = media.matches;
      velocity = autoSpeed = 0;
      target = null;
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        autoSpeed = 0;
      } else start();
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    window.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);
    el.addEventListener('click', click, true);
    el.addEventListener('dragstart', preventDrag);
    el.addEventListener('wheel', wheel, { passive: false });
    el.addEventListener('focusin', focus);
    el.addEventListener('focusout', blur);
    el.addEventListener('keydown', key);
    media.addEventListener('change', changeMotion);
    document.addEventListener('visibilitychange', visibility);
    const resize = new ResizeObserver(measure);
    resize.observe(el);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
        autoSpeed = 0;
      }
    });
    intersection.observe(el);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', release);
      el.removeEventListener('pointercancel', release);
      el.removeEventListener('click', click, true);
      el.removeEventListener('dragstart', preventDrag);
      el.removeEventListener('wheel', wheel);
      el.removeEventListener('focusin', focus);
      el.removeEventListener('focusout', blur);
      el.removeEventListener('keydown', key);
      media.removeEventListener('change', changeMotion);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  return (
    <section
      className={styles.section}
      id="proyectos"
      aria-labelledby="latest-projects-title"
    >
      <div className={styles.heading}>
        <p className={styles.eyebrow} data-scroll-reveal>
          DISEÑO EN ACCIÓN
        </p>
        <h2 id="latest-projects-title" data-scroll-reveal>
          Nuestros últimos proyectos
        </h2>
        <p
          className={styles.description}
          data-scroll-reveal
          data-reveal-delay="0.08"
        >
          Distintas marcas. Una presencia digital con identidad propia.
        </p>
      </div>
      <p id="carousel-help" className="sr-only">
        Arrastrá para explorar. También podés usar las flechas del teclado. Al
        enfocar el carrusel, el movimiento automático se pausa; la barra
        espaciadora lo pausa o reanuda al salir.
      </p>
      <div
        className={styles.carousel}
        data-scroll-reveal
        data-reveal-delay="0.16"
      >
        <div
          ref={viewport}
          className={styles.viewport}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Proyectos de YATSAR"
          aria-describedby="carousel-help"
          tabIndex={0}
        >
          <div ref={track} className={styles.track}>
            {slides.map(({ project, copy }) => (
              <article
                key={`${copy}-${project.id}`}
                className={styles.card}
                data-carousel-card
                aria-hidden={copy !== 1 ? true : undefined}
                style={{ '--project-color': project.color } as CSSProperties}
              >
                <a
                  className={styles.cardLink}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-project-source={copy === 1 ? project.id : undefined}
                  tabIndex={copy === 1 ? 0 : -1}
                  aria-label={`Visitar ${project.name}, abre en otra pestaña`}
                  draggable={false}
                >
                  <Image
                    src={project.image}
                    alt={`Captura del sitio ${project.name}`}
                    fill
                    sizes="290px"
                    draggable={false}
                  />
                  <span className={styles.reflection} aria-hidden="true" />
                  <span className={styles.caption}>
                    <strong>{project.name}</strong>
                    <span className={styles.visitIcon}>
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
