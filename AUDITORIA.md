# Auditoría BT Remodeling: tickets

Fecha: 2026-11-20
Alcance: velocidad de carga de imágenes, responsividad, SEO y sobre-ingeniería.
Peso actual de las imágenes: **~107 MB**. Objetivo: **< 3 MB**.

| # | Ticket | Área | Prioridad |
|---|--------|------|-----------|
| BT-01 | Fotos de proyectos en resolución original | Imágenes | Alta |
| BT-02 | Fotos de servicios y portafolio guardadas como PNG | Imágenes | Alta |
| BT-03 | Menú inaccesible en tablet y móvil | Responsividad | Alta |
| BT-04 | Avatares de testimonios sobredimensionados | Imágenes | Media |
| BT-05 | Imágenes sin `width` / `height` (CLS) | Imágenes | Media |
| BT-06 | Logo sobredimensionado | Imágenes | Baja |
| BT-07 | Imagen del hero (LCP) sin preload | Imágenes | Media |
| BT-08 | CSS cargado con `@import` en cadena | Rendimiento | Media |
| BT-09 | Márgenes sueltos que descentran las grillas en tablet | Responsividad | Media |
| BT-10 | HTML con etiquetas de cierre sobrantes | Responsividad | Media |
| BT-11 | `<title>` poco descriptivo | SEO | Alta |
| BT-12 | Faltan canonical, Open Graph y favicon | SEO | Media |
| BT-13 | Falta schema JSON-LD de LocalBusiness | SEO | Alta |
| BT-14 | Enlaces de teléfono y correo apuntan a `#` | SEO / Conversión | Alta |
| BT-15 | Textos alternativos genéricos | SEO / Accesibilidad | Media |
| BT-16 | Textos de relleno visibles | Contenido | Alta |
| BT-17 | Faltan `robots.txt` y `sitemap.xml` | SEO | Baja |
| BT-18 | El formulario de contacto no envía nada | Conversión | Alta |
| BT-19 | Imágenes sin uso en el repo | Limpieza | Baja |
| BT-20 | Regla `.grid--services` duplicada | Limpieza | Baja |
| BT-21 | `<img src="">` vacío en el carrusel | Limpieza | Baja |
| BT-22 | Selectores `nth-child` repetidos | Limpieza | Baja |
| BT-23 | `!important` duplicados en los media queries | Limpieza | Baja |
| BT-24 | Modal hecho a mano en lugar de `<dialog>` | Limpieza | Baja |

---

## Imágenes / velocidad de carga

### BT-01: Fotos de proyectos en resolución original
- **Prioridad:** Alta
- **Archivos:** `assets/recent_projects/**`
- **Problema:** 32 fotos están en la resolución original de la cámara. Por ejemplo, `meadow_heath_lane/img1.jpg` mide 5422×3615 y pesa 6 MB.
- **Solución:** redimensionar a 1600px de ancho y convertir a WebP con calidad ~80. Actualizar las rutas en `scripts/main.js` y en `index.html`.
  ```bash
  for f in assets/recent_projects/*/*.jpg; do cwebp -q 80 -resize 1600 0 "$f" -o "${f%.*}.webp"; done
  ```
- **Criterio de aceptación:** cada foto pesa menos de 300 KB.

### BT-02: Fotos de servicios y portafolio guardadas como PNG
- **Prioridad:** Alta
- **Archivos:** `assets/services/*.png`, `assets/portfolio/*.png`
- **Problema:** son fotos guardadas como PNG. Por ejemplo, `img1_services.png` mide 1920×2880 y pesa 7.6 MB.
- **Solución:** convertir a WebP a ~1000px de ancho y actualizar las rutas en `index.html`. Aprovechar para corregir el typo `img4_potfolio.png`.
  ```bash
  for f in assets/services/*.png assets/portfolio/*.png; do cwebp -q 80 -resize 1000 0 "$f" -o "${f%.*}.webp"; done
  ```
- **Criterio de aceptación:** cada imagen pesa menos de 200 KB.

### BT-04: Avatares de testimonios sobredimensionados
- **Prioridad:** Media
- **Archivos:** `assets/testimonials/*`
- **Problema:** pesan hasta 850 KB aunque se muestran pequeños.
- **Solución:** exportar a 200×200 en WebP.
- **Criterio de aceptación:** cada avatar pesa menos de 30 KB.

### BT-05: Imágenes sin `width` / `height` (CLS)
- **Prioridad:** Media
- **Archivos:** `index.html`
- **Problema:** solo el logo declara sus dimensiones. El resto del contenido salta mientras cargan las imágenes (Cumulative Layout Shift).
- **Solución:** agregar `width` y `height` reales a cada `<img>`, o fijar un `aspect-ratio` en el CSS de cada contenedor.
- **Criterio de aceptación:** CLS < 0.1 en Lighthouse.

### BT-06: Logo sobredimensionado
- **Prioridad:** Baja
- **Archivos:** `assets/logo.png`
- **Problema:** mide 823×303 y se muestra a 60px.
- **Solución:** exportarlo a ~180px de ancho, o usar SVG si existe.

### BT-07: Imagen del hero (LCP) sin preload
- **Prioridad:** Media
- **Archivos:** `index.html`, `styles/03-components.css:158`
- **Problema:** el fondo del hero está definido dentro del CSS, así que el navegador lo descubre tarde.
- **Solución:** agregar esto en el `<head>`:
  ```html
  <link rel="preload" as="image" href="assets/slider/img5_slider.jpg" fetchpriority="high" />
  ```
- **Criterio de aceptación:** LCP < 2.5 s en Lighthouse móvil.

### BT-08: CSS cargado con `@import` en cadena
- **Prioridad:** Media
- **Archivos:** `styles/main.css`
- **Problema:** los `@import` hacen que los 5 archivos CSS se descarguen en serie, uno tras otro.
- **Solución:** reemplazar `main.css` por 5 etiquetas `<link rel="stylesheet">` en `index.html`, o concatenarlos en un solo archivo.

---

## Responsividad

### BT-03: Menú inaccesible en tablet y móvil
- **Prioridad:** Alta
- **Archivos:** `styles/04-responsive.css:8`, `styles/03-components.css:84`, `scripts/main.js`
- **Problema:** `.nav-toggle` tiene `display: none` siempre, incluso en ≤900px, donde `.nav` también se oculta. Además, ningún JS agrega la clase `.nav--open`. Resultado: en pantallas de 900px o menos no hay navegación.
- **Solución:**
  ```css
  /* 04-responsive.css, dentro de @media (max-width: 900px) */
  .nav-toggle { display: block; }
  ```
  ```js
  // main.js
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  toggle.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', nav.classList.toggle('nav--open'));
  });
  nav.addEventListener('click', e => e.target.closest('a') && nav.classList.remove('nav--open'));
  ```
- **Criterio de aceptación:** a 375px y a 768px el menú abre, cierra y navega.

### BT-09: Márgenes sueltos que descentran las grillas en tablet
- **Prioridad:** Media
- **Archivos:** `styles/04-responsive.css`
- **Problema:** `margin-left: 30px` en `.grid--services` y `margin-right: 60px` en `.grid--portfolio` sacan las grillas del centro.
- **Solución:** borrar ambos márgenes.
- **Criterio de aceptación:** las grillas quedan centradas entre 600px y 900px.

### BT-10: HTML con etiquetas de cierre sobrantes
- **Prioridad:** Media
- **Archivos:** `index.html` (justo después de `#projectModal`)
- **Problema:** hay un `</div></section>` extra que vuelve a cerrar la sección de proyectos.
- **Solución:** borrar esas dos etiquetas.
- **Criterio de aceptación:** el [validador W3C](https://validator.w3.org/) no reporta errores.

---

## SEO

### BT-11: `<title>` poco descriptivo
- **Prioridad:** Alta
- **Archivos:** `index.html`
- **Problema:** el título es solo "BT Remodeling".
- **Solución:**
  ```html
  <title>BT Remodeling | General Contractor in Mansfield & DFW, Texas</title>
  ```
  Ajustar la ciudad o región según el mercado real.

### BT-12: Faltan canonical, Open Graph y favicon
- **Prioridad:** Media
- **Archivos:** `index.html`
- **Solución:**
  ```html
  <link rel="canonical" href="https://bt-remodeling.com/" />
  <link rel="icon" href="assets/logo.png" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="BT Remodeling | General Contractor in Texas" />
  <meta property="og:description" content="Residential and commercial renovations: kitchens, baths, framing, drywall." />
  <meta property="og:image" content="https://bt-remodeling.com/assets/og.jpg" />
  <meta property="og:url" content="https://bt-remodeling.com/" />
  ```
  `og.jpg` debe medir 1200×630. Confirmar el dominio real antes de publicar.

### BT-13: Falta schema JSON-LD de LocalBusiness
- **Prioridad:** Alta
- **Archivos:** `index.html`
- **Problema:** no hay datos estructurados. Para un negocio local son clave en Google Maps y en los resultados enriquecidos.
- **Solución:**
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": "BT Remodeling",
    "url": "https://bt-remodeling.com/",
    "logo": "https://bt-remodeling.com/assets/logo.png",
    "telephone": "+1-586-329-5217",
    "email": "brandon@bt-remodeling.com",
    "foundingDate": "2016",
    "areaServed": "Texas",
    "openingHours": "Mo-Sa"
  }
  </script>
  ```
- **Criterio de aceptación:** pasa la [prueba de resultados enriquecidos](https://search.google.com/test/rich-results).

### BT-14: Enlaces de teléfono y correo apuntan a `#`
- **Prioridad:** Alta
- **Archivos:** `index.html` (sección de contacto, footer y botón de teléfono del header)
- **Solución:** usar `href="tel:+15863295217"` y `href="mailto:brandon@bt-remodeling.com"`. El botón de teléfono del header también debe llevar `tel:`.

### BT-15: Textos alternativos genéricos
- **Prioridad:** Media
- **Archivos:** `index.html`, `scripts/main.js`
- **Problema:** se repiten textos como "Client portrait", y otros son vagos ("Kitchen project", "Exterior renovation" duplicado).
- **Solución:** describir cada foto e incluir la ubicación cuando aplique. Por ejemplo: "Remodelación de cocina con gabinetes blancos en Mansfield, TX". En el carrusel, usar un alt distinto por imagen.

### BT-16: Textos de relleno visibles
- **Prioridad:** Alta
- **Archivos:** `index.html` (`.info-card__text`)
- **Problema:** la página muestra "Add your business number here." y "Add your business email here.".
- **Solución:** reemplazarlos por texto real o eliminarlos.

### BT-17: Faltan `robots.txt` y `sitemap.xml`
- **Prioridad:** Baja
- **Solución:**
  ```
  # robots.txt
  User-agent: *
  Sitemap: https://bt-remodeling.com/sitemap.xml
  ```
  ```xml
  <!-- sitemap.xml -->
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://bt-remodeling.com/</loc></url>
  </urlset>
  ```

### BT-18: El formulario de contacto no envía nada
- **Prioridad:** Alta
- **Archivos:** `index.html`
- **Problema:** el formulario usa `action="#"`, así que se pierden los leads.
- **Solución:** conectarlo a Formspree o Netlify Forms (no hace falta backend), o como mínimo usar `action="mailto:..."`.

---

## Limpieza (sobre-ingeniería)

### BT-19: Imágenes sin uso en el repo
- **Prioridad:** Baja
- **Archivos:** `assets/slider/img1–4_slider.jpg`, `assets/testimonials/img4_testimonials.png`
- **Solución:** borrarlas (ahorra ~1.4 MB).

### BT-20: Regla `.grid--services` duplicada
- **Prioridad:** Baja
- **Archivos:** `styles/03-components.css:307` y `:351`
- **Solución:** borrar la primera declaración (línea 307); la segunda la sobrescribe de todos modos.

### BT-21: `<img src="">` vacío en el carrusel
- **Prioridad:** Baja
- **Archivos:** `index.html` (`#carouselImage`)
- **Problema:** el JS reemplaza ese `<img>` de todos modos, y `src=""` genera una petición vacía.
- **Solución:** dejar el `div` vacío.

### BT-22: Selectores `nth-child` repetidos
- **Prioridad:** Baja
- **Archivos:** `styles/03-components.css:374-392`
- **Solución:** unir `nth-child(2)` a `nth-child(5)`, que comparten los mismos valores:
  ```css
  .service-image:nth-child(n+2):nth-child(-n+5) { grid-column: span 2; grid-row: span 1; }
  ```

### BT-23: `!important` duplicados en los media queries
- **Prioridad:** Baja
- **Archivos:** `styles/04-responsive.css`
- **Solución:** borrar el bloque `.service-image` del media query de 600px; el de 900px ya lo cubre.

### BT-24: Modal hecho a mano en lugar de `<dialog>`
- **Prioridad:** Baja
- **Archivos:** `index.html`, `scripts/main.js`
- **Problema:** el modal reimplementa a mano el overlay, el cierre con Escape y el bloqueo del scroll.
- **Solución:** usar `<dialog>` con `showModal()`, que trae `::backdrop`, cierre con Escape y foco atrapado. Elimina ~15 líneas de JS y el div del overlay.

---

