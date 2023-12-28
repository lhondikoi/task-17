import React from 'react';
import { CartContext } from '../Contexts';
import '../styles/cartitem.css'

function CartItem({ id, title, description, price, discountPercentage, stock, quantity, thumbnail, index}) {
    const {removeFromCart, changeQuantity } = React.useContext(CartContext)

    function increaseQuantity() {
        if (quantity < stock) {
            changeQuantity(id, quantity + 1)
        }
    }
    function decreaseQuantity() {
        if (quantity > 0) {
            changeQuantity(id, quantity - 1)
        }
    }
    return (
        <div className="cart-item">
            <div className="cart-item-left">
                <img className="item-img" src={thumbnail} alt={title} />
            </div>
            <div className="cart-item-middle">
                <h2 className="item-title">{title}</h2>
                <p className="item-description">{description}</p>
                <span className="item-price"><span className="helper-text">Price: </span><b><s className="helper-text">${price}</s> ${(price - (discountPercentage/100)*price).toFixed(0)}</b></span>
            </div>
            <div className="cart-item-right">
                {
                    quantity > 0 ?
                    <>
                        <div className="item-quantity-box">
                            <button className="item-quantity-change" onClick={()=> decreaseQuantity()}><i className="bi bi-dash"></i></button>
                            <span className="item-quantity">{quantity}</span> 
                            <button className="item-quantity-change" onClick={()=> increaseQuantity()}><i className="bi bi-plus-lg"></i></button>
                        </div>
                        <button className="btn btn-remove-from-cart" onClick={()=>removeFromCart(id)}>Remove from cart</button>
                        <span className="subtotal"><span className="helper-text">Sub-total:</span> <b>${price * quantity}</b></span>
                    </> :
                    <button className="btn btn-add-to-cart" onClick={()=>changeQuantity(id, 1)}>Add to Cart</button>
                }
            </div>
        </div>
    )
}

export default CartItem;