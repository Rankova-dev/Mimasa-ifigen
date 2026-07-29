/* ============================================================
   MIMASA · IFIGEN — interacciones demo
   ============================================================ */
(function(){
  const $ = (s,c=document)=>c.querySelector(s);
  const $$ = (s,c=document)=>[...c.querySelectorAll(s)];
  const eur = n => n.toLocaleString('es-ES',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';
  const norm = s => (s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  const params = new URLSearchParams(location.search);
  const byId = id => PRODUCTS.find(x=>x.id===id);
  const pdpUrl = p => 'producto.html?p='+encodeURIComponent(p.id);
  const taxLine = p => p.off ? t('qv_tax').replace('{n}', p.off) : t('tax_incl_only');
  const flagsHTML = p => (p.off?`<span class="mi-flag mi-flag--off">-${p.off}%</span>`:'') + (p.bio?`<span class="mi-flag mi-flag--bio">BIO</span>`:'') + (p.sinGluten?`<span class="mi-flag mi-flag--diet">${t('sg')}</span>`:'');

  const BRAND_LABEL = {mimasa:'Mimasa', ifigen:'Ifigen'};
  const BRAND_TAG   = {mimasa:'Mimasa · Alimentos saludables', ifigen:'Ifigen · Suplementos'};

  const ICON = {
    cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>',
    eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
    x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>'
  };

  /* ---------- Product card ---------- */
  function card(p){
    const flags = [];
    if(p.off) flags.push(`<span class="mi-flag mi-flag--off">-${p.off}%</span>`);
    if(p.bio) flags.push(`<span class="mi-flag mi-flag--bio">BIO</span>`);
    if(p.sinGluten) flags.push(`<span class="mi-flag mi-flag--diet">${t('sg')}</span>`);
    const price = p.price!=null
      ? `<div class="mi-card__price"><b>${eur(p.price)}</b>${p.was?`<s>${eur(p.was)}</s>`:''}</div>`
      : `<div class="mi-card__price"><b style="font-size:1rem;color:var(--ink-2)">${t('consultar')}</b></div>`;
    return `<article class="mi-card" data-id="${p.id}">
      <div class="mi-card__media">
        <div class="mi-card__flags">${flags.join('')}</div>
        <span class="mi-card__brand mi-card__brand--${p.brand}">${p.brand.toUpperCase()}</span>
        <a href="${pdpUrl(p)}" aria-label="${p.name}"><img src="${p.img}" alt="${p.name}" loading="lazy"></a>
        <button class="mi-card__quick" data-quick>${ICON.eye} <span>${t('qv_quick')}</span></button>
      </div>
      <p class="mi-card__cat">${p.cat}</p>
      <h3 class="mi-card__title"><a href="${pdpUrl(p)}">${p.name}</a></h3>
      <p class="mi-card__ref">${p.ref? t('ref')+' '+p.ref : '&nbsp;'}</p>
      <div class="mi-card__foot">
        ${price}
        <button class="mi-card__add" data-add aria-label="Añadir ${p.name}">${ICON.cart}</button>
      </div>
    </article>`;
  }

  function renderGrid(sel, list){
    const el = typeof sel==='string' ? $(sel) : sel; if(!el) return;
    el.innerHTML = list.map(card).join('');
  }

  /* ---------- Category tile ---------- */
  function tile(c, brand, noDesc){
    return `<a class="mi-cat${noDesc?' mi-cat--nodesc':''}" href="${c.url}">
      <div class="mi-cat__img"><img src="${c.img}" alt="${c.name}" loading="lazy"></div>
      <span class="mi-cat__chip mi-cat__chip--${brand}">${brand.toUpperCase()}</span>
      <div class="mi-cat__body"><b>${c.name}</b>${noDesc?'':`<span>${c.desc}</span>`}</div>
    </a>`;
  }
  function renderTiles(sel, list, brand, noDesc){
    const el = $(sel); if(!el) return;
    el.innerHTML = list.map(c=>tile(c,brand,noDesc)).join('');
  }

  /* ---------- Blog ---------- */
  function renderPosts(sel){
    const el = $(sel); if(!el) return;
    el.innerHTML = POSTS.map(p=>`<a class="mi-post" href="#">
      <div class="mi-post__img"><img src="${p.img}" alt="${p.title}" loading="lazy"></div>
      <div class="mi-post__body">
        <p class="mi-post__meta">${p.date}, ${p.author}</p>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
      </div>
    </a>`).join('');
  }

  /* ---------- Mega menu ---------- */
  function megaList(sel, list, brand, noDesc){
    const el = $(sel); if(!el) return;
    el.innerHTML = list.map(c=>`<a class="mi-mega__link" href="${c.url}">
      <span class="mi-mega__ic" style="background:var(--${brand}-soft)">
        <img src="${c.img}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">
      </span>
      <span><b>${c.name}</b>${noDesc?'':`<span>${c.desc}</span>`}</span>
    </a>`).join('');
  }

  /* ---------- Mini-cart (funcional; empieza vacío) ---------- */
  /* Envío gratis: 29 € en España (ES), 299 € en envíos internacionales (EN/FR) */
  const FREE_SHIP = (typeof LANG!=='undefined' && LANG!=='es') ? 299 : 29;
  let cart = [];
  const cartUnits = () => cart.reduce((s,i)=>s+i.qty,0);
  const cartTotal = () => cart.reduce((s,i)=>s+(i.price||0)*i.qty,0);

  function openDrawer(){ renderCart(); $('#miDrawer')?.classList.add('is-on'); $('#miOverlay')?.classList.add('is-on'); document.body.style.overflow='hidden'; }
  function closeAll(){
    ['#miDrawer','#miModal','#miMobile','#miSearch','#miFilters'].forEach(s=>$(s)?.classList.remove('is-on'));
    $('#miOverlay')?.classList.remove('is-on');
    document.body.style.overflow='';
    $$('[data-menu-open],[data-filters-open]').forEach(b=>b.setAttribute('aria-expanded','false'));
    $$('.mi-select.is-open').forEach(s=>{
      s.classList.remove('is-open');
      s.querySelector('[data-sort-open]')?.setAttribute('aria-expanded','false');
    });
  }

  function addToCart(item, qty){
    qty = qty || 1;
    const found = cart.find(i=>i.id===item.id);
    if(found){ found.qty += qty; }
    else { cart.push({id:item.id, name:item.name, brand:item.brand, ref:item.ref, price:item.price, img:item.img, qty}); }
    renderCart();
  }
  function removeFromCart(i){ cart.splice(i,1); renderCart(); }
  function changeQty(i, d){ cart[i].qty += d; if(cart[i].qty<1) cart.splice(i,1); renderCart(); }

  function renderCart(){
    $$('.js-cartcount').forEach(b=>{ const u=cartUnits(); b.textContent=u; b.style.display = u? '' : 'none'; });
    const body = $('#cartBody'), foot = $('#cartFoot');
    if(!body || !foot) return;
    if(!cart.length){
      body.innerHTML = `<div class="mi-cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:46px;height:46px;margin:0 auto 14px;opacity:.4"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
        <p style="font-weight:700;color:var(--ink);margin-bottom:6px">${t('cart_empty_t')}</p>
        <p style="font-size:.88rem">${t('cart_empty_d')}</p></div>`;
      foot.innerHTML = `<button class="mi-btn mi-btn--block mi-btn--ghost" data-close>${t('cart_continue')}</button>`;
      return;
    }
    body.innerHTML = cart.map((i,idx)=>`<div class="mi-citem">
      <a class="mi-citem__img" href="${pdpUrl(i)}"><img src="${i.img}" alt=""></a>
      <div class="mi-citem__main">
        <a href="${pdpUrl(i)}"><b>${i.name}</b></a><span>${i.brand.toUpperCase()}${i.ref? ', '+t('ref')+' '+i.ref:''}</span>
        <div class="mi-citem__row">
          <div class="mi-qty mi-qty--sm">
            <button data-cqty="${idx}|-1" aria-label="Quitar uno">−</button>
            <input value="${i.qty}" readonly aria-label="Cantidad">
            <button data-cqty="${idx}|1" aria-label="Añadir uno">+</button>
          </div>
          <span class="mi-citem__price">${i.price!=null? eur(i.price*i.qty) : t('consultar')}</span>
        </div>
      </div>
      <button class="mi-citem__rm" data-remove="${idx}" aria-label="Eliminar ${i.name}">${ICON.x}</button>
    </div>`).join('');

    const total = cartTotal();
    const remain = Math.max(0, FREE_SHIP - total);
    const pct = Math.min(100, total/FREE_SHIP*100);
    const ship = remain>0
      ? `<div class="mi-drawer__ship"><svg viewBox="0 0 24 24" fill="none" stroke="var(--wine)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px;flex:none;margin-top:2px"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/></svg> <span>${t('cart_remain_1')} <b style="color:var(--wine)">${eur(remain)}</b> ${t('cart_remain_2')}</span></div>`
      : `<div class="mi-drawer__ship"><svg viewBox="0 0 24 24" fill="none" stroke="var(--ok)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px;flex:none"><path d="M20 6L9 17l-5-5"/></svg> <b style="color:var(--ok)">${t('cart_free')}</b></div>`;
    foot.innerHTML = `${ship}
      <div class="mi-drawer__bar"><i style="width:${pct}%"></i></div>
      <div class="mi-drawer__total"><span>${t('cart_subtotal')}</span><b>${eur(total)}</b></div>
      <a href="#" class="mi-btn mi-btn--block mi-btn--lg" data-checkout>${t('cart_checkout')} ${ICON.arrow}</a>`;
  }

  /* ---------- Quick view ---------- */
  let currentQuick = null;
  function openQuick(id){
    const p = byId(id); const m = $('#miModal'); if(!p || !m) return;
    currentQuick = p;
    $('#qvImg').src = p.img; $('#qvImg').alt = p.name;
    $('#qvFlags').innerHTML = flagsHTML(p);
    $('#qvName').textContent = p.name;
    $('#qvCat').textContent = p.cat;
    $('#qvRef').textContent = p.ref? 'Ref. '+p.ref : '';
    $('#qvBrand').textContent = p.brand.toUpperCase();
    $('#qvBrand').className = 'mi-pdp__brand mi-pdp__brand--'+p.brand;
    $('#qvPrice').textContent = p.price!=null ? eur(p.price) : t('consultar');
    $('#qvTax').textContent = taxLine(p);
    $('#qvTax').style.display = p.price!=null? '' : 'none';
    const link = $('#qvLink'); if(link) link.href = pdpUrl(p);
    m.classList.add('is-on'); $('#miOverlay')?.classList.add('is-on'); document.body.style.overflow='hidden';
  }

  /* Producto desde el contexto del botón "Añadir" */
  function itemFromAdd(add){
    const c = add.closest('.mi-card');
    if(c) return {item: byId(c.dataset.id), qty:1};
    if(add.closest('#miModal')){
      const q=$('#miModal .mi-qty input');
      return {item: currentQuick, qty: q? Math.max(1,+q.value||1) : 1};
    }
    if(add.closest('.mi-buyrow') && currentPdp){
      const q=$('.mi-pdp .mi-qty input');
      return {item: currentPdp, qty: q? Math.max(1,+q.value||1) : 1};
    }
    return null;
  }

  /* ---------- Buscador ---------- */
  const SUGGESTIONS = ['Miso','Omega-3','Algas','Melatonina','Umeboshi','Tamari','Probióticos','Kuzu'];
  function openSearch(){
    $('#miSearch')?.classList.add('is-on'); document.body.style.overflow='hidden';
    renderSearch('');
    setTimeout(()=>$('#searchInput')?.focus(),60);
  }
  function searchRow(p){
    return `<a class="mi-srow" href="${pdpUrl(p)}">
      <span class="mi-srow__img"><img src="${p.img}" alt="" loading="lazy"></span>
      <span class="mi-srow__t"><b>${p.name}</b><span>${BRAND_LABEL[p.brand]}, ${p.cat}</span></span>
      <span class="mi-srow__p">${p.price!=null? eur(p.price):t('consultar')}</span>
      ${ICON.arrow}
    </a>`;
  }
  function renderSearch(q){
    const res = $('#searchResults'); if(!res) return;
    const nq = norm(q.trim());
    if(!nq){
      res.innerHTML = `<p class="mi-search__label">${t('search_pop')}</p>
        <div class="mi-search__sug">${SUGGESTIONS.map(s=>`<button class="mi-chip" data-sug="${s}">${s}</button>`).join('')}</div>
        <p class="mi-search__label">${t('search_feat')}</p>
        ${PRODUCTS.filter(p=>p.price!=null).slice(0,4).map(searchRow).join('')}`;
      return;
    }
    const hits = PRODUCTS.filter(p=> norm(p.name).includes(nq) || norm(p.cat).includes(nq) || norm(p.brand).includes(nq)).slice(0,9);
    res.innerHTML = hits.length
      ? `<p class="mi-search__label">${hits.length} ${hits.length>1?t('search_res'):t('search_res1')}</p>` + hits.map(searchRow).join('')
      : `<p class="mi-search__label">${t('search_none')} “${q}”. ${t('search_try')}</p>`;
  }

  /* ---------- Delegated clicks ---------- */
  document.addEventListener('click', e=>{
    const add = e.target.closest('[data-add]');
    if(add){ const r=itemFromAdd(add); if(r&&r.item){ addToCart(r.item, r.qty); } openDrawer(); return; }
    const rm = e.target.closest('[data-remove]');
    if(rm){ removeFromCart(+rm.dataset.remove); return; }
    const cq = e.target.closest('[data-cqty]');
    if(cq){ const [i,d]=cq.dataset.cqty.split('|'); changeQty(+i, +d); return; }
    if(e.target.closest('[data-checkout]')){ e.preventDefault(); alert(t('checkout_demo')); return; }
    const langBtn = e.target.closest('[data-lang-open]');
    if(langBtn){ langBtn.closest('.mi-lang').classList.toggle('is-open'); return; }
    const langSel = e.target.closest('[data-lang]');
    if(langSel){ setLang(langSel.dataset.lang); return; }
    if(!e.target.closest('.mi-lang')) $$('.mi-lang.is-open').forEach(l=>l.classList.remove('is-open'));
    if(e.target.closest('[data-popup-close]') || e.target.id==='miPopup'){ closePopup(); return; }
    const q = e.target.closest('[data-quick]');
    if(q){ openQuick(q.closest('.mi-card').dataset.id); return; }
    if(e.target.closest('[data-cart-open]')){ openDrawer(); return; }
    if(e.target.closest('[data-search-open]')){ openSearch(); return; }
    const filtersOpen = e.target.closest('[data-filters-open]');
    if(filtersOpen){ $('#miFilters')?.classList.add('is-on'); $('#miOverlay')?.classList.add('is-on'); document.body.style.overflow='hidden'; filtersOpen.setAttribute('aria-expanded','true'); return; }
    const sug = e.target.closest('[data-sug]');
    if(sug){ const inp=$('#searchInput'); inp.value=sug.dataset.sug; renderSearch(inp.value); inp.focus(); return; }
    if(e.target.closest('[data-close]') || e.target.id==='miOverlay' || e.target.id==='miSearch'){ closeAll(); return; }
    const menuOpen = e.target.closest('[data-menu-open]');
    if(menuOpen){ $('#miMobile')?.classList.add('is-on'); document.body.style.overflow='hidden'; menuOpen.setAttribute('aria-expanded','true'); return; }
    const acc = e.target.closest('.mi-acc__head');
    if(acc){
      const isOpen = acc.parentElement.classList.toggle('is-open');
      const b=acc.nextElementSibling; b.style.maxHeight = isOpen? b.scrollHeight+'px':0;
      acc.setAttribute('aria-expanded', isOpen);
      return;
    }
    const qty = e.target.closest('[data-qty]');
    if(qty){ const input=qty.parentElement.querySelector('input'); let v=+input.value+(qty.dataset.qty==='+'?1:-1); input.value=Math.max(1,v); return; }
    const variant = e.target.closest('.mi-variant');
    if(variant){ $$('.mi-variant',variant.parentElement).forEach(x=>x.classList.remove('is-on')); variant.classList.add('is-on'); return; }
    const thumb = e.target.closest('.mi-thumb');
    if(thumb){ $$('.mi-thumb').forEach(x=>x.classList.remove('is-on')); thumb.classList.add('is-on'); $('#pdpMain').src=thumb.querySelector('img').src; return; }
  });

  document.addEventListener('input', e=>{
    if(e.target.id==='searchInput') renderSearch(e.target.value);
  });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeAll(); });

  /* ---------- Header stuck ---------- */
  const header = $('.mi-header');
  if(header){ addEventListener('scroll', ()=> header.classList.toggle('is-stuck', scrollY>10), {passive:true}); }

  /* ---------- Scroll reveal ---------- */
  const io = new IntersectionObserver((es)=>{
    es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('is-in'); io.unobserve(en.target);} });
  },{threshold:.12, rootMargin:'0px 0px -40px 0px'});
  function observeReveals(){ $$('.mi-reveal:not(.is-in)').forEach(el=>io.observe(el)); }

  /* ============================================================
     Listado dinámico (categoria.html)
     ============================================================ */
  function setupShop(){
    const grid = $('#shopGrid'); if(!grid) return;
    const opts = { forceBrand: grid.dataset.forceBrand || null, excludeCat: grid.dataset.excludeCat || null };

    const state = {
      brands: new Set(opts.forceBrand ? [opts.forceBrand] : (params.get('brand')? [params.get('brand')] : ['mimasa','ifigen'])),
      cat: params.get('cat') || null,
      subcat: params.get('subcat') || null,
      oferta: params.get('ofertas')==='1',
      bio: params.get('bio')==='1',
      sinGluten: params.get('singluten')==='1', sinLactosa: false,
      maxPrice: 50, sort: 'novedades'
    };
    const isOfertas = params.get('ofertas')==='1';

    /* cabecera contextual — siempre tipográfica (mismo formato que "Raíces y
       otras plantas"): solo título, sin imagen ni descripción de fondo. */
    const head = $('#catHead');
    function updateHead(){
      if(!head) return;
      const oneBrand = state.brands.size===1 ? [...state.brands][0] : null;
      head.classList.remove('mi-pagehead--mimasa','mi-pagehead--ifigen');
      if(oneBrand) head.classList.add('mi-pagehead--'+oneBrand);
      const title = isOfertas? t('ofertas') : (state.subcat || state.cat || (oneBrand? t(oneBrand==='mimasa'?'cat_food':'cat_supp') : t('cat_todos')));
      $('#catTitle').textContent = title;
      $('#catCrumbName').textContent = title;
      document.title = title+' | Mimasa Ifigen';
    }

    function matches(p){
      if(!state.brands.has(p.brand)) return false;
      if(opts.excludeCat && !state.cat && norm(p.cat)===norm(opts.excludeCat)) return false;
      if(state.cat && norm(p.cat)!==norm(state.cat)) return false;
      if(state.subcat && norm(p.subcat||'')!==norm(state.subcat)) return false;
      if(state.oferta && !(p.off>10)) return false;   /* el −10% global no es oferta */
      if(state.bio && !p.bio) return false;
      if(state.sinGluten && !p.sinGluten) return false;
      if(state.sinLactosa && !p.sinLactosa) return false;
      if(p.price!=null && p.price>state.maxPrice) return false;
      return true;
    }

    function chips(){
      const row = $('#chipRow'); if(!row) return;
      const parts=[];
      if(state.brands.size===1 && !opts.forceBrand) parts.push({t:BRAND_LABEL[[...state.brands][0]], k:'brand'});
      if(state.cat) parts.push({t:state.cat, k:'cat'});
      if(state.subcat) parts.push({t:state.subcat, k:'subcat'});
      if(state.sinLactosa) parts.push({t:t('f_sinlactosa'), k:'sl'});
      /* accesos rápidos siempre visibles + chips de filtros activos */
      row.innerHTML =
        `<button class="mi-chip ${state.bio?'is-on':''}" data-qtoggle="bio">BIO</button>`+
        `<button class="mi-chip ${state.sinGluten?'is-on':''}" data-qtoggle="sg">${t('f_singluten')}</button>`+
        parts.map(c=>`<span class="mi-chip is-on" data-unchip="${c.k}">${c.t} ${ICON.x}</span>`).join('');

      const count = $('#filterCount');
      if(count){
        const n = parts.length + (state.bio?1:0) + (state.sinGluten?1:0) + (state.maxPrice<50?1:0);
        count.textContent = n;
        count.hidden = n===0;
      }
    }

    function sidebar(){
      const fb = $('#fBrands');
      if(fb) fb.innerHTML = ['mimasa','ifigen'].map(b=>{
        const n = PRODUCTS.filter(p=>p.brand===b).length;
        return `<label class="mi-check"><input type="checkbox" data-fbrand="${b}" ${state.brands.has(b)?'checked':''}> ${BRAND_LABEL[b]} <span class="c">${n}</span></label>`;
      }).join('');
      const fc = $('#fCats');
      if(fc){
        const cats = [...new Set(PRODUCTS.filter(p=>state.brands.has(p.brand)).map(p=>p.cat))];
        fc.innerHTML = cats.map(c=>{
          const n = PRODUCTS.filter(p=>state.brands.has(p.brand) && p.cat===c).length;
          const on = state.cat && norm(state.cat)===norm(c);
          return `<label class="mi-check"><input type="checkbox" data-fcat="${c}" ${on?'checked':''}> ${c} <span class="c">${n}</span></label>`;
        }).join('');
      }
      const fbio = $('#fBio'); if(fbio) fbio.checked = state.bio;
      const fg = $('#fSinGluten'); if(fg) fg.checked = state.sinGluten;
      const fl = $('#fSinLactosa'); if(fl) fl.checked = state.sinLactosa;
    }

    function sortList(list){
      const l = list.slice();
      if(state.sort==='name-asc') l.sort((a,b)=>a.name.localeCompare(b.name));
      else if(state.sort==='name-desc') l.sort((a,b)=>b.name.localeCompare(a.name));
      else if(state.sort==='price-asc') l.sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));
      else if(state.sort==='price-desc') l.sort((a,b)=>(b.price??-Infinity)-(a.price??-Infinity));
      return l; /* 'novedades': orden de catálogo por defecto */
    }

    function apply(){
      const list = sortList(PRODUCTS.filter(matches));
      if(list.length){
        renderGrid(grid, list);
      } else {
        grid.innerHTML = `<div class="mi-card" style="grid-column:1/-1;padding:34px;text-align:center">
          <p style="font-weight:700;margin-bottom:6px">${t('empty_cat_t')}</p>
          <p style="color:var(--ink-2);font-size:.94rem">${t('empty_cat_d')}</p></div>`;
      }
      $('#shopCount').textContent = list.length;
      chips(); sidebar(); updateHead();
    }

    document.addEventListener('change', e=>{
      const fb = e.target.closest('[data-fbrand]');
      if(fb){
        fb.checked ? state.brands.add(fb.dataset.fbrand) : state.brands.delete(fb.dataset.fbrand);
        if(!state.brands.size){ state.brands.add(fb.dataset.fbrand); fb.checked=true; }
        state.cat=null; state.subcat=null; apply(); return;
      }
      const fc = e.target.closest('[data-fcat]');
      if(fc){ state.cat = fc.checked? fc.dataset.fcat : null; state.subcat=null; apply(); return; }
      if(e.target.id==='fBio'){ state.bio = e.target.checked; apply(); return; }
      if(e.target.id==='fSinGluten'){ state.sinGluten = e.target.checked; apply(); return; }
      if(e.target.id==='fSinLactosa'){ state.sinLactosa = e.target.checked; apply(); return; }
      if(e.target.id==='fPrice'){ state.maxPrice = +e.target.value; $('#fPriceVal').textContent = e.target.value+' €'; apply(); return; }
    });
    document.addEventListener('click', e=>{
      const sortOpen = e.target.closest('[data-sort-open]');
      if(sortOpen){
        const wrap = sortOpen.closest('.mi-select');
        const isOpen = wrap.classList.toggle('is-open');
        sortOpen.setAttribute('aria-expanded', isOpen);
        return;
      }
      const sortOpt = e.target.closest('[data-sort]');
      if(sortOpt){
        state.sort = sortOpt.dataset.sort;
        $$('#sortMenu button').forEach(b=>b.classList.toggle('is-on', b===sortOpt));
        const label = $('#sortLabel'); if(label) label.textContent = sortOpt.textContent;
        sortOpt.closest('.mi-select')?.classList.remove('is-open');
        apply();
        return;
      }
      if(!e.target.closest('.mi-select')) $$('.mi-select.is-open').forEach(s=>{
        s.classList.remove('is-open');
        s.querySelector('[data-sort-open]')?.setAttribute('aria-expanded','false');
      });
      const qt = e.target.closest('[data-qtoggle]');
      if(qt){ if(qt.dataset.qtoggle==='bio') state.bio=!state.bio; else state.sinGluten=!state.sinGluten; apply(); return; }
      const un = e.target.closest('[data-unchip]');
      if(!un) return;
      const k = un.dataset.unchip;
      if(k==='brand'){ state.brands = new Set(['mimasa','ifigen']); state.cat=null; state.subcat=null; }
      if(k==='cat'){ state.cat = null; state.subcat=null; }
      if(k==='subcat') state.subcat = null;
      if(k==='sg') state.sinGluten = false;
      if(k==='sl') state.sinLactosa = false;
      apply();
    });

    apply();
  }

  /* ============================================================
     Ficha de producto dinámica (producto.html)
     ============================================================ */
  let currentPdp = null;
  function setupPdp(){
    const root = $('.mi-pdp'); if(!root) return;
    const p = byId(params.get('p'));

    /* Por defecto la ficha muestra Oligen (producto escaparate con variantes) */
    currentPdp = p || byId('83019-m') || PRODUCTS.find(x=>x.ref==='83019.M');
    if(!p){ renderGrid('#gridRelated', PRODUCTS.filter(x=>x.brand==='ifigen' && x.price!=null && x!==currentPdp).slice(0,4)); return; }

    const deep = p.brand==='mimasa'? 'var(--mimasa-deep)':'var(--ifigen-deep)';
    document.title = `${p.name} | ${p.cat} | Mimasa Ifigen`;

    $('#crumbBrand').textContent = BRAND_LABEL[p.brand];
    $('#crumbBrand').href = p.brand+'.html';
    $('#crumbCat').textContent = p.cat;
    $('#crumbCat').href = 'categoria.html?brand='+p.brand+'&cat='+encodeURIComponent(p.cat);
    $('#crumbName').textContent = p.name;

    $('#pdpMain').src = p.img; $('#pdpMain').alt = p.name;
    $('#pdpThumbs').style.display = 'none';
    $('#pdpFlags').innerHTML = flagsHTML(p);

    const brandPill = $('#pdpBrand');
    brandPill.textContent = p.brand.toUpperCase();
    brandPill.className = 'mi-pdp__brand mi-pdp__brand--'+p.brand;
    $('#pdpName').textContent = p.name;
    $('#pdpRefLine').textContent = p.ref? t('ref')+' '+p.ref : t('pdp_categoria')+': '+p.cat;
    $('#pdpShort').innerHTML = t(p.brand==='ifigen'?'pdp_short_i':'pdp_short_m').replaceAll('{cat}','<b>'+p.cat+'</b>');

    if(p.price!=null){
      $('#pdpPrice').textContent = eur(p.price);
      $('#pdpWas').textContent = p.was? eur(p.was):''; $('#pdpWas').style.display = p.was? '':'none';
      if(p.was){ $('#pdpSave').textContent = t('save')+' '+eur(p.was-p.price); $('#pdpSave').style.display=''; }
      else $('#pdpSave').style.display='none';
      $('#pdpTax').textContent = taxLine(p); $('#pdpTax').style.display='';
    } else {
      $('#pdpPrice').textContent = t('consultar');
      $('#pdpWas').style.display='none'; $('#pdpSave').style.display='none'; $('#pdpTax').style.display='none';
    }

    $('#pdpVariants').style.display = 'none';
    const addBtn = $('#pdpAdd');
    addBtn.classList.remove('mi-btn--ifigen','mi-btn--mimasa');
    addBtn.classList.add(p.brand==='mimasa'?'mi-btn--mimasa':'mi-btn--ifigen');

    $('#pdpDescInner').innerHTML = t(p.brand==='ifigen'?'pdp_body_i':'pdp_body_m').replaceAll('{name}',p.name).replaceAll('{cat}',p.cat);
    $('#pdpSpecs').innerHTML = `
      <tr><td>${t('pdp_marca')}</td><td>${BRAND_LABEL[p.brand]}</td></tr>
      ${p.ref? `<tr><td>${t('pdp_referencia')}</td><td>${p.ref}</td></tr>`:''}
      <tr><td>${t('pdp_categoria')}</td><td>${p.cat}</td></tr>
      ${p.bio? `<tr><td>${t('pdp_cert')}</td><td>BIO</td></tr>`:''}
      ${p.sinGluten? `<tr><td>${t('sg')}</td><td>${t('si')}</td></tr>`:''}
      ${p.sinLactosa? `<tr><td>${t('sl')}</td><td>${t('si')}</td></tr>`:''}`;

    const relEyebrow = $('#relatedEyebrow');
    if(relEyebrow){ relEyebrow.textContent=t('related_eyebrow'); relEyebrow.style.color=deep; }
    $('#relatedTitle').textContent = t('related_more')+' '+BRAND_LABEL[p.brand];
    renderGrid('#gridRelated', PRODUCTS.filter(x=>x.brand===p.brand && x.id!==p.id && x.price!=null).slice(0,4));
  }

  /* ---------- Init ---------- */
  /* ---------- Popup de bienvenida (una sola imagen) ---------- */
  function closePopup(){ const p=$('#miPopup'); if(p){ p.classList.remove('is-on'); document.body.style.overflow=''; } }
  function initPopup(){
    const pop = $('#miPopup'); if(!pop) return;
    if(params.get('nopopup')) return;
    if(sessionStorage.getItem('mi-popup-seen')) return;
    let slide; try{ slide = JSON.parse(localStorage.getItem('mi-popup-slide')) || DEFAULT_POPUP_SLIDE; }catch(e){ slide = DEFAULT_POPUP_SLIDE; }
    if(!slide || slide.active===false || !slide.img) return;
    $('#popupTrack').innerHTML = `<a class="mi-popup__slide is-on" href="${slide.link||'#'}"><img src="${slide.img}" alt="${slide.alt||''}"></a>`;
    const cta = $('#popupCta'); if(cta) cta.href = slide.link || '#';
    setTimeout(()=>{ pop.classList.add('is-on'); document.body.style.overflow='hidden'; sessionStorage.setItem('mi-popup-seen','1'); }, 900);
  }

  /* ---------- Banner permanente (portada, no se cierra) — carrusel ---------- */
  function renderSiteBanner(){
    const el = $('#miSiteBanner'); if(!el) return;
    let banners; try{ banners = JSON.parse(localStorage.getItem('mi-site-banners')) || DEFAULT_SITE_BANNERS; }catch(e){ banners = DEFAULT_SITE_BANNERS; }
    banners = banners.filter(b=>b.active!==false && b.img);
    if(!banners.length){ el.style.display='none'; return; }

    const slides = banners.map((b,i)=>`<a class="mi-topbanner__slide slide--${b.pos||'left'}${i===0?' is-on':''}" href="${b.link||'#'}">
      <picture>
        ${b.mobileImg?`<source media="(max-width:767px)" srcset="${b.mobileImg}">`:''}
        <img src="${b.img}" alt="${b.alt||''}" loading="${i===0?'eager':'lazy'}" fetchpriority="${i===0?'high':'auto'}">
      </picture>
      <span class="mi-topbanner__cta mi-topbanner__cta--desktop">${t('banner_cta')} ${ICON.arrow}</span>
      <div class="mi-topbanner__content">
        ${b.eyebrow?`<span class="mi-topbanner__eyebrow">${b.eyebrow}</span>`:''}
        ${b.title?`<strong class="mi-topbanner__headline">${b.title}</strong>`:''}
        ${b.sub?`<span class="mi-topbanner__sub">${b.sub}</span>`:''}
        <span class="mi-topbanner__cta">${t('banner_cta')} ${ICON.arrow}</span>
      </div></a>`).join('');
    const dots = banners.length>1
      ? `<div class="mi-topbanner__dots">${banners.map((b,i)=>`<button class="mi-topbanner__dot${i===0?' is-on':''}" data-slide="${i}" aria-label="${i+1}"></button>`).join('')}</div>`
      : '';
    el.innerHTML = slides + dots;
    if(banners.length<2) return;

    let idx = 0;
    const slideEls = $$('.mi-topbanner__slide', el), dotEls = $$('.mi-topbanner__dot', el);
    const go = n=>{
      idx = (n+banners.length)%banners.length;
      slideEls.forEach((s,i)=>s.classList.toggle('is-on', i===idx));
      dotEls.forEach((d,i)=>d.classList.toggle('is-on', i===idx));
    };
    dotEls.forEach((d,i)=>d.addEventListener('click', e=>{ e.preventDefault(); go(i); }));
    setInterval(()=>go(idx+1), 5000);
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    applyI18n();
    initPopup();
    renderSiteBanner();
    // home
    renderGrid('#gridFeatured', PRODUCTS.filter(p=>p.price!=null).slice(0,8));
    renderTiles('#tilesMimasaHome', CATS_MIMASA.slice(0,4), 'mimasa', true);
    renderTiles('#tilesIfigenHome', CATS_IFIGEN.slice(0,4), 'ifigen');
    renderPosts('#blogGrid');
    megaList('#megaMimasa', CATS_MIMASA, 'mimasa', true);
    megaList('#megaIfigen', CATS_IFIGEN, 'ifigen');

    // páginas de marca (el listado con filtros lo gestiona setupShop() vía #shopGrid)
    renderTiles('#tilesMimasa', CATS_MIMASA, 'mimasa', true);
    renderTiles('#tilesIfigen', CATS_IFIGEN, 'ifigen');
    const oligo = $('#oligoStrip');
    if(oligo) oligo.innerHTML = OLIGO.map(o=>{
      const prod = PRODUCTS.find(x=>x.cat==='Oligoelementos' && x.name===o.name);
      return `<a class="mi-min" href="${prod? pdpUrl(prod):'#'}">
      <div class="mi-min__media"><img src="${o.img}" alt="Oligoelemento ${o.name}" loading="lazy"></div>
      <b>${o.name}</b></a>`;}).join('');

    setupShop();
    setupPdp();
    renderCart();
    observeReveals();
  });
})();
