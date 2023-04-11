import React from 'react';
import Card from '../components/Card/Card';

function Favorites({items, onAddToFavorites}){
    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
        <h1>Мои Закладки</h1>
        </div>
        <div className="d-flex justify-between flex-wrap">
        {items.map((item) => (
            <Card 
              key = {item.id}
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