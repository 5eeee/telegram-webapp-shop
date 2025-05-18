const tg = window.Telegram?window.Telegram.WebApp:null;
const favKey='fav';
let favorites=JSON.parse(localStorage.getItem(favKey)||'[]');

function init(){
  fillFilterOptions();
  renderCatalog();
  if(tg) tg.expand();

  document.getElementById('catFilter').onchange=renderCatalog;
  document.getElementById('sizeFilter').onchange=renderCatalog;
  document.getElementById('colorFilter').onchange=renderCatalog;
}

function fillFilterOptions(){
  const catSel=document.getElementById('catFilter');
  [...new Set(products.map(p=>p.cat))].forEach(c=>catSel.innerHTML+=`<option>${c}</option>`);

  const sizeSel=document.getElementById('sizeFilter');
  [...new Set(products.flatMap(p=>p.sizes))].forEach(s=>sizeSel.innerHTML+=`<option>${s}</option>`);

  const colorSel=document.getElementById('colorFilter');
  [...new Set(products.map(p=>p.color))].forEach(c=>colorSel.innerHTML+=`<option>${c}</option>`);
}

function renderCatalog(){
  const cat=document.getElementById('catFilter').value;
  const size=document.getElementById('sizeFilter').value;
  const color=document.getElementById('colorFilter').value;

  const list=document.getElementById('catalog');
  list.innerHTML='';
  products.filter(p=>
    (!cat||p.cat===cat)&&(!size||p.sizes.includes(size))&&(!color||p.color===color)
  ).forEach(p=>list.appendChild(card(p)));
}

function card(p){
  const div=document.createElement('div');
  div.className='product-card';
  div.innerHTML=`<div class='product-image'><img src='${p.img}' alt='${p.name}'><div class='heart' onclick='toggleFav(event,${p.id})'>${favorites.includes(p.id)?'♥':'♡'}</div></div>
  <div class='product-info'>
    <h3>${p.name}</h3>
    <p>${p.price} ₽</p>
    <div class='buttons'>
      <button class='details' onclick='openModal(event,${p.id})'>Подробнее</button>
      <button class='add' onclick='addToCart(event)'>В корзину</button>
    </div>
  </div>`;
  return div;
}

function toggleFav(e,id){
  e.stopPropagation();
  const idx=favorites.indexOf(id);
  if(idx>-1)favorites.splice(idx,1);else favorites.push(id);
  localStorage.setItem(favKey,JSON.stringify(favorites));
  renderCatalog();
}

function openModal(e,id){
  e.stopPropagation();
  const p=products.find(x=>x.id===id);
  document.getElementById('m-img').src=p.img;
  document.getElementById('m-name').textContent=p.name;
  document.getElementById('m-price').textContent=p.price;
  document.getElementById('m-desc').textContent=p.desc;
  const sizeWrap=document.getElementById('size-list');
  sizeWrap.innerHTML='';
  p.sizes.forEach(s=>{
    const chip=document.createElement('div');
    chip.className='size-chip';
    chip.textContent=s;
    chip.onclick=()=>{
      sizeWrap.querySelectorAll('.size-chip').forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
    };
    sizeWrap.appendChild(chip);
  });
  document.getElementById('modal').classList.remove('hidden');
}

  document.getElementById('modal').classList.remove('hidden');

function closeModal(){
  document.getElementById('modal').classList.add('hidden');
}

// 👉 ВАЖНО: вызываем инициализацию
init();
