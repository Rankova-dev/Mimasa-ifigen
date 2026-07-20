# -*- coding: utf-8 -*-
"""Ensambla páginas estáticas autónomas desde src/partials + src/pages."""
import os
ROOT = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(ROOT, "src", "partials")
PG = os.path.join(ROOT, "src", "pages")

def read(p):
    with open(p, encoding="utf-8") as f: return f.read()

head = read(os.path.join(P, "head.html"))
header = read(os.path.join(P, "header.html"))
footer = read(os.path.join(P, "footer.html"))
overlays = read(os.path.join(P, "overlays.html"))

META = {
 "index.html": ("Alimentos saludables y complementos alimenticios | Mimasa Ifigen",
   "Mimasa Ifigen ofrece productos ecológicos siguiendo siempre procesos de elaboración tradicionales. Te ayudamos a tener una vida saludable."),
 "mimasa.html": ("Alimentos saludables | Alimentos Mimasa Ifigen",
   "Los alimentos saludables de Mimasa Ifigen son productos ecológicos que te ayudarán a tener una vida saludable. ¡Descúbrelos todos!"),
 "ifigen.html": ("Suplementos naturales | Mimasa Ifigen",
   "Los suplementos naturales de Mimasa Ifigen son el aliado perfecto para tener un mayor bienestar físico. ¡Conócelos todos!"),
 "categoria.html": ("Omega-3-Oligen | Suplementos Ifigen | Mimasa Ifigen",
   "Descubre la gama Omega-3-Oligen de Ifigen: complementos alimenticios para combinar con una alimentación saludable."),
 "producto.html": ("Oligen 60 cápsulas | Omega-3-Oligen | Mimasa Ifigen",
   "Oligen 60 cápsulas de Ifigen, complemento alimenticio de Omega-3 con DHA 80% TG enzimático."),
 "sobre-nosotros.html": ("Sobre nosotros | Mimasa Ifigen",
   "Conoce Mimasa Ifigen: una empresa familiar con una larga tradición en alimentos ecológicos y complementos alimenticios de vanguardia."),
}

for fn,(title,desc) in META.items():
    body = read(os.path.join(PG, fn))
    h = head.replace("{{TITLE}}", title).replace("{{DESC}}", desc)
    out = (body.replace("{{HEAD}}", h)
               .replace("{{HEADER}}", header)
               .replace("{{FOOTER}}", footer)
               .replace("{{OVERLAYS}}", overlays))
    with open(os.path.join(ROOT, fn), "w", encoding="utf-8") as f:
        f.write(out)
    print("built", fn)
print("done")
