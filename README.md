# Mimasa · Ifigen — Rediseño (demo v1)

Propuesta de rediseño de [mimasaifigen.com](https://mimasaifigen.com) centrada en
**conversión** y en diferenciar con claridad las dos marcas: **Mimasa** (alimentos
saludables) e **Ifigen** (suplementos).

Sitio **100% estático** (HTML/CSS/JS) → desplegable directamente en Vercel.

- 📄 Documentación y plan de integración con PrestaShop: ver **[LÉEME.md](LÉEME.md)**
- 🛒 Carrito funcional de demostración (el pago real se hará en la tienda PrestaShop)

## Páginas
`index.html` · `mimasa.html` · `ifigen.html` · `categoria.html` · `producto.html`

## Desarrollo
Las páginas se generan desde `src/` (partials + páginas) con:

```bash
python build.py
```

Servir en local:

```bash
python -m http.server 5179
```

## Despliegue (Vercel)
No necesita build. Vercel sirve los archivos estáticos de la raíz tal cual.
