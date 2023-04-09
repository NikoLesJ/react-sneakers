import { useEffect, useState } from 'react';
import Card from './components/Card/Card';
import Draver from './components/Draver';
import Header from './components/Header';



function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch("https://6432dfc7d0127730d2dc5e2b.mockapi.io/items").then((res) => {
      return res.json();
    }).then((json) => {
      setItems(json);
    });
  }, []);

  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj]);
  }
  return (
    <div className="wrapper clear">
      
      {cartOpened && <Draver 
        items={cartItems}
        onCloseCart={() => setCartOpened(false)}
      />}
      <Header 
        onClickCart={() => setCartOpened(true)} 
      />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
        <h1>Все кроссовки</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input placeholder="Поиск..." />
        </div>
        </div>
        <div className="d-flex justify-between flex-wrap">
          {items.map((item) => (
            <Card 
              key = {item.id}
              title = {item.title}
              price =  {item.price} 
              imageUrl = {item.imageUrl} 
              onFavorite =  {() => console.log('fav')}
              onPlus = {(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
