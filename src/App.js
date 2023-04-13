import { useEffect, useState } from 'react';
import { Route, Routes} from 'react-router-dom';
import axios from 'axios';
import Draver from './components/Draver';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';


function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // вариант с fetch
    // fetch("https://6432dfc7d0127730d2dc5e2b.mockapi.io/items").then((res) => {
    //   return res.json();
    // }).then((json) => {
    //   setItems(json);
    // });

    // вариант с axios 

      async function fetchData() {
        // сам useefect нельзя делать асинк, нужно в самов useEfect создать функцию которая будет фетчить асинки
        
        
        // стандартное получение данных без фетчинга
        // axios.get("https://6432dfc7d0127730d2dc5e2b.mockapi.io/items").then(res => {
        //   setItems(res.data);
        // });
        // axios.get("https://643443a61c5ed06c95933f49.mockapi.io/favorites").then(res => {
        //   setFavorites(res.data);
        // });
        // axios.get("https://6432dfc7d0127730d2dc5e2b.mockapi.io/cart").then(res => {
        //   setCartItems(res.data);
        // });

        // получение данных в переменную с фетчем

        const cartResponse = await axios.get("https://6432dfc7d0127730d2dc5e2b.mockapi.io/cart");
        const favoritesResponse = await axios.get("https://643443a61c5ed06c95933f49.mockapi.io/favorites");
        const itemsResponse = await axios.get("https://6432dfc7d0127730d2dc5e2b.mockapi.io/items");

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);

      }
      fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if(cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://6432dfc7d0127730d2dc5e2b.mockapi.io/cart/${obj.id}`);
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post("https://6432dfc7d0127730d2dc5e2b.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }

    } catch (error) {
      console.log(error);
    }

  }

  const onRemoveItemCart = (id) => {
    axios.delete(`https://6432dfc7d0127730d2dc5e2b.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));    
  }

  const onAddToFavorites = async (obj) => {
    try {
          // был создан новый мокапи после лимита старого, под акк гугл лост
    if (favorites.find(favObj => favObj.id === obj.id)) {
      axios.delete(`https://643443a61c5ed06c95933f49.mockapi.io/favorites/${obj.id}`);
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      const {data} = await axios.post("https://643443a61c5ed06c95933f49.mockapi.io/favorites", obj);
      setFavorites((prev) => [...prev, data]);
    }
    } catch (error) {
      console.log("Не удалось добавить в фавориты");
    }


  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorites, setCartOpened, setCartItems}}>
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
        cartItems={cartItems}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onChangeSearchInput={onChangeSearchInput}
        onAddToFavorites={onAddToFavorites}
        onAddToCart={onAddToCart}
        isLoading={isLoading}
      />}/>
      <Route path='/favorites' element={<Favorites 
         onAddToFavorites={onAddToFavorites}
      />}/>
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;
