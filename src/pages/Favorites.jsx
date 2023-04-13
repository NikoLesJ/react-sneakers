import React, { useContext } from 'react';
import Card from '../components/Card/Card';
import AppContext from '../context';

function Favorites({ onAddToFavorites}){
  const {favorites} = useContext(AppContext);
    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
        <h1>Мои Закладки</h1>
        </div>
        <div className="d-flex justify-between flex-wrap">
        {favorites.map((item, index) => (
            <Card 
              key = {index}
              favorited={true}
              onAddToFavorites={onAddToFavorites}
              {...item}
            />
          ))}
        </div>
      </div>
    );
};

export default Favorites;