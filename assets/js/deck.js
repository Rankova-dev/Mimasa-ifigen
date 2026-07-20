/* ============================================================
   Deck de propuesta — navegación
   ============================================================ */
(function(){
  const slides = [...document.querySelectorAll('.slide')];
  const total = slides.length;
  let idx = 0;

  const prevBtn = document.querySelector('#deckPrev');
  const nextBtn = document.querySelector('#deckNext');
  const count = document.querySelector('#deckCount');
  const progress = document.querySelector('#deckProgress');
  const dotsWrap = document.querySelector('#deckDots');

  // dots
  slides.forEach((s,i)=>{
    const b=document.createElement('button');
    b.setAttribute('aria-label','Ir a diapositiva '+(i+1));
    b.addEventListener('click',()=>go(i));
    dotsWrap.appendChild(b);
  });
  const dots=[...dotsWrap.children];

  function render(){
    slides.forEach((s,i)=>{
      s.classList.toggle('is-active', i===idx);
      s.classList.toggle('is-prev', i<idx);
    });
    dots.forEach((d,i)=>d.classList.toggle('is-on', i===idx));
    count.textContent = (idx+1)+' / '+total;
    progress.style.width = ((idx+1)/total*100)+'%';
    prevBtn.disabled = idx===0;
    nextBtn.disabled = idx===total-1;
    location.hash = 's'+(idx+1);
  }
  function go(i){ idx=Math.max(0,Math.min(total-1,i)); render(); }
  function next(){ go(idx+1); }
  function prev(){ go(idx-1); }

  nextBtn.addEventListener('click',next);
  prevBtn.addEventListener('click',prev);

  document.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){ e.preventDefault(); next(); }
    else if(e.key==='ArrowLeft'||e.key==='PageUp'){ e.preventDefault(); prev(); }
    else if(e.key==='Home'){ go(0); }
    else if(e.key==='End'){ go(total-1); }
  });

  // swipe táctil
  let x0=null;
  addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
  addEventListener('touchend',e=>{
    if(x0===null) return;
    const dx=e.changedTouches[0].clientX-x0;
    if(Math.abs(dx)>60){ dx<0? next():prev(); }
    x0=null;
  },{passive:true});

  // click en mitad derecha/izquierda (excepto en enlaces/botones)
  document.querySelector('.deck').addEventListener('click',e=>{
    if(e.target.closest('a,button,.deck-nav,.deck-dots')) return;
    const half = window.innerWidth/2;
    e.clientX>half? next():prev();
  });

  // arranque por hash
  const m=(location.hash.match(/s(\d+)/)||[])[1];
  if(m) idx=Math.min(total-1,Math.max(0,+m-1));
  render();
})();
