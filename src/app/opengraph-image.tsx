import { ImageResponse } from 'next/og';
export const alt = 'YATSAR — Tu negocio merece una web a su altura.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() { return new ImageResponse(<div style={{ background: '#080B12', color: '#f4f6ff', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 90 }}><div style={{ color: '#4d85ff', fontSize: 30, marginBottom: 45 }}>↗ YATSAR / ESTUDIO DIGITAL</div><div style={{ fontSize: 78, letterSpacing: -4 }}>Tu negocio merece una web a su altura.</div></div>, size); }
