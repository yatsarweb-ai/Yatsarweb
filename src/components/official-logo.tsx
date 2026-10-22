import Image from 'next/image';
import styles from './official-logo.module.css';

export default function OfficialLogo({ preload = false }: { preload?: boolean }) {
  return (
    <span className={styles.logo}>
      <Image
        src="/Contenido Grafico/logo.png"
        alt="YATSAR"
        width={1254}
        height={1254}
        preload={preload}
        unoptimized
        draggable={false}
        className={styles.image}
      />
    </span>
  );
}
