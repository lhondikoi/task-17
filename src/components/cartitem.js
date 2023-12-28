import React from 'react';
import { CartContext } from '../Contexts';

function CartItem({ id, title, description, price, discountPercentage, stock, quantity}) {
    const {removeFromCart, changeQuantity} = React.useContext(CartContext)
    return (
        <div className="cart-item">
            <h2>{title}</h2>
            <p>{description}</p>
            {
                quantity > 0 ?
                <input type="number" name="quantity" id={`item-${id}-quantity`} defaultValue={quantity} onChange={(e)=>changeQuantity(id, Number(e.target.value))}/> : 
                <button onClick={()=>changeQuantity(id, 1)}>Add to Cart</button>
            }
            <p>Price per item: <strike>${price}</strike> ${(price - (discountPercentage/100)*price).toFixed(0)}</p>
            <button onClick={()=>removeFromCart(id)}>Remove from cart</button>
        </div>
    )
}

export default CartItem;