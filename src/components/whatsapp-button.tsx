import type { MouseEventHandler } from 'react';
import { whatsappUrl } from '@/lib/content';
import styles from './whatsapp-button.module.css';

type Props = {
  className?: string;
  label?: string;
  onUnavailable?: MouseEventHandler<HTMLButtonElement>;
};

export default function WhatsAppButton({
  className = '',
  label = 'Hablemos por WhatsApp',
  onUnavailable,
}: Props) {
  const href = whatsappUrl();
  const content = (
    <>
      <span className={styles.rim} aria-hidden="true">
        <span />
      </span>
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#25D366"
          d="M12 1a11 11 0 0 0-9.5 16.5L1 23l5.7-1.5A11 11 0 1 0 12 1Z"
        />
        <path
          fill="white"
          d="M8 6.4c-.5-.2-1 .3-1.3.8-.7 1.3-.1 3.6 2.1 5.9 2.2 2.3 5 3.5 6.5 2.8.6-.3 1.3-1.3 1.1-1.8-.1-.3-2.1-1.3-2.4-1.2-.3.1-.7 1-1 1-1.1-.2-3.2-2.1-3.6-3.2-.1-.3.7-.9.8-1.2.1-.4-.8-2.8-1.2-3Z"
        />
      </svg>
      {label}
    </>
  );
  const classes = `${styles.button} ${className}`;
  return href ? (
    <a
      className={classes}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <button className={classes} type="button" onClick={onUnavailable}>
      {content}
    </button>
  );
}
