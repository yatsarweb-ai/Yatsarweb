# YATSAR

Portfolio con Next.js App Router, TypeScript, Tailwind CSS 4 y GSAP / ScrollTrigger.

## Ejecutar

Node.js 20.9 o superior.

```bash
npm install
npm run dev
```

Abrir http://localhost:3000. En PowerShell con scripts restringidos, usar `npm.cmd`.

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Personalización

- Copiar `.env.example` a `.env.local`: dominio final con HTTPS, email y redes. Reiniciar el servidor o recompilar después de cambiar variables.
- `whatsappContact` en `src/lib/content.ts` centraliza el número y el mensaje de WhatsApp. Todos los CTA usan un enlace directo `wa.me`, sin modal ni dependencia de variables de entorno. Las redes vacías no se muestran.
- `src/lib/content.ts`: mantiene el array de proyectos y servicios. Cada proyecto admite `image`, `mobileImage` opcional e `imageAlt`. Para capturas desktop con otra proporción, ajustar dimensiones de `Image` en `ProjectFeature`. Usar archivos propios en `public/projects`.
- Los filtros Todos / Demo / Conceptos conservan su función. Los proyectos con URL ocupan la vista principal; los placeholders se mantienen en un índice desplegable secundario y se muestran abiertos con el filtro Conceptos.
- Natura Ludmi sigue siendo una **demo / maqueta**. Las capturas documentan la versión local, no un cliente publicado. No hay testimonios ni métricas inventadas.
- `src/components/portfolio.tsx`: estructura y comportamiento. `src/app/globals.css`: composición, tokens y breakpoints. Tailwind sigue disponible mediante su importación global.
- `src/app/layout.tsx`: SEO, metadatos, viewport y fuentes locales. `src/app/opengraph-image.tsx`: imagen social. Ver procedencia y licencias en `ASSET_SOURCES.md`.

## Dirección visual

La portada toma como referencias principales `public/Contenido Grafico/EJEMPLO PC.jpg` y `EJEMPLO CELULAR.jpg`. El texto está centrado, en sentence case, con énfasis en ALTURA. Se conservan Manrope, el fondo azul y los mockups originales. No se utilizan las referencias como imágenes planas ni se muestran flechas o tarjetas decorativas. El resto del sitio conserva su diseño.

`src/components/landing-hero.tsx` contiene navbar, menú, diálogo Sobre mí y secuencia de dispositivos. `landing-hero.module.css` aísla el diseño. `device-clips.ts` guarda los contornos para recortar el fondo blanco de los originales mediante `clip-path`. No hay blend modes, imágenes generadas ni pantallas sustituidas. Al reemplazar estos mockups, actualizar también las dimensiones y el contorno, o suministrar archivos transparentes y eliminar el recorte.

## Movimiento y accesibilidad

Una timeline con scrub desvanece el contenido y escala un único contenedor que agrupa los dispositivos. No hay traslación lateral ni deformación. El pin dura únicamente el crecimiento, con distancias adaptadas a la pantalla y escala limitada al espacio disponible. Al terminar, el pin se libera y proyectos entra por scroll natural mientras los dispositivos se desvanecen. Los tiempos se recalculan al redimensionar. Se respetan `prefers-reduced-motion`, limpieza de ScrollTrigger y contenido sin JavaScript.

El hero tiene dos CTA: WhatsApp, con icono verde y brillo sutil, y Ver proyectos. El botón de WhatsApp comparte componente y destino con el cierre del sitio.

Con `prefers-reduced-motion` no hay pin ni secuencia compleja; la portada se mantiene estática y el scroll es normal. El resto de las animaciones existentes (captura y líneas del proceso) se conserva. Sin JavaScript, la composición y los enlaces HTML siguen presentes.

Hover limitado a punteros precisos, foco visible, navegación por teclado, menú con Escape y cierre al salir o elegir destino, diálogo nativo con retorno del foco, textos alternativos y enlace para saltar al contenido.

## Validación del rediseño

Se ejecutaron build de producción, TypeScript y ESLint. Se revisaron capturas con Chromium headless a 375, 390, 430, 1448 y 1920 px. Se comprobaron crecimiento proporcional, centro estable, ausencia de recortes durante el pin, entrada inmediata de proyectos, desvanecimiento sincronizado y reversa. La prueba en un teléfono físico queda pendiente.

Para publicar, configurar dominio y contacto y volver a ejecutar los checks. Compatible con Vercel o un servidor Node. No se publicó automáticamente.

## Cierre con video

`src/components/final-contact.tsx` usa el archivo real `public/Contenido Grafico/video fondo.mp4`. El video se carga al acercarse a la secci?n, se pausa fuera de ella o al ocultar la pesta?a, y no se carga con movimiento reducido. Si falla la reproducci?n, queda un fondo oscuro detr?s del texto.

`whatsapp-button.tsx` comparte el icono y el borde luminoso CSS entre portada y cierre; `site-footer.tsx` muestra ?nicamente las redes configuradas. Reiniciar o recompilar al cambiar las variables de `.env.local`.
