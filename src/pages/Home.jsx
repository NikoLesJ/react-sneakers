import React from 'react';
import Card from '../components/Card/Card';

function Home({items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorites, onAddToCart, isLoading, id}){
  
  const renderItems = () => {
    const filterItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(8)] : filterItems).map((item, index) => (
      <Card 
        key = {index}
        onAddToFavorites =  {(obj) => onAddToFavorites(obj)}
        onPlus = {(obj) => onAddToCart(obj)}

        loading={isLoading}
        {...item}
      />
    ));
  };
    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/close.svg" alt="Clear" />}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
        </div>
        <div className="d-flex justify-between flex-wrap">
          {renderItems()}
        </div>
      </div>
    );
};

export default Home;