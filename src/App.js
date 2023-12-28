import React from 'react'

import Cart from './components/cart.js'
import { products } from './data/products.js'
import { CartContext } from './Contexts.js'
import './styles/app.css'


function App() {
    const [cartItems, setCartItems] = React.useState(products.map(product => {
        return {
            ...product,
            quantity: 1
        }
    }))
    const [totalPrice, setTotalPrice] = React.useState(0)
    const [totalQuantity, setTotalQuantity] = React.useState(0)


    React.useEffect(()=> {
        setTotalPrice(cartItems.reduce((totalPrice, item)=>totalPrice+((item.price-item.price*item.discountPercentage/100)*item.quantity),0).toFixed(2))
        setTotalQuantity(cartItems.reduce((totalQuantity, item)=>totalQuantity+item.quantity,0))
    }
    , [cartItems])

    function removeFromCart(id) {
        setCartItems(cartItems.filter((cartitem)=>cartitem.id !== id))
    }

    function changeQuantity(id, quantity) {
        setCartItems(cartItems.map(cartItem => {
            return {
                ...cartItem,
                quantity: cartItem.id === id ? quantity : cartItem.quantity
            }
        }))
    }
    
    return (
        <CartContext.Provider value={{removeFromCart, changeQuantity, cartItems}}>
            <div className="container">
                <h1 className="title"><i className="bi bi-cart"></i> Shopping cart with Context API</h1>
                <div className="cart-container">
                    {
                        cartItems.length !== 0 ?
                        <>
                        <Cart />
                        <div className="totals-container">
                            <span className="totals"><span className="helper-text">Items in cart:</span><strong>{totalQuantity}</strong></span>                    
                            <span className="totals"><span className="helper-text">Total:</span><strong>${totalPrice}</strong></span>
                        </div>
                        </> :
                        <p style={{textAlign: "center", width: "100%"}}>You have no items in your cart!</p>
                    }
                </div>
            </div>
        </CartContext.Provider>
    )
}


export default App;