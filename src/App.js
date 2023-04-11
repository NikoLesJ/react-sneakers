import { useEffect, useState } from 'react';
import { Route, Routes} from 'react-router-dom';
import axios from 'axios';
import Draver from './components/Draver';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';



function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    // вариант с fetch
    // fetch("https://6432dfc7d0127730d2dc5e2b.mockapi.io/items").then((res) => {
    //   return res.json();
    // }).then((json) => {
    //   setItems(json);
    // });

    // вариант с axios 

    axios.get("https://6432dfc7d0127730d2dc5e2b.mockapi.io/items").then(res => {
      setItems(res.data);
    });
    axios.get("https://643443a61c5ed06c95933f49.mockapi.io/favorites").then(res => {
      setFavorites(res.data);
    });
    axios.get("https://6432dfc7d0127730d2dc5e2b.mockapi.io/cart").then(res => {
      setCartItems(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://6432dfc7d0127730d2dc5e2b.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  }

  const onRemoveItemCart = (id) => {
    axios.delete(`https://6432dfc7d0127730d2dc5e2b.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));    
  }

  const onAddToFavorites = async (obj) => {
    // был создан новый мокапи после лимита старого, под акк гугл лост
    if (favorites.find(favObj => favObj.id === obj.id)) {
      axios.delete(`https://643443a61c5ed06c95933f49.mockapi.io/favorites/${obj.id}`);
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      const {data} = await axios.post("https://643443a61c5ed06c95933f49.mockapi.io/favorites", obj);
      setFavorites((prev) => [...prev, data]);
    }

  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }
  return (
    
    <div className="wrapper clear">
      
      {cartOpened && <Draver 
        items={cartItems}
        onCloseCart={() => setCartOpened(false)}
        onRemove={onRemoveItemCart}
      />}
      <Header 
        onClickCart={() => setCartOpened(true)} 
      />
      <Routes>
      <Route path='/' element={<Home 
        items={items}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onChangeSearchInput={onChangeSearchInput}
        onAddToFavorites={onAddToFavorites}
        onAddToCart={onAddToCart}
      />}/>
      <Route path='/favorites' element={<Favorites 
        items={favorites} onAddToFavorites={onAddToFavorites}
      />}/>
      </Routes>
    </div>
  );
}

export default App;
