# -*- coding: utf-8 -*-
import os, re, unicodedata, json
from PIL import Image, ImageOps

SRC = r"C:\Users\rqmul\Desktop\FOTOS PRODUCTES"
DST = r"C:\Users\rqmul\Desktop\mimasa-ifigen-redesign\assets\img\products"
BRAND_DST = r"C:\Users\rqmul\Desktop\mimasa-ifigen-redesign\assets\img\brand"
os.makedirs(DST, exist_ok=True)
os.makedirs(BRAND_DST, exist_ok=True)

def slug(s):
    s = os.path.splitext(s)[0]
    s = unicodedata.normalize('NFKD', s).encode('ascii','ignore').decode('ascii')
    s = s.lower()
    s = re.sub(r'[^a-z0-9]+','-', s).strip('-')
    return s

MAXED = 1200
manifest = []

def process(path, out_dir, name=None):
    try:
        im = Image.open(path)
    except Exception as e:
        print("SKIP", path, e); return None
    im = ImageOps.exif_transpose(im)
    if im.mode in ("RGBA","LA","P"):
        bg = Image.new("RGB", im.size, (255,255,255))
        im2 = im.convert("RGBA")
        bg.paste(im2, mask=im2.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")
    im.thumbnail((MAXED, MAXED), Image.LANCZOS)
    fn = (name or slug(os.path.basename(path))) + ".jpg"
    outp = os.path.join(out_dir, fn)
    im.save(outp, "JPEG", quality=86, optimize=True, progressive=True)
    return fn

# Brand assets
process(os.path.join(SRC,"LOGO png.png"), BRAND_DST, "logo-mimasa-ifigen")

count = 0
for root, dirs, files in os.walk(SRC):
    for f in files:
        ext = f.lower().rsplit('.',1)[-1]
        if ext not in ("tif","tiff","jpg","jpeg","png"): continue
        if f == "LOGO png.png": continue
        full = os.path.join(root, f)
        rel = os.path.relpath(root, SRC)
        parts = rel.split(os.sep)
        brand = parts[0].lower() if parts and parts[0] in ("MIMASA","IFIGEN") else "misc"
        cat = slug(parts[1]) if len(parts) > 1 else "general"
        out_dir = os.path.join(DST, brand, cat)
        os.makedirs(out_dir, exist_ok=True)
        fn = process(full, out_dir)
        if fn:
            count += 1
            manifest.append({
                "brand": brand,
                "category": cat,
                "file": f"{brand}/{cat}/{fn}",
                "source_name": os.path.splitext(f)[0]
            })
            print(count, f"{brand}/{cat}/{fn}")

with open(r"C:\Users\rqmul\Desktop\mimasa-ifigen-redesign\assets\img\manifest.json","w",encoding="utf-8") as fh:
    json.dump(manifest, fh, ensure_ascii=False, indent=1)
print("TOTAL", count)
