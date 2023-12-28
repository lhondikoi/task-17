import React from 'react';
import CartItem from './cartitem.js'
import { CartContext } from '../Contexts.js';
import '../styles/cart.css'

export default function Cart() {
    const { cartItems } = React.useContext(CartContext)
    return (
        <div className="cart">
            {cartItems.map((cartitem, index)=>{
                return (
                    <React.Fragment key={cartitem.id}>
                        <CartItem 
                            {...cartitem}
                        />
                        {index !== cartItems.length - 1 && <hr></hr>}
                    </React.Fragment>
            )})}
        </div>
    )
}