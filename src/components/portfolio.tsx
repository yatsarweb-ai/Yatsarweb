'use client';

import { useRef } from 'react';
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
  const contactLink = (className: string, label: string) => (
    <WhatsAppButton className={className} label={label} />
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
    </div>
  );
}
