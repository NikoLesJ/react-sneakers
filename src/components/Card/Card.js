import React, {useState} from 'react';


function Card({id, onAddToFavorites,  onFavorite, title, imageUrl, price, onPlus, key, favorited=false}) {
    const [isLike, setIsLike] = useState(favorited);
    const [isAdded, setIsAdded] = useState(false);

    const onClickLike = () => {
        onAddToFavorites({id, title, imageUrl, price, key});
        setIsLike(!isLike);
    }
    const onClickPlus = () => {
        onPlus({id, title, imageUrl, price, key});
        setIsAdded(!isAdded);
    }
    return (
        <div className="card">
        <div className="favorite">
        <img onClick={onClickLike} src={isLike ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Heart" />
        </div>
        <img width={133} height={112} src={imageUrl} alt="" />
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
            <span>Цена: </span>
            <b>{price} руб.</b>
        </div>
            <img className="plus" onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus" />
        </div>
        </div>
    );
}

export default Card;