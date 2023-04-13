import React, {useContext, useState} from 'react';
import ContentLoader from "react-content-loader";
import AppContext from '../../context';


function Card({id, onAddToFavorites, added=false, title, imageUrl, price, onPlus, key, favorited=false, loading=false}) {
    const {isItemAdded} = useContext(AppContext);
    const [isLike, setIsLike] = useState(favorited);

    const onClickLike = () => {
        onAddToFavorites({id, title, imageUrl, price, key});
        setIsLike(!isLike);
    }
    const onClickPlus = () => {
        onPlus({id, title, imageUrl, price, key});
    }
    return (
        <div key={id} className="card">
            {
                loading ? (
                    <ContentLoader 
                    speed={2}
                    width={150}
                    height={230}
                    viewBox="0 0 150 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
                    <rect x="0" y="100" rx="5" ry="5" width="150" height="15" /> 
                    <rect x="0" y="120" rx="5" ry="5" width="93" height="15" /> 
                    <rect x="0" y="150" rx="5" ry="5" width="80" height="25" /> 
                    <rect x="115" y="140" rx="5" ry="5" width="32" height="32" />
                  </ContentLoader>
                ) : (
                    <>
                    <div className="favorite" onClick={onClickLike} >
                    <img  src={isLike ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Heart" />
                    </div>
                    <img width={133} height={112} src={imageUrl} alt="" />
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                    <div className="d-flex flex-column">
                        <span>Цена: </span>
                        <b>{price} руб.</b>
                    </div>
                        <img className="plus" onClick={onClickPlus} src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus" />
                    </div>
                    </>
                )
            }

        </div>
    );
}

export default Card;