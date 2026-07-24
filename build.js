const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const P = path.join(ROOT, 'src', 'partials');
const PG = path.join(ROOT, 'src', 'pages');

const read = p => fs.readFileSync(p, 'utf-8');

const head = read(path.join(P, 'head.html'));
const header = read(path.join(P, 'header.html'));
const footer = read(path.join(P, 'footer.html'));
const overlays = read(path.join(P, 'overlays.html'));

const META = {
  'index.html': ['Alimentos saludables y complementos alimenticios | Mimasa Ifigen',
    'Mimasa Ifigen ofrece productos ecológicos siguiendo siempre procesos de elaboración tradicionales. Te ayudamos a tener una vida saludable.'],
  'mimasa.html': ['Alimentos saludables | Alimentos Mimasa Ifigen',
    'Los alimentos saludables de Mimasa Ifigen son productos ecológicos que te ayudarán a tener una vida saludable. ¡Descúbrelos todos!'],
  'ifigen.html': ['Suplementos naturales | Mimasa Ifigen',
    'Los suplementos naturales de Mimasa Ifigen son el aliado perfecto para tener un mayor bienestar físico. ¡Conócelos todos!'],
  'categoria.html': ['Omega-3-Oligen | Suplementos Ifigen | Mimasa Ifigen',
    'Descubre la gama Omega-3-Oligen de Ifigen: complementos alimenticios para combinar con una alimentación saludable.'],
  'producto.html': ['Oligen 60 cápsulas | Omega-3-Oligen | Mimasa Ifigen',
    'Oligen 60 cápsulas de Ifigen, complemento alimenticio de Omega-3 con DHA 80% TG enzimático.'],
  'sobre-nosotros.html': ['Sobre nosotros | Mimasa Ifigen',
    'Conoce Mimasa Ifigen: una empresa familiar con una larga tradición en alimentos ecológicos y complementos alimenticios de vanguardia.'],
};

for (const [fn, [title, desc]] of Object.entries(META)) {
  const body = read(path.join(PG, fn));
  const h = head.replace('{{TITLE}}', title).replace('{{DESC}}', desc);
  const out = body
    .replace('{{HEAD}}', h)
    .replace('{{HEADER}}', header)
    .replace('{{FOOTER}}', footer)
    .replace('{{OVERLAYS}}', overlays);
  fs.writeFileSync(path.join(ROOT, fn), out, 'utf-8');
  console.log('built', fn);
}
console.log('done');
