'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import LandingHero from './landing-hero';
import ProjectCarousel from './project-carousel';
import BusinessNeeds from './business-needs';
import AboutTobias from './about-tobias';
import WhatsAppButton from './whatsapp-button';
import FinalContact from './final-contact';
import SiteFooter from './site-footer';
import useScrollReveals from './use-scroll-reveals';

export default function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  useScrollReveals(root);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (contactOpen && !dialogRef.current?.open) dialogRef.current?.showModal();
    else if (!contactOpen && dialogRef.current?.open) dialogRef.current.close();
  }, [contactOpen]);

  const contactLink = (className: string, label: string) => (
    <WhatsAppButton
      className={className}
      label={label}
      onUnavailable={(event) => {
        triggerRef.current = event.currentTarget;
        setContactOpen(true);
      }}
    />
  );

  return (
    <div ref={root} id="inicio">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <main id="contenido">
        <LandingHero contactLink={contactLink} />

        <div className="featured-entry">
          <ProjectCarousel />
        </div>

        <BusinessNeeds />

        <AboutTobias />

        <FinalContact contactLink={contactLink} />
      </main>

      <SiteFooter />
      <dialog
        ref={dialogRef}
        className="contact-dialog"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        onCancel={() => setContactOpen(false)}
        onClose={() => {
          setContactOpen(false);
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const box = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < box.left ||
              event.clientX > box.right ||
              event.clientY < box.top ||
              event.clientY > box.bottom
            )
              setContactOpen(false);
          }
        }}
      >
        <button
          autoFocus
          className="dialog-close"
          aria-label="Cerrar contacto"
          onClick={() => setContactOpen(false)}
        >
          <X />
        </button>
        <span className="meta">YATSAR / CONTACTO</span>
        <h2 id="dialog-title">
          Pronto podremos
          <br />
          <em>conversar.</em>
        </h2>
        <p id="dialog-description">
          Estamos preparando nuestro canal de contacto. Volvé pronto para
          contarnos tu idea.
        </p>
      </dialog>
    </div>
  );
}
