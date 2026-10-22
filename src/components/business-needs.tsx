import styles from './business-needs.module.css';

const needs = [
  {
    emoji: '🌐',
    before: 'Tu negocio necesita una ',
    highlight: 'presencia online',
    after: ' que se vea profesional y genere confianza.',
  },
  {
    emoji: '🚀',
    before: 'No alcanza con existir en internet, también hace falta ',
    highlight: 'destacar',
    after: '.',
  },
  {
    emoji: '✨',
    before: 'Una buena web puede ayudarte a mostrar mejor lo que hacés y ',
    highlight: 'transmitir más valor',
    after: '.',
  },
  {
    emoji: '💡',
    before: 'No todos los negocios necesitan lo mismo, por eso ',
    highlight: 'cada solución',
    after: ' tiene que ser distinta.',
  },
];

export default function BusinessNeeds() {
  return (
    <section
      className={styles.section}
      id="servicios"
      aria-labelledby="services-title"
    >
      <div className={styles.inner}>
        <h2 id="services-title" className={styles.heading} data-scroll-reveal>
          <span>Si llegaste hasta acá,</span>
          <span>
            probablemente tu negocio <em>necesite esto.</em>
          </span>
        </h2>
        <ul className={styles.cards}>
          {needs.map((need, index) => (
            <li
              className={styles.card}
              key={need.highlight}
              data-scroll-reveal
              data-reveal-delay={0.06 + index * 0.06}
            >
              <div className={styles.cardContent}>
                <span className={styles.emoji} aria-hidden="true">
                  {need.emoji}
                </span>
                <p>
                  {need.before}
                  <em>{need.highlight}</em>
                  {need.after}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div
          className={styles.closing}
          data-scroll-reveal
          data-reveal-delay="0.08"
        >
          <h3 className={styles.statement}>
            <span>Cada negocio tiene algo único.</span>
            <span>
              La diferencia está en <em>cómo lo mostrás.</em>
            </span>
          </h3>
          <p className={styles.description}>
            Una web bien pensada no solo se ve mejor. También ayuda a que tu
            marca se entienda, se recuerde y se valore más.
          </p>
        </div>
      </div>
    </section>
  );
}
