import { useContext, useState } from "react";
import Info from "./Info";
import AppContext from "../context";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Draver = ({onCloseCart, onRemove, items=[]}) => {

  const {cartItems, setCartItems} = useContext(AppContext);
  const {orderId, setOrderId} = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://643443a61c5ed06c95933f49.mockapi.io/orders', {
        items: cartItems,
      });
      //setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://6432dfc7d0127730d2dc5e2b.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

    return (
        <div className="overlay">
        <div className="drawer">
          <h2 className="d-flex justify-between mb-30">Корзина 
            <img onClick={onCloseCart} className="cu-p" src="/img/close.svg" alt="" /> 
          </h2>

            {
             items.length > 0 ?(
              <>
                <div className="items">
             {items.map((obj) => (
                 <div key={obj.id} className="cartItem d-flex align-center mb-20">
                 <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg">
                 </div>
                 <div className="mr-20 flex">
                     <p className="mb-5">{obj.title}</p>
                     <b>{obj.price} руб.</b>
                 </div>
                 <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/close.svg" alt="" />
                 </div>
             ))}
            </div>
                        <div className="cartTotalBlock">
                        <ul className="cartTotalBlock" >
                          <li>
                            <span>Итого: </span>
                            <div></div>
                            <b>21 498 руб.</b>
                          </li>
                          <li>
                            <span>Налог 5%: </span>
                            <div></div>
                            <b>1074 руб.</b>
                          </li>
                        </ul>
                        <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
                        </div>
              </>
             ) : (
              <Info 
                title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                description={isOrderComplete ? `Ваш заказ #${orderId} скоро буден передан курьеру` : "Добавте хотя бы пару кросовок что бы оформить заказ"}
                image={isOrderComplete ? "/img/order-confirm.jpg" : "/img/empty-cart.jpg"}
              />
              )
            }




        </div>
        </div>
    );
};

export default Draver;