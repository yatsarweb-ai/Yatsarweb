# Recursos del portfolio

## Portada suministrada por el usuario

Las referencias principales actuales son `EJEMPLO PC.jpg` y `EJEMPLO CELULAR.jpg`, usadas solo para estudiar la composición centrada. Sus pantallas de ejemplo no sustituyen las pantallas originales de los mockups.

- `public/Contenido Grafico/Portada EJEMPLO.png`: referencia de composición; no se renderiza en la web.
- `Fondo portada.PNG`: fondo real usado en la portada.
- `Mockup Notebook.PNG` y `Mockup Celular.PNG`: archivos originales independientes, con sus pantallas intactas. La notebook muestra Natura Ludmi y el celular el catálogo que viene incorporado en el asset; no se añadieron esos trabajos al portfolio como clientes.

Aunque terminan en `.PNG`, el fondo y ambos mockups contienen datos **JPEG**. Los mockups son opacos, con fondo blanco. Se conservan los archivos sin modificar y se aplica un `clip-path` a su silueta en HTML/CSS. Los contornos, coordenadas y dimensiones están en `src/components/device-clips.ts`. No se utilizan blend modes ni se generan imágenes alternativas.

## Tipografía

Manrope Variable e Instrument Serif Italic, del repositorio oficial de Google Fonts. Alojadas en `public/fonts` mediante `next/font/local`, sin peticiones a Google durante la navegación. Licencias SIL Open Font License incluidas.

- https://github.com/google/fonts/tree/main/ofl/manrope
- https://github.com/google/fonts/tree/main/ofl/instrumentserif

## Capturas de Natura Ludmi

`public/projects/natura-desktop.webp` y `natura-mobile.webp` provienen de `test-results/desktop.png` y `test-results/mobile.png` del proyecto local Natura Ludmi. Se recortaron y convirtieron a WebP sin recrear ni alterar el contenido del sitio. Corresponden a la **maqueta local**; no se verificó que la URL pública muestre esa misma versión. La interfaz incluye esa aclaración.

Natura Ludmi mantiene su propio `ASSET_SOURCES.md` con las fuentes de su logo, fotografías y portada. Estas capturas documentan la demo, sin presentar a la marca como cliente publicado.

No se copiaron recursos ni código de South Projects. Su HTML y estilos públicos se consultaron para estudiar jerarquía, anchos de lectura, espaciado, énfasis y comportamiento responsive.
