import { site } from '@/lib/content';
import styles from './final-contact.module.css';
import OfficialLogo from './official-logo';

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <a
            href="#inicio"
            className={styles.brand}
            aria-label="YATSAR, inicio"
          >
            <OfficialLogo />
          </a>
          <nav
            className={styles.navigation}
            aria-label="Navegación del pie de página"
          >
            <a href="#inicio">Inicio</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#servicios">Servicios</a>
            <a href="#sobre-mi">Sobre mí</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 YATSAR.</span>
          <div className={styles.socials}>
            {site.instagram && (
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            )}
            {site.linkedin && (
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {site.email && <a href={`mailto:${site.email}`}>Email</a>}
          </div>
        </div>
      </div>
    </footer>
  );
}
