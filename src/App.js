import React from 'react'

import CartItem from './components/cartitem.js'
import { products } from './data/products.js'
import { CartContext } from './Contexts.js'


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
        setTotalPrice(cartItems.reduce((totalPrice, item)=>totalPrice+(item.price*item.quantity),0))
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
        <CartContext.Provider value={{removeFromCart, changeQuantity}}>
            <>
                <h1>Shopping cart with Context API</h1>
                <div className="cart">
                    {cartItems.map((cartitem)=>{
                        return (
                            <CartItem 
                                key={cartitem.id}
                                {...cartitem}
                            />
                    )})}
                </div>
                <div className="total">
                    <span>Total Price: {totalPrice}</span>
                    <span>Total Quantity: {totalQuantity}</span>                    
                </div>
            </>
        </CartContext.Provider>
    )
}


export default App;