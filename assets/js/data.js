/* ============================================================
   Catálogo demo — datos REALES extraídos de mimasaifigen.com
   (nombres, precios, referencias y categorías sin inventar).
   Las imágenes provienen de las fotos de producto facilitadas.
   ============================================================ */
const IMG = "assets/img/products/";

const PRODUCTS = [
  /* ---------------- MIMASA · Alimentos saludables ---------------- */
  {brand:"mimasa", cat:"Algas marinas", subcat:"Algas europeas", name:"Alga Dulse BIO 50g", ref:"18003", price:5.92, was:6.58, off:10, bio:true, img:IMG+"mimasa/algas-marinas/alga-dulse-bio.jpg"},
  {brand:"mimasa", cat:"Algas marinas", subcat:"Algas europeas", name:"Kombu BIO 50g", ref:"18002", price:6.37, was:7.08, off:10, bio:true, img:IMG+"mimasa/algas-marinas/kombu-bio.jpg"},
  {brand:"mimasa", cat:"Algas marinas", subcat:"Algas europeas", name:"Wakame BIO 50g", ref:"18005", price:6.72, was:7.47, off:10, bio:true, img:IMG+"mimasa/algas-marinas/wakame-bio-amb-alga.jpg"},
  {brand:"mimasa", cat:"Algas marinas", subcat:"Algas europeas", name:"Espagueti de Mar BIO 50g", ref:"18004", price:4.65, was:5.17, off:10, bio:true, img:IMG+"mimasa/algas-marinas/espagueti-de-mar-bio.jpg"},
  {brand:"mimasa", cat:"Algas marinas", subcat:"Algas europeas", name:"Agar Agar en tiras origen UE 20g", ref:"14043", price:4.74, was:5.27, off:10, bio:false, img:IMG+"mimasa/algas-marinas/agar-agar-20-grs.jpg"},
  {brand:"mimasa", cat:"Algas marinas", subcat:"Algas japonesas", name:"Kombu origen Japón 50g", ref:"14037", price:7.57, was:8.41, off:10, bio:false, img:IMG+"mimasa/algas-marinas/kombu-origen-japon-50-grs.jpg"},
  {brand:"mimasa", cat:"Algas marinas", subcat:"Algas japonesas", name:"Alga Nori origen Japón 25g", ref:"14040", price:null, img:IMG+"mimasa/algas-marinas/alga-nori-origen-japon-25-grs.jpg"},
  {brand:"mimasa", cat:"Algas marinas", subcat:"Algas japonesas", name:"Hijiki origen Japón 50g", ref:"14039", price:null, img:IMG+"mimasa/algas-marinas/hijiki-origen-japon-50-grs.jpg"},

  {brand:"mimasa", cat:"Misos", name:"Shiro Miso 300g no pasteurizado", ref:"14074", price:7.23, was:8.03, off:10, bio:false, img:IMG+"mimasa/misos/shiro-miso.jpg"},
  {brand:"mimasa", cat:"Misos", name:"Genmai Miso 400g", ref:"14020", price:7.79, was:8.66, off:10, bio:false, img:IMG+"mimasa/misos/genmai-miso-400-grs.jpg"},
  {brand:"mimasa", cat:"Misos", name:"Hatcho Miso 400g no pasteurizado", ref:"14017", price:9.54, was:10.60, off:10, bio:false, img:IMG+"mimasa/misos/hatcho-miso-400-grs.jpg"},
  {brand:"mimasa", cat:"Misos", name:"Kome Miso 300g", ref:"14022", price:null, img:IMG+"mimasa/misos/kome-miso-300-grs.jpg"},

  {brand:"mimasa", cat:"Umeboshi", name:"Umeboshi con Shiso 150g", ref:"14028.M", price:7.94, was:8.82, off:10, bio:false, img:IMG+"mimasa/umeboshi/umeboshi-con-shiso-150-grs.jpg"},
  {brand:"mimasa", cat:"Umeboshi", name:"Pasta Umeboshi 250g", ref:"14029", price:11.11, was:12.34, off:10, bio:false, img:IMG+"mimasa/umeboshi/pasta-umeboshi-250-grs.jpg"},
  {brand:"mimasa", cat:"Umeboshi", name:"Umeboshi Natural 150g", ref:"14024.M", price:7.60, was:8.45, off:10, bio:false, img:IMG+"mimasa/umeboshi/umeboshi-natural-150-grs.jpg"},

  {brand:"mimasa", cat:"Salsas de soja", name:"Tamari BIO", ref:"14011.M", price:4.32, was:5.40, off:20, bio:true, img:IMG+"mimasa/soja/tamari-bio-150ml.jpg"},
  {brand:"mimasa", cat:"Salsas de soja", name:"Tamari-Shoyu BIO", ref:"14003.M", price:20.06, was:25.08, off:20, bio:true, img:IMG+"mimasa/soja/tamari-shoyu-bio-500ml.jpg"},

  {brand:"mimasa", cat:"Sésamo y elaborados", name:"Tahín BIO 300g", ref:"14070", price:null, bio:true, img:IMG+"mimasa/sesamo/tahin-bio-300grs.jpg"},
  {brand:"mimasa", cat:"Sésamo y elaborados", name:"Gomasio BIO 200g", ref:"14068", price:null, bio:true, img:IMG+"mimasa/sesamo/gomasio-bio-200-grs.jpg"},

  {brand:"mimasa", cat:"Raíces y otras plantas", name:"Jengibre", ref:"12014.M", price:6.61, was:7.35, off:10, bio:false, img:IMG+"mimasa/raices-y-otras-plantas/jengibre-130-grs.jpg"},
  {brand:"mimasa", cat:"Raíces y otras plantas", name:"Lotus", ref:"14061.M", price:9.23, was:10.25, off:10, bio:false, img:IMG+"mimasa/raices-y-otras-plantas/lotus-100-gr.jpg"},
  {brand:"mimasa", cat:"Raíces y otras plantas", name:"Kuzu BIO 100g", ref:"12010", price:null, bio:true, img:IMG+"mimasa/raices-y-otras-plantas/kuzu-bio-bolsa-100gr.jpg"},

  {brand:"mimasa", cat:"Bebidas", name:"Bancha BIO 100g", ref:"15001", price:null, bio:true, img:IMG+"mimasa/bebidas/bancha-bio-100-grs.jpg"},
  {brand:"mimasa", cat:"Bebidas", name:"Kukicha BIO 100g", ref:"15002", price:null, bio:true, img:IMG+"mimasa/bebidas/kukicha-bio-100grs.jpg"},
  {brand:"mimasa", cat:"Cereales", name:"Copos de avena BIO 500g", ref:"12001", price:null, bio:true, img:IMG+"mimasa/cereales-i-proteinas-vegetales/copos-de-avena-bio-500-grs.jpg"},
  {brand:"mimasa", cat:"Cereales", name:"Mijo BIO 500g", ref:"12002", price:null, bio:true, img:IMG+"mimasa/cereales-i-proteinas-vegetales/mijo-bio-500-grs.jpg"},

  /* ---------------- IFIGEN · Suplementos ---------------- */
  {brand:"ifigen", cat:"Omega-3-Oligen", name:"Oligen 60 cápsulas", ref:"83019.M", price:31.33, was:34.82, off:10, img:IMG+"ifigen/oligen/oligen-60-caps.jpg"},
  {brand:"ifigen", cat:"Omega-3-Oligen", name:"Oligen Control Colesterol 60 cápsulas", ref:"83028", price:29.09, was:32.32, off:10, img:IMG+"ifigen/oligen/oligen-control-colesterol.jpg"},
  {brand:"ifigen", cat:"Omega-3-Oligen", name:"Oligen Visión 60 cápsulas", ref:"83009", price:35.96, was:39.95, off:10, img:IMG+"ifigen/oligen/oligen-vision-amb-caps.jpg"},
  {brand:"ifigen", cat:"Omega-3-Oligen", name:"Oligen Peques 30ml", ref:"83005", price:18.67, was:20.75, off:10, img:IMG+"ifigen/oligen/oligen-peques.jpg"},
  {brand:"ifigen", cat:"Omega-3-Oligen", name:"Oligen Memory 60 cápsulas", ref:"83040", price:null, img:IMG+"ifigen/oligen/oligen-memory.jpg"},
  {brand:"ifigen", cat:"Omega-3-Oligen", name:"Oligen Líquido", ref:"83018", price:null, img:IMG+"ifigen/oligen/oligen-liquido.jpg"},

  {brand:"ifigen", cat:"Melatonina", name:"Melatonina Plus 30 cápsulas", ref:"83030", price:6.87, was:7.63, off:10, img:IMG+"ifigen/general/melatonina-plus-30-caps.jpg"},
  {brand:"ifigen", cat:"Probióticos", name:"Floragen 30 cápsulas", ref:"83013", price:13.79, was:15.32, off:10, img:IMG+"ifigen/general/floragen-30-caps.jpg"},

  {brand:"ifigen", cat:"Phyto-Min", name:"Phyto-Min Grosellero Negro 150ml", ref:"80037", price:27.82, was:30.91, off:10, img:IMG+"ifigen/phyto-min/phyto-min-grosellero-negro.jpg"},
  {brand:"ifigen", cat:"Phyto-Min", name:"Phyto-Min Salvia 150ml", ref:"80044", price:27.82, was:30.91, off:10, img:IMG+"ifigen/phyto-min/phyto-min-salvia.jpg"},
  {brand:"ifigen", cat:"Phyto-Min", name:"Phyto-Min Berro 150ml", ref:"80045", price:27.82, was:30.91, off:10, img:IMG+"ifigen/phyto-min/phyto-min-berro.jpg"},
  {brand:"ifigen", cat:"Phyto-Min", name:"Phyto-Min Flor de Naranjo 150ml", ref:"80050", price:27.82, was:30.91, off:10, img:IMG+"ifigen/phyto-min/phyto-min-flor-de-naranjo.jpg"},

  {brand:"ifigen", cat:"Productos de uso tópico", name:"Colutorio Dental 200ml", ref:"82000", price:21.30, was:23.67, off:10, img:IMG+"ifigen/general/colutorio-dental-200-ml.jpg"},
  {brand:"ifigen", cat:"Productos de uso tópico", name:"Loción Capilar 200ml", ref:"82001", price:24.34, was:27.04, off:10, img:IMG+"ifigen/general/locion-capilar-200-ml.jpg"},
  {brand:"ifigen", cat:"Jarabes", name:"Elixir 4 Estaciones botella 250ml", ref:"80051", price:29.09, was:32.32, off:10, img:IMG+"ifigen/general/elixir-4-estaciones-250-ml.jpg"},

  /* Fitoterapia (Phyt Herbs) — cat. 70 de la tienda. Nombres, referencias y precios
     comprobados uno a uno en mimasaifigen.com (28/08/2026). Esta familia no lleva
     el −10% que sí tiene el resto del catálogo: precio a secas, sin tachado. */
  {brand:"ifigen", cat:"Fitoterapia", name:"VR bote 90 cápsulas", ref:"81004", price:65.81, img:IMG+"ifigen/fitoterapia/vr.jpg"},
  {brand:"ifigen", cat:"Fitoterapia", name:"GB bote 90 cápsulas", ref:"81003", price:30.00, img:IMG+"ifigen/fitoterapia/gb.jpg"},
  {brand:"ifigen", cat:"Fitoterapia", name:"NA bote 90 cápsulas", ref:"81002", price:30.00, img:IMG+"ifigen/fitoterapia/na.jpg"},
  {brand:"ifigen", cat:"Fitoterapia", name:"PP40 90 cápsulas", ref:"81001", price:92.22, img:IMG+"ifigen/fitoterapia/pp40.jpg"},
  {brand:"ifigen", cat:"Fitoterapia", name:"NAR sobre monodosis 3g", ref:"81000", price:5.00, img:IMG+"ifigen/fitoterapia/nar.jpg"},

  {brand:"mimasa", cat:"Utensilios de cocina", subcat:"Colección Vajilla Japonesa Shibumi", name:"Suribachi 18cm", ref:"23000", price:15.18, was:16.87, off:10, img:IMG+"mimasa/utensilios-y-bibliografia/suribachi.jpg"},
  {brand:"mimasa", cat:"Utensilios de cocina", subcat:"Colección Vajilla Japonesa Shibumi", name:"Surikogi", ref:"23002", price:7.31, was:8.12, off:10, img:IMG+"mimasa/utensilios-y-bibliografia/surikogi.jpg"},
  {brand:"mimasa", cat:"Utensilios de cocina", subcat:"Accesorios de cocina", name:"Colador de té (caña de bambú)", ref:"23005", price:7.91, was:8.78, off:10, img:IMG+"mimasa/utensilios-y-bibliografia/colador-de-te-cana-de-bambu.jpg"},
  {brand:"mimasa", cat:"Utensilios de cocina", subcat:"Accesorios de cocina", name:"Esterillas sushi (caña de bambú)", ref:"23006", price:5.70, was:6.33, off:10, img:IMG+"mimasa/utensilios-y-bibliografia/esterillas-sushi-cana-de-bambu.jpg"},
  {brand:"mimasa", cat:"Utensilios de cocina", subcat:"Accesorios de cocina", name:"Cepillo para limpiar hortalizas (tawashi)", ref:"23004", price:9.83, was:10.93, off:10, img:IMG+"mimasa/utensilios-y-bibliografia/cepillo-para-limpiar-hortalizas-tawashi.jpg"},
  {brand:"mimasa", cat:"Utensilios de cocina", subcat:"Accesorios de cocina", name:"Libro Macrobiótica (M. Kushi)", ref:"24000", price:16.78, was:18.65, off:10, img:IMG+"mimasa/utensilios-y-bibliografia/libro-macrobiotica-michio-kushi.jpg"},
];

/* Oligoelementos — familia (sin precio público en demo) */
const OLIGO = ["zinc","cobre","hierro","selenio","cromo","silicio","yodo","manganeso","potasio","fosforo","azufre","cobalto"]
  .map(n=>({name:n.charAt(0).toUpperCase()+n.slice(1), img:IMG+"ifigen/oligoelements/"+n+".jpg"}));

/* Los oligoelementos también forman parte del catálogo navegable
   (sin referencia pública: se consulta en tienda) */
OLIGO.forEach(o=>PRODUCTS.push({
  brand:"ifigen", cat:"Oligoelementos", name:o.name, ref:"", price:null, img:o.img
}));


/* Intolerancias — asignación DEMO por naturaleza del producto.
   Debe validarse con las fichas técnicas del cliente antes de publicar. */
const SIN_GLUTEN_REFS = ["18003","18002","18005","18004","14043","14037","14040","14039", /* algas */
  "14028.M","14029","14024.M", /* umeboshi */ "14070","14068", /* sésamo */
  "12014.M","14061.M","12010", /* raíces */ "12002" /* mijo */];
const LACTEOS_EXENTOS = p => p.brand==="mimasa" && p.cat!=="Utensilios de cocina";
PRODUCTS.forEach(p=>{
  p.sinGluten = SIN_GLUTEN_REFS.includes(p.ref);
  p.sinLactosa = LACTEOS_EXENTOS(p);
});

/* Banners reales de la web actual (editables en admin.html):
   - popup de bienvenida: una sola imagen, se puede cerrar
   - banner del sitio: siempre visible en portada, no se cierra */
const DEFAULT_POPUP_SLIDE = {img:"assets/img/banners/popup-packs.svg", alt:"Packs especiales Mimasa Ifigen", link:"categoria.html?ofertas=1", active:true};
const DEFAULT_SITE_BANNERS = [
  {img:"assets/img/banners/banner-soja.jpg", mobileImg:"assets/img/banners/banner-soja-mobile.jpg", alt:"Descuento salsas de soja", link:"categoria.html?brand=mimasa&cat=Salsas%20de%20soja", active:true,
    eyebrow:"-20%", title:"Salsa de soja Tamari", sub:"Tamari · Tamari Shoyu"},
  {img:"assets/img/banners/banner-oligen-memory.jpg", mobileImg:"assets/img/banners/banner-oligen-memory-mobile.jpg", alt:"Oligen Memory", link:"producto.html?p=83040", active:true,
    eyebrow:"Novedad", title:"Memoria para todas las edades", sub:"Omega-3 DHA 80% + BacoMind"},
];

/* Identificador estable para URLs de la demo (?p=…) */
PRODUCTS.forEach(p=>{
  p.id=(p.ref||p.name).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
});

/* Categorías de cada mundo (reales) — enlazan al listado filtrado */
const catUrl = (b,c)=>"categoria.html?brand="+b+"&cat="+encodeURIComponent(c);
const CATS_MIMASA = [
  {name:"Algas marinas", desc:"Bio y de fermentación tradicional", img:IMG+"mimasa/algas-marinas/kombu-bio.jpg", url:catUrl("mimasa","Algas marinas")},
  {name:"Misos", desc:"Pasta de soja fermentada", img:IMG+"mimasa/misos/hatcho-miso-400-grs.jpg", url:catUrl("mimasa","Misos")},
  {name:"Umeboshi", desc:"Ciruela fermentada", img:IMG+"mimasa/umeboshi/umeboshi-con-shiso-150-grs.jpg", url:catUrl("mimasa","Umeboshi")},
  {name:"Salsas de soja", desc:"Tamari y Shoyu", img:IMG+"mimasa/soja/tamari-shoyu-icon.jpg", url:catUrl("mimasa","Salsas de soja")},
  {name:"Sésamo", desc:"Tahín y Gomasio", img:IMG+"mimasa/sesamo/tahin-bio-300grs.jpg", url:catUrl("mimasa","Sésamo y elaborados")},
  {name:"Raíces y plantas", desc:"Kuzu, jengibre y lotus", img:IMG+"mimasa/raices-y-otras-plantas/lotus-100-gr.jpg", url:catUrl("mimasa","Raíces y otras plantas")},
  {name:"Bebidas", desc:"Bancha y Kukicha", img:IMG+"mimasa/bebidas/kukicha-bio-100grs.jpg", url:catUrl("mimasa","Bebidas")},
  {name:"Cereales", desc:"Avena, mijo y proteína", img:IMG+"mimasa/cereales-i-proteinas-vegetales/mijo-bio-500-grs.jpg", url:catUrl("mimasa","Cereales")},
];

/* Utensilios de cocina — categoría propia (mimasa / ifigen / utensilios), ya no anidada bajo Mimasa */
const CATS_UTENSILIOS = [
  {name:"Utensilios de cocina", desc:"Suribachi, bambú y libro", img:IMG+"mimasa/utensilios-y-bibliografia/suribachi.jpg", url:catUrl("mimasa","Utensilios de cocina")},
];
const CATS_IFIGEN = [
  {name:"Omega-3-Oligen", desc:"DHA de alta concentración", img:IMG+"ifigen/oligen/oligen-60-caps.jpg", url:catUrl("ifigen","Omega-3-Oligen")},
  {name:"Melatonina", desc:"Descanso", img:IMG+"ifigen/general/melatonina-plus-30-caps.jpg", url:catUrl("ifigen","Melatonina")},
  {name:"Probióticos", desc:"Flora intestinal", img:IMG+"ifigen/general/floragen-30-caps.jpg", url:catUrl("ifigen","Probióticos")},
  {name:"Oligoelementos", desc:"Minerales esenciales", img:IMG+"ifigen/oligoelements/zinc.jpg", url:catUrl("ifigen","Oligoelementos")},
  {name:"Phyto-Min", desc:"Extractos de planta", img:IMG+"ifigen/phyto-min/phyto-min-salvia.jpg", url:catUrl("ifigen","Phyto-Min")},
  {name:"Fitoterapia", desc:"Plantas", img:IMG+"ifigen/fitoterapia/bodegon.jpg", url:catUrl("ifigen","Fitoterapia")},
  {name:"Uso tópico", desc:"Colutorio y loción", img:IMG+"ifigen/general/colutorio-dental-200-ml.jpg", url:catUrl("ifigen","Productos de uso tópico")},
  {name:"Jarabes", desc:"Para toda la familia", img:IMG+"ifigen/general/elixir-4-estaciones-250-ml.jpg", url:catUrl("ifigen","Jarabes")},
];

const POSTS = [
  {title:"Guía completa del Omega-3: qué es, para qué sirve y cómo elegir bien", date:"7 jun 2026", author:"Silvia",
   img:"https://mimasaifigen.com/blog/wp-content/uploads/2026/06/Blog-Mimasa-2-768x384.png",
   excerpt:"El omega-3 es uno de los suplementos más consumidos del mundo, y también uno de los más mal entendidos. Se habla mucho de sus beneficios, pero…"},
  {title:"Guía de algas: diferencias entre europeas y japonesas", date:"5 jun 2026", author:"Silvia",
   img:"https://mimasaifigen.com/blog/wp-content/uploads/2026/06/Algas-Mimasa-Ifigen-768x384.png",
   excerpt:"Las algas llevan siglos en la cocina japonesa y atlántica, pero en la cocina doméstica española siguen siendo un ingrediente que mucha gente mira…"},
  {title:"Tahín: qué es, cómo usarlo", date:"4 jun 2026", author:"Silvia",
   img:"https://mimasaifigen.com/blog/wp-content/uploads/2026/06/tahin-768x384.png",
   excerpt:"Si en tu nevera hay un bote de tahín que solo sale cuando haces hummus, estás aprovechando una pequeña parte de lo que puede…"},
];
