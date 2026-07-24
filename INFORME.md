# Informe — Ronda de cambios sobre el redesign (`mimasa-ifigen-redesign`)

Este documento acompaña a los cambios aplicados sobre la demo estática (`index.html`, `mimasa.html`,
`ifigen.html`, `categoria.html`, `producto.html`). Recoge: (1) lo que se ha decidido y aplicado en código,
(2) lo que queda pendiente de tu decisión, y (3) lo que en la integración real con PrestaShop (Fase 1,
aún no iniciada) corresponderá a configuración de back office y no a código del tema.

---

## Bloque A — Móvil y slider

- **Banner/slider**: el texto promocional (título, badge de descuento) estaba grabado en los píxeles
  de las 2 imágenes del banner, no en HTML. Eso es lo que lo hacía ilegible al escalar en móvil — ningún
  CSS puede reflowear texto que ya es parte de la imagen. Se ha separado: ahora el móvil usa un recorte
  propio de cada foto (solo producto, sin texto) y el texto (título, badge, CTA) se renderiza como HTML
  real con `clamp()`, así que escala de forma legible en cualquier ancho.
  **Limitación**: los recortes móviles se generaron automáticamente aislando la zona de producto de las
  fotos existentes. Si el cliente quiere un encuadre distinto (u otras fotos), hacen falta imágenes nuevas
  — no es algo que se pueda arreglar más con CSS.
- **CTA del banner**: estaba en `position:absolute`. Ahora fluye en el documento; en móvil ocupa el ancho
  completo con `min-height:44px`; en desktop admite 3 posiciones (`slide--left/center/right`) configurables
  por banner. **En la demo esto se define en `assets/js/data.js` (`DEFAULT_SITE_BANNERS`)**; en el tema
  real de PrestaShop, la posición del CTA dependerá de qué módulo de slider se reutilice (candidato:
  `iqitpopup`, ya instalado) — confirmar si su configuración de back office permite elegir posición o si
  hay que fijarla en la plantilla.
- **Gradientes eliminados**: había 4 (barra de anuncio, franja de confianza, sección "promesa", barra de
  envío gratis del minicarrito). Todos sustituidos por color sólido, según la norma del cliente de "cero
  gradientes/difuminados".
- **Tipografía**: se ha sustituido la serif (Cormorant Garamond) por **League Spartan**, la misma fuente
  que usa el blog real (confirmado en `www/blog/.../elementor/css/post-7.css`, kit global de Elementor:
  `font-family:"League Spartan"` en `h1`–`h6`, cuerpo y enlaces). Se reutiliza el mismo archivo `.woff2`
  que sirve el blog (`assets/fonts/league-spartan/`), con `font-display:swap` y preload del peso above-the-fold.
- **Menú móvil y filtros**: se ha añadido `aria-expanded`/`aria-controls` a los botones de apertura
  (burger, filtros, acordeones) y un contador de filtros activos en el botón "Filtrar".
- **Scroll horizontal**: verificado sin overflow en 360/768px en home y listado (Playwright).

---

## Bloque B — Home

- **B1 — Bloque "Dos formas de cuidarte"**: rediseñado como pide el cliente (rótulo "Nuestras marcas:" +
  2 tarjetas, Mimasa blanca / Ifigen granate sólido). **No existían logos individuales de cada marca**
  (solo el logo combinado `logo-horizontal.svg`, como trazos vectoriales sin texto editable) — se ha usado
  el icono de marca (`favicon.png`, el símbolo sin texto) + el nombre como wordmark tipográfico. Si el
  cliente quiere el logo de marca real en vez de un wordmark, hace falta que el diseñador entregue
  `logo-mimasa.svg` / `logo-ifigen.svg` por separado.
- **B2 — Destacados**: título cambiado a "Top Promos", subtítulo eliminado (nodo completo, no solo el
  texto). **En el tema real de PrestaShop**, si este bloque es el módulo de productos destacados de home,
  el título/subtítulo puede venir de la configuración del módulo en back office — revisar antes de
  hardcodear en la plantilla.
- **B3 — Copys pendientes de tu elección** (no se ha tocado el código, solo lo aquí propuesto):
  - *"Compra por categoría"* → alternativas: **"Explora nuestras categorías"** / **"Encuentra tu categoría"** / **"Descubre por categoría"**
  - *"Categorías de alimentos"* → alternativas: **"Nuestras categorías"** / **"Lo que cultivamos"** / **"El catálogo Mimasa"**
  - Confirmado: ninguno de los dos es el `<h1>` de su página (el h1 de `mimasa.html` es "Alimentos saludables", sin tocar).
  - *"Mimasa Ifigen reúne dos marcas hermanas:..."* — eliminado, sustituido por el bloque B1 (tal y como pedía el punto 5).
  - Se mantienen sin tocar "Alimentos saludables" y "Explora", como se pidió.
- **B4 — Ticks eliminados**: la barra "Envío gratis +29 € · Elaboración artesanal · Envíos a todo el
  mundo" bajo el H1 se ha quitado por completo (nodo eliminado, no oculto). Nota: existe una franja de
  confianza **distinta** más abajo en la home (4 items: envío gratis, envíos internacionales, artesanal,
  contacto) que no es la que aparecía en tu captura — esa se ha dejado intacta; avísame si también hay que tocarla.
- **B5 — Descripciones de categoría**: eliminadas solo en el bloque "Alimentos saludables" (home y
  `mimasa.html`); el bloque de Ifigen las conserva. Implementado con un parámetro (`noDesc`) en la función
  de plantilla de tile, no duplicando el componente. Fitoterapia: descripción cambiada de
  "Plantas medicinales" a "Plantas"; ya mostraba su foto de categoría (reaprovechada del producto Elixir
  4 Estaciones — si el cliente quiere una foto propia de la categoría, es un encargo de imagen, no de código).

---

## Bloque C — Categoría y listado

- **C1 — Filtro lateral ausente en Mimasa/Ifigen**: confirmado el diagnóstico del brief — esas páginas
  (`mimasa.html`/`ifigen.html`) no tenían ningún `<aside>` de filtros, solo una rejilla de producto simple.
  Se ha añadido el mismo panel de filtros que ya funcionaba en `categoria.html` (categoría, precio, BIO/sin
  gluten/sin lactosa — sin el checkbox de marca, que no aplica en una página ya filtrada por marca), con el
  mismo comportamiento off-canvas en móvil. **En el tema real de PrestaShop**, esto se traduce en confirmar
  que esas categorías usan `layout-left-column` y que el módulo de facetas (`ps_facetedsearch` v4.0.1 activo,
  según la auditoría de Fase 0) tiene plantilla de filtros configurada para esas categorías concretas.
- **C2 — Cabecera de categoría**: rediseñada, quitando la caja rosa pesada. Se han implementado **las 2
  variantes pedidas**, ambas ya visibles en la demo para comparar: variante A (tipográfica, borde inferior
  fino) es la que se ve en el listado general y en Mimasa/Ifigen; variante B (imagen de categoría de fondo +
  overlay sólido, sin degradado) se activa automáticamente al filtrar por una categoría concreta en
  `categoria.html` (prueba con `categoria.html?cat=Algas%20marinas`). El `<h1>` mantiene el mismo texto en
  ambas variantes.
- **C3 — Filtro "En oferta (>10%)" eliminado**: quitado el checkbox del panel de filtros y la posibilidad de
  que aparezca como chip removible. Se ha dejado sin tocar la lógica interna que filtra por oferta, porque
  el enlace "Packs" del menú (`categoria.html?ofertas=1`) depende de ella para mostrar solo los descuentos
  >10% — si se borra del todo, "Packs" dejaría de funcionar como filtro y mostraría todo el catálogo.
  **En el tema real**, esto es casi seguro un filtro del módulo de facetas — confirmar en back office y
  quitarlo de la configuración de `ps_facetedsearch`, no del tema.
- **C4 — "Relevancia"**: decidido contigo — el desplegable no era funcional (era un botón decorativo sin
  opciones reales). Se ha construido un desplegable real (Novedades / Nombre A-Z / Nombre Z-A / Precio
  menor a mayor / Precio mayor a menor), sin "Relevancia", con ordenación real aplicada al listado.
  **Importante**: como confirmaste, el tema solo aporta el front-end — en el PrestaShop real, este control
  se conectará al mecanismo nativo de ordenación de PrestaShop (parámetro `orderby`/`orderway`), no a la
  lógica JS de la demo.
- **C5 — Desplegable "Utensilios"**: las 3 categorías (Colección Vajilla Japonesa Shibumi, Cuchillos
  Japoneses, Accesorios de cocina) **ya existen en la web real** — verificado en `www/1_es_0_sitemap.xml`:
  - Colección Vajilla Japonesa Shibumi → `https://mimasaifigen.com/es/99-coleccion-vajilla-japonesa-shibumi`
  - Cuchillos Japoneses → `https://mimasaifigen.com/es/103-cuchillos-japoneses`
  - Accesorios de cocina → `https://mimasaifigen.com/es/106-accesorios-de-cocina`

  No se han recreado ni movido — el menú "Utensilios" ahora despliega (hover en desktop, acordeón accesible
  en móvil) enlaces directos a esas URLs reales, igual que "Blog" ya enlazaba al blog real. **Nota de
  alcance de la demo**: al ser enlaces externos hardcodeados, solo están en español; en el tema real de
  PrestaShop esto no hace falta resolverlo a mano, porque las URLs de categoría las genera PrestaShop de
  forma nativa por idioma. No se encontró sitemap en inglés para confirmar si esas categorías tienen versión
  EN publicada — confirmarlo antes de traducir el menú.
  El **contenido** del desplegable (qué categorías aparecen) lo define hoy el módulo de menú real
  (`iqitmegamenu`, según Fase 0) — al construir el tema real, este submenú deberá configurarse ahí, no
  quedar fijo en la plantilla.

---

## Bloque D — Respuestas directas

**D1. URLs / SEO.** Esta ronda de cambios es sobre la demo estática (`mimasa-ifigen-redesign`), que
todavía no está integrada como tema de PrestaShop (Fase 1 no iniciada, ver histórico del proyecto). No
existen URLs reales de PrestaShop que puedan romperse en este momento — los enlaces "Blog" y los 3 de
Utensilios apuntan ya a las URLs reales y no se han inventado rutas nuevas. Cuando se aborde la Fase 1
(construcción del tema real), se generará `SEO_BASELINE.csv`/`SEO_DIFF.md` contra `www/` antes de tocar
ninguna plantilla `.tpl`, tal y como está acordado.

**D2. Módulos actuales.** El inventario de módulos activos y su recomendación (mantener / restilar /
sustituir / retirar) ya se generó en la auditoría de Fase 0 del proyecto de conversión a tema PrestaShop
(entregado y aprobado el 20/07). No se repite aquí porque no ha cambiado nada en `www/` desde entonces.

**D3. Packs y el buscador por Miso.** El buscador por facetas filtra por los atributos/características del
propio producto, no por lo que contiene un pack — si alguien filtra por "Miso", un pack que incluya miso
pero no esté él mismo etiquetado como "Miso" no aparecerá. Dos vías, ninguna implementada aún:
  - **(a) Característica "Contiene"**: crear una característica de producto tipo "Contiene: Miso, Umeboshi…"
    y etiquetar cada pack con los ingredientes que lleva. Esfuerzo bajo (configuración + etiquetado manual
    por pack), no toca el enlazado interno ni el SEO.
  - **(b) Asignar cada pack también a las categorías de sus componentes**: un pack con miso también viviría
    en la categoría "Misos". Esfuerzo bajo en configuración, pero **cambia el enlazado interno** (nuevas
    entradas en esas categorías) y debería evaluarse su impacto en SEO antes de aplicarlo — no es solo una
    decisión de UX.
  Recomendación: empezar por (a), que no tiene efectos secundarios en SEO.

---

## Pendiente de aclaración (no implementado)

- **Punto 11 ("Eliminar:")** — la captura correspondiente sigue sin estar disponible. Necesito verla para
  saber qué hay que quitar.
- **B1 — logos de marca**: usado wordmark tipográfico a falta de logos individuales de Mimasa/Ifigen: confirmar si sirve o si hace falta arte específico.
- **B4 — franja de confianza inferior** (4 items, distinta de los 3 ticks ya eliminados): confirmar si también hay que tocarla.
- **C5 — versión en inglés** de las 3 categorías de Utensilios: no se ha podido confirmar si existen URLs EN publicadas.
