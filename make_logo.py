# -*- coding: utf-8 -*-
"""Logo con fondo transparente y bordes limpios (sin halo blanco),
   más icono cuadrado (favicon) con el emblema de la paloma."""
from PIL import Image
SRC = r"C:\Users\rqmul\Desktop\FOTOS PRODUCTES\LOGO png.png"
OUT = r"C:\Users\rqmul\Desktop\mimasa-ifigen-redesign\assets\img\brand"

im = Image.open(SRC).convert("RGBA")
bg = Image.new("RGBA", im.size, (255,255,255,255))
flat = Image.alpha_composite(bg, im).convert("RGB")
W,H = flat.size
px = flat.load()

def build(white=False):
    out = Image.new("RGBA",(W,H),(0,0,0,0))
    op = out.load()
    for y in range(H):
        for x in range(W):
            r,g,b = px[x,y]
            a = 255 - min(r,g,b)
            if a < 10:
                continue
            if white:
                op[x,y] = (255,255,255,a)
            else:
                # quita el velo blanco de los píxeles semitransparentes
                # (perfilado limpio sobre cualquier fondo)
                inv = 255 - a
                r2 = max(0, min(255, round((r - inv) * 255 / a)))
                g2 = max(0, min(255, round((g - inv) * 255 / a)))
                b2 = max(0, min(255, round((b - inv) * 255 / a)))
                op[x,y] = (r2,g2,b2,a)
    return out

full = build(False)
bbox = full.getbbox()
full.crop(bbox).save(OUT+r"\logo-color.png")
build(True).crop(bbox).save(OUT+r"\logo-white.png")
print("logos:", full.crop(bbox).size)

# ---- Emblema (círculo con la paloma) para el icono cuadrado ----
crop = full.crop(bbox)
w,h = crop.size
alpha = crop.split()[3]
# perfil de filas: detectar el hueco entre el círculo y el texto MiMASA
rows = [sum(alpha.crop((0,y,w,y+1)).point(lambda a:1 if a>30 else 0).getdata()) for y in range(h)]
start = next(i for i,v in enumerate(rows) if v>0)
gap = next(i for i in range(start+40,h) if rows[i]==0)
emblem = crop.crop((0,0,w,gap))
eb = emblem.getbbox()
emblem = emblem.crop(eb)
ew,eh = emblem.size

def icon(size, pad_ratio=0.12):
    canvas = Image.new("RGBA",(size,size),(0,0,0,0))
    inner = int(size*(1-2*pad_ratio))
    scale = min(inner/ew, inner/eh)
    em = emblem.resize((max(1,int(ew*scale)), max(1,int(eh*scale))), Image.LANCZOS)
    canvas.paste(em, ((size-em.width)//2,(size-em.height)//2), em)
    return canvas

icon(512).save(OUT+r"\favicon.png")
icon(180).save(OUT+r"\apple-touch-icon.png")
print("emblema:", emblem.size, "-> favicon 512 y apple-touch 180")
