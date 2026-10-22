'use client';

import Image from 'next/image';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import styles from './landing-hero.module.css';
import OfficialLogo from './official-logo';

type Props = { contactLink: (className: string, label: string) => ReactNode };
const links = [
  ['Proyectos', 'proyectos'],
  ['Servicios', 'servicios'],
  ['Sobre mí', 'sobre-mi'],
];

function DeviceImage({ device }: { device: 'notebook' | 'phone' }) {
  // Bounds include every nontransparent pixel of the supplied PNGs. Only the
  // transparent canvas is framed out; the source files stay untouched.
  const bounds =
    device === 'notebook'
      ? { x: 95, y: 251, width: 1412, height: 1345 }
      : { x: 163, y: 162, width: 1309, height: 1638 };
  return (
    <div
      className={styles.deviceCrop}
      style={
        {
          '--device-ratio': `${bounds.width}/${bounds.height}`,
        } as CSSProperties
      }
    >
      <Image
        src={`/Contenido Grafico/Mockup ${device === 'notebook' ? 'Notebook' : 'Celular'} (2).PNG`}
        width={1620}
        height={2025}
        alt={
          device === 'notebook'
            ? 'Notebook con la demo de Natura Ludmi.'
            : 'Celular con el catálogo mostrado en el mockup original.'
        }
        preload
        unoptimized
        className={styles.deviceImage}
        style={
          {
            '--image-width': `${(1620 / bounds.width) * 100}%`,
            '--image-left': `${(-bounds.x / bounds.width) * 100}%`,
            '--image-top': `${(-bounds.y / bounds.height) * 100}%`,
          } as CSSProperties
        }
      />
    </div>
  );
}

export default function LandingHero({ contactLink }: Props) {
  const scene = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const composition = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    async function setup() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (
        cancelled ||
        !scene.current ||
        !visual.current ||
        !composition.current ||
        !frame.current
      )
        return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 761px)',
        },
        (context) => {
          if (!context.conditions?.motion && !context.conditions?.desktop)
            return;
          const desktop = context.conditions.desktop;
          const host = scene.current!;
          const stage = visual.current!;
          const group = composition.current!;
          const interactive = [header.current!, copy.current!];
          const notebook = group.querySelector<HTMLElement>(
            '[data-device="notebook"]',
          )!;
          const phone = group.querySelector<HTMLElement>(
            '[data-device="phone"]',
          )!;
          const fitDevices = () => {
            const room = Math.max(
              desktop ? 180 : 170,
              window.innerHeight -
                stage.offsetTop -
                frame.current!.offsetTop -
                24,
            );
            stage.style.setProperty('--device-room', `${room}px`);
          };
          fitDevices();
          // Measure the original grid without reading animated bounding boxes.
          // Keeping that grid intact preserves the approved final composition.
          const layoutPosition = (element: HTMLElement) => {
            let left = 0;
            let top = 0;
            let ancestor: HTMLElement | null = element;
            while (ancestor && ancestor !== host) {
              left += ancestor.offsetLeft;
              top += ancestor.offsetTop;
              ancestor = ancestor.offsetParent as HTMLElement | null;
            }
            return { left, top };
          };
          const initialDevice = (
            element: HTMLElement,
            isNotebook: boolean,
            parentScale = 1,
          ) => {
            if (!desktop) return { x: 0, y: 0, scale: 1 };
            const { left, top } = layoutPosition(element);
            const groupPosition = layoutPosition(group);
            const width = Math.min(
              isNotebook ? 600 : 390,
              window.innerWidth * (isNotebook ? 0.43 : 0.26),
            );
            const scale = width / element.offsetWidth;
            const height = element.offsetHeight * scale;
            const desiredLeft = isNotebook
              ? -window.innerWidth * 0.055
              : window.innerWidth -
                width -
                Math.max(40, window.innerWidth * 0.06);
            const desiredTop =
              Math.max(
                150,
                Math.min(
                  window.innerHeight * (isNotebook ? 0.36 : 0.48),
                  window.innerHeight - height * 0.86,
                ),
              ) + (isNotebook ? 80 : 0);
            return {
              x:
                (desiredLeft - left + (width - element.offsetWidth) / 2) /
                  parentScale +
                (left +
                  element.offsetWidth / 2 -
                  groupPosition.left -
                  group.offsetWidth / 2) *
                  (1 / parentScale - 1),
              y:
                (desiredTop - top + (height - element.offsetHeight) / 2) /
                  parentScale +
                (top +
                  element.offsetHeight / 2 -
                  groupPosition.top -
                  group.offsetHeight / 2) *
                  (1 / parentScale - 1),
              scale: scale / parentScale,
            };
          };
          if (!context.conditions?.motion) {
            const renderStatic = () => {
              context.add(() => {
                fitDevices();
                gsap.set(notebook, initialDevice(notebook, true));
                gsap.set(phone, initialDevice(phone, false));
              });
            };
            renderStatic();
            // Re-measure after the responsive content and former pin settle.
            const observer = new ResizeObserver(renderStatic);
            observer.observe(copy.current!);
            observer.observe(group);
            return () => {
              observer.disconnect();
              stage.style.removeProperty('--device-room');
            };
          }
          ScrollTrigger.addEventListener('refreshInit', fitDevices);
          const sceneStart = host.getBoundingClientRect().top + window.scrollY;
          // Let the full initial composition become visible before the brief pin.
          // Align the blue hero's bottom with the viewport to avoid empty space
          // between pin release and the first natural pixel of projects.
          const pin = ScrollTrigger.create({
            id: 'yatsar-hero-pin',
            trigger: host,
            start: () =>
              Math.max(0, sceneStart + host.clientHeight - window.innerHeight),
            end: () =>
              `+=${Math.round(window.innerHeight * (desktop ? 0.32 : 0.22))}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
          });
          const targetScale = () =>
            Math.max(
              1,
              Math.min(
                desktop
                  ? Math.min(920, stage.clientWidth * 0.8) / group.offsetWidth
                  : 1.08,
                (stage.clientWidth - 24) / group.offsetWidth,
                (window.innerHeight - 64) / group.offsetHeight,
              ),
            );
          // Only the approach is animated. After pin release the entire hero
          // and its fully opaque devices leave through ordinary document scroll.
          // Build it paused: a cached/production load may restore scroll before
          // the effect runs. Never let ScrollTrigger render a partial timeline.
          const timeline = gsap.timeline({
            paused: true,
            defaults: { ease: 'none' },
          });
          timeline
            .fromTo(
              interactive,
              { autoAlpha: 1 },
              { autoAlpha: 0, duration: 1, immediateRender: false },
              0,
            )
            .fromTo(
              group,
              // Desktop starts with the final parent scale. The children grow
              // linearly into it, avoiding multiplied scales and an overshoot.
              { scale: () => (desktop ? targetScale() : 1), x: 0, y: 0 },
              {
                scale: targetScale,
                // Compensate for the asymmetric overlap so the joined devices,
                // rather than their original grid, remain visually centered.
                x: () => group.offsetWidth * targetScale() * 0.0075,
                y: () =>
                  Math.min(
                    0,
                    window.innerHeight * 0.5 -
                      (stage.offsetTop +
                        frame.current!.offsetTop +
                        group.offsetTop +
                        group.offsetHeight / 2 -
                        (pin.start - sceneStart)),
                  ),
                duration: 1,
                immediateRender: !!desktop,
              },
              1,
            )
            .fromTo(
              notebook,
              {
                x: () => initialDevice(notebook, true, targetScale()).x,
                y: () => initialDevice(notebook, true, targetScale()).y,
                scale: () => initialDevice(notebook, true, targetScale()).scale,
              },
              {
                x: () => group.offsetWidth * (desktop ? 0.035 : 0.02),
                y: 0,
                scale: 1,
                duration: 1,
                immediateRender: !!desktop,
              },
              1,
            )
            .fromTo(
              phone,
              {
                x: () => initialDevice(phone, false, targetScale()).x,
                y: () => initialDevice(phone, false, targetScale()).y,
                scale: () => initialDevice(phone, false, targetScale()).scale,
              },
              {
                x: () => -group.offsetWidth * (desktop ? 0.1 : 0.06),
                y: 0,
                scale: desktop ? 1.3 : 1.15,
                duration: 1,
                immediateRender: !!desktop,
              },
              1,
            );
          const tweens = timeline.getChildren(false, true, false);
          const intro = tweens.find((tween) =>
            tween.targets().includes(copy.current!),
          )!;
          const moves = tweens.filter((tween) => tween !== intro);
          const synchronize = () => {
            const growthStart = desktop
              ? Math.max(0, pin.start - sceneStart)
              : 0;
            intro
              .startTime(0)
              .duration(
                Math.min(
                  110,
                  Math.max(50, growthStart + (pin.end - pin.start) * 0.45),
                ),
              );
            moves.forEach((tween) =>
              tween
                .startTime(growthStart)
                .duration(Math.max(1, pin.end - pin.start)),
            );
          };
          synchronize();
          const updateInteractivity = () => {
            interactive.forEach((el) => {
              el.inert = Number(gsap.getProperty(el, 'opacity')) < 0.05;
            });
          };
          // Numeric scrub keeps rendering briefly after the last scroll event.
          timeline.eventCallback('onUpdate', updateInteractivity);
          const animationTrigger = ScrollTrigger.create({
            id: 'yatsar-hero',
            trigger: host,
            animation: timeline,
            // Mobile first scrolls its complete image zone into view naturally.
            // The fade and approach then share only the short pinned interval.
            start: () => (desktop ? sceneStart : pin.start),
            end: () => pin.end,
            scrub: desktop ? 0.2 : true,
            invalidateOnRefresh: true,
            onRefresh: (trigger) => {
              synchronize();
              // Render zero explicitly too, restoring visibility after a refresh
              // or return from projects instead of retaining an old exit frame.
              timeline.totalProgress(trigger.progress, true);
              updateInteractivity();
            },
            onUpdate: updateInteractivity,
          });
          return () => {
            interactive.forEach((el) => {
              el.inert = false;
            });
            animationTrigger.kill();
            timeline.revert();
            pin.kill(true);
            ScrollTrigger.removeEventListener('refreshInit', fitDevices);
            stage.style.removeProperty('--device-room');
          };
        },
      );
      const refresh = () => {
        if (!cancelled) ScrollTrigger.refresh();
      };
      document.fonts.ready.then(refresh);
      Promise.all(
        Array.from(scene.current.querySelectorAll('img')).map((img) =>
          img.decode().catch(() => {}),
        ),
      ).then(refresh);
      dispose = () => mm.revert();
    }
    setup().catch(() => {
      /* The static hero stays usable if animation cannot load. */
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('keydown', escape);
      document.removeEventListener('pointerdown', outside);
    };
  }, [menuOpen]);

  return (
    <>
      <section
        ref={scene}
        className={styles.scene}
        aria-labelledby="hero-title"
        data-hero-scene
      >
        <div ref={frame} className={styles.frame}>
          <Image
            src="/Contenido Grafico/Fondo portada.PNG"
            alt=""
            fill
            preload
            unoptimized
            className={styles.background}
            sizes="100vw"
          />
          <header ref={header} className={styles.header}>
            <a
              href="#inicio"
              className={styles.logo}
              aria-label="YATSAR, inicio"
            >
              <OfficialLogo preload />
            </a>
            <nav
              id="hero-navigation"
              aria-label="Navegación principal"
              className={`${styles.navigation} ${menuOpen ? styles.open : ''}`}
            >
              {links.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(event) => {
                    setMenuOpen(false);
                    if (id !== 'sobre-mi') return;
                    const target = document.getElementById(id);
                    if (!target) return;
                    event.preventDefault();
                    event.currentTarget.blur();
                    window.history.pushState(null, '', `#${id}`);
                    // Cross the pinned hero in one step so its scroll updates
                    // cannot interrupt the anchor navigation halfway through.
                    target.scrollIntoView({
                      behavior: 'instant',
                      block: 'start',
                    });
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>
            <button
              ref={menuButton}
              className={styles.menuButton}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="hero-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </header>
          <div ref={copy} className={styles.copy} data-hero-content>
            <p className={styles.label}>DISEÑO Y DESARROLLO WEB</p>
            <h1
              id="hero-title"
              aria-label="Tu negocio merece una web a su ALTURA"
            >
              <span>Tu negocio merece</span>
              <span>
                una web a su <strong>ALTURA</strong>
              </span>
            </h1>
            <p className={styles.description}>
              Creo sitios web para emprendimientos y negocios que quieren verse
              mejor, destacar online y tener una presencia más profesional.
            </p>
            <div className={styles.actions}>
              {contactLink(styles.whatsappButton, 'Hablemos por WhatsApp')}
              <a className={styles.projectsButton} href="#proyectos">
                Ver proyectos <ArrowRight size={17} />
              </a>
            </div>
          </div>
          <div ref={visual} className={styles.visualStage} data-hero-visual>
            <div
              ref={composition}
              className={styles.composition}
              data-device-composition
            >
              <div className={styles.notebook} data-device="notebook">
                <DeviceImage device="notebook" />
              </div>
              <div className={styles.phone} data-device="phone">
                <DeviceImage device="phone" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
