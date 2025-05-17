const tg = window.Telegram.WebApp;
tg.expand();

const catalog = document.getElementById('catalog');
const favoritesList = document.getElementById('favorites');
const products = [
  { id: 1, name: 'Красная куртка', price: 4990 },
  { id: 2, name: 'Белая футболка', price: 1990 },
  { id: 3, name: 'Черные джинсы', price: 3990 },
  { id: 4, name: 'Серая толстовка', price: 2990 },
  { id: 5, name: 'Кроссовки', price: 5990 },
];

let favorites = [];

function renderCatalog() {
  catalog.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Цена: ${product.price} ₽</p>
      <button onclick="addToFavorites(${product.id})">❤️ В избранное</button>
    `;
    catalog.appendChild(div);
  });
}

function addToFavorites(id) {
  const product = products.find(p => p.id === id);
  if (!favorites.find(f => f.id === id)) {
    favorites.push(product);
    renderFavorites();
  }
}

function renderFavorites() {
  favoritesList.innerHTML = '';
  favorites.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price} ₽`;
    favoritesList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  renderFavorites();

  tg.MainButton.setText('Оформить заказ');
  tg.MainButton.show();

  tg.MainButton.onClick(() => {
    tg.sendData(JSON.stringify({
      action: 'checkout',
      favorites: favorites
    }));
  });
});