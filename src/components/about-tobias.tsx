'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import styles from './about-tobias.module.css';

const notes = [
  {
    id: 'creating',
    emoji: '💡',
    title: 'Siempre creando',
    text: 'Me gusta imaginar ideas, probar cosas nuevas y encontrar la mejor forma de llevarlas a la realidad.',
  },
  {
    id: 'details',
    emoji: '✨',
    title: 'Los detalles importan',
    text: 'Soy de los que ajustan, corrigen y vuelven a mirar hasta sentir que todo realmente quedó bien.',
  },
  {
    id: 'contact',
    emoji: '🤝',
    title: 'Contacto directo',
    text: 'Detrás de YATSAR estoy yo. Si trabajamos juntos, hablás directamente conmigo durante todo el proceso.',
  },
];

function highlightBrand(text: string) {
  return text.split('YATSAR').map((part, index) => (
    <Fragment key={index}>
      {index > 0 && <strong className={styles.brand}>YATSAR</strong>}
      {part}
    </Fragment>
  ));
}

export default function AboutTobias() {
  return (
    <section
      className={styles.section}
      id="sobre-mi"
      aria-labelledby="tobias-title"
    >
      <div className={styles.inner}>
        <h2 className={styles.heading} id="tobias-title" data-scroll-reveal>
          Hola, soy <em>Tobías</em>
        </h2>
        <div className={styles.introduction}>
          <p data-scroll-reveal="left" data-reveal-delay="0.06">
            Estoy detrás de <strong className={styles.brand}>YATSAR</strong>, un
            proyecto que nació de algo que me acompaña desde hace mucho: mi
            interés por crear webs.
          </p>
          <p data-scroll-reveal="left" data-reveal-delay="0.12">
            Desde chico me daba curiosidad este mundo. Con el tiempo fui
            aprendiendo de a poco, explorando herramientas, probando ideas y
            entendiendo cómo llevar una web desde una idea hasta algo real.
          </p>
        </div>
        <figure
          className={styles.portrait}
          data-scroll-reveal="right"
          data-reveal-delay="0.12"
        >
          <Image
            src="/Contenido Grafico/Tobias.PNG"
            alt="Tobías, creador de YATSAR."
            width={1448}
            height={1086}
            unoptimized
          />
        </figure>
        <div className={styles.cards}>
          {notes.map((note, index) => (
            <article
              key={note.id}
              className={styles.card}
              data-scroll-reveal
              data-reveal-delay={0.12 + index * 0.06}
            >
              <span className={styles.emoji} aria-hidden="true">
                {note.emoji}
              </span>
              <div>
                <h3>{note.title}</h3>
                <p>{highlightBrand(note.text)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
