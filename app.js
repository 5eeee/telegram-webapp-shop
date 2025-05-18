const tg=window.Telegram?window.Telegram.WebApp:null; // если запуск в Telegram
const favKey='casher_favs';
let favorites=JSON.parse(localStorage.getItem(favKey)||'[]');

function init(){
  renderFilters();
  renderCatalog();
  if(tg){tg.expand();}
  document.getElementById('avatar').onclick=()=>alert('Профиль и история заказов в разработке');
}

function renderFilters(){
  const cats=[...new Set(products.map(p=>p.cat))];
  const filters=document.getElementById('filters');
  filters.innerHTML='';
  ['Все',...cats].forEach(cat=>{
    const chip=document.createElement('div');
    chip.className='filter-chip';
    chip.textContent=cat;
    chip.onclick=()=>{
      document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
      renderCatalog(cat==='Все'?null:cat);
    };
    filters.appendChild(chip);
  });
  filters.firstChild.classList.add('active');
}

function renderCatalog(category=null){
  const list=document.getElementById('catalog');
  list.innerHTML='';
  products.filter(p=>!category||p.cat===category).forEach(p=>list.appendChild(card(p)));
}

function card(p){
  const div=document.createElement('div');
  div.className='card';

  // верх: изображение + сердечко
  const imgWrap=document.createElement('div');
  imgWrap.className='card-img';
  imgWrap.innerHTML=`<img src="${p.img}" alt="${p.name}">`;
  const heart=document.createElement('div');
  heart.className='heart';
  heart.innerHTML=favorites.includes(p.id)?'❤️':'🤍';
  heart.onclick=(e)=>{e.stopPropagation();toggleFav(p.id,heart);} 
  imgWrap.appendChild(heart);

  // низ: детали
  const details=document.createElement('div');
  details.className='details';
  details.innerHTML=`
    <div class="name">${p.name}</div>
    <div class="price-area">
      <span class="price">${p.price} ₽</span>
      <span class="old-price">${p.old} ₽</span>
    </div>
  `;
  const btnGroup=document.createElement('div');
  btnGroup.className='btns';
  const more=document.createElement('button');
  more.className='btn secondary';
  more.textContent='Подробнее';
  more.onclick=(e)=>{e.stopPropagation();openModal(p);} 
  const cart=document.createElement('button');
  cart.className='btn';
  cart.textContent='В корзину';
  cart.onclick=(e)=>{e.stopPropagation();alert('Добавлено в корзину');};
  btnGroup.appendChild(more);
  btnGroup.appendChild(cart);
  details.appendChild(btnGroup);

  div.appendChild(imgWrap);
  div.appendChild(details);
  return div;
}

function toggleFav(id,heart){
  const idx=favorites.indexOf(id);
  if(idx>-1){favorites.splice(idx,1);heart.textContent='🤍';}
  else {favorites.push(id);heart.textContent='❤️';}
  localStorage.setItem(favKey,JSON.stringify(favorites));
}

function openModal(p){
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

function closeModal(){document.getElementById('modal').classList.add('hidden');}
function addToCart(){alert('Товар добавлен в корзину');closeModal();}

document.addEventListener('DOMContentLoaded',init);