# Mimasa · Ifigen — Rediseño marketplace (versión 1 · demo)

Propuesta de rediseño de **mimasaifigen.com** centrada en conversión, modernidad y
en dejar **muy claras desde el inicio las dos marcas** (Mimasa = alimentos · Ifigen = suplementos).

Es una **maqueta de diseño autónoma** (HTML/CSS/JS puro). No toca la web real ni su backend.

---

## Cómo verla

Doble clic en `index.html`, o servir la carpeta:

```
python -m http.server 5179
```

y abrir `http://localhost:5179`.

## Páginas incluidas

| Archivo | Qué muestra |
|---|---|
| `index.html` | Home con **hero de las dos marcas**, destacados, los dos mundos, categorías, blog |
| `mimasa.html` | Landing marca **Mimasa** (alimentos) + categorías + copy SEO real |
| `ifigen.html` | Landing marca **Ifigen** (suplementos) + oligoelementos + copy SEO real |
| `categoria.html` | Listado con **filtros, orden y paginación** (ej. Omega-3-Oligen) |
| `producto.html` | Ficha de producto **orientada a venta** (ej. Oligen) |

Interacciones demo: mega-menú, vista rápida, mini-carrito lateral, menú móvil, acordeón.

---

## Decisiones de diseño

- **Color de marca** extraído del logo: granate `#A00030`.
- Cada mundo tiene un acento propio para diferenciarlos de un vistazo:
  **Mimasa** verde/tierra natural · **Ifigen** coral clínico.
- Tipografía: *Fraunces* (display, da seriedad y carácter) + *Plus Jakarta Sans* (texto).
- Más **volumen**: sombras por capas, profundidad, fotografía a sangre, microanimaciones — sin estridencias.

## SEO y textos

- **No se ha inventado copy.** Los bloques descriptivos usan los **textos reales aprobados**
  de la web (categorías Alimentos / Suplementos), y se conservan títulos, metadescripciones
  y palabras clave existentes (ver `src/partials/head.html` y `build.py`).
- Nombres, referencias, precios y descuentos son **datos reales** extraídos de la web actual
  (`assets/js/data.js`).

## Imágenes

- Las **107 fotos de producto** facilitadas (incluidos los `.tif`) se han convertido a JPG
  web optimizado en alta calidad (`assets/img/products/...`), respetando logos y branding.

---

## Notas importantes de esta versión

- **Idiomas (ES/EN/FR):** en la demo el selector funciona con un diccionario JS.
  En producción, PrestaShop gestiona los idiomas de forma nativa (los textos EN/FR
  de producto ya existen en su tienda y se conservan tal cual).
- **Intolerancias (sin gluten / sin lactosa):** los filtros y distintivos funcionan,
  pero la asignación de la demo es orientativa por naturaleza del producto.
  **⚠ Debe validarse con las fichas técnicas del cliente antes de publicar.**
- **Popup de bienvenida:** editable desde `admin.html` (demo con localStorage).
  En producción se gestionará como módulo del back-office de PrestaShop,
  integrado en el flujo que ya conocen.
- **A3 ERP + conector Presta5:** el rediseño es solo la capa visual (tema).
  El ERP sincroniza stock, disponibilidad y pedidos contra la base de datos de
  PrestaShop; nada de eso se toca. La estructura de datos queda intacta.
- **Ofertas:** el −10 % global permanente no se considera oferta; el apartado
  Ofertas solo muestra descuentos superiores al 10 % o packs.

## Integración sin romper nada (Nominalia / PrestaShop)

La web actual es **PrestaShop**. La recomendación para la fase de integración:

1. Esto es la **capa visual** (tema). El catálogo, pagos, cuentas y URLs siguen siendo de PrestaShop.
2. Todo el CSS/JS va **namespaced** (`.mi-…`, `#mi…`) para no colisionar con el tema actual.
3. Se integra como **tema hijo** sobre una **copia/staging**, mapeando estos componentes a las
   plantillas `.tpl` de PrestaShop (header, footer, home, category, product). **No se tocan**
   módulos de pago, cuenta ni la estructura de URLs (clave para no perder posicionamiento).
4. Migración por bloques y validación de SEO antes de publicar.

> Esta v1 es para validar dirección creativa y UX. La integración real se hará sobre la copia
> del código del cliente cuando lo facilite.

## Estructura

```
mimasa-ifigen-redesign/
├─ index · mimasa · ifigen · categoria · producto .html   (generados)
├─ assets/css/styles.css
├─ assets/js/{data.js, main.js}
├─ assets/img/{brand, products, manifest.json}
└─ src/        ← fuentes (partials + páginas) → `python build.py` regenera el HTML
```
