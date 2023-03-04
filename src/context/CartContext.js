import { createContext, useState } from "react";
import { getItem, setItem } from "../utils/localStorage";

export const CartContext = createContext();

const CartContextProvider = ( ({children} ) => {
    const [ user, setUser ] = useState(JSON.parse(getItem('user')))

    const addToCart = (product, count) => {
        const cart = JSON.parse(getItem('cart'))
        if(isInCart(product._id)) {
            const index = cart.findIndex(prod => prod.product._id === product._id);
            cart[index].count = cart[index].count + count;
            setItem('cart', JSON.stringify(cart))
            setTimeout(window.location.replace('/products'), 2000)
        } else {
            if(cart !== null && cart.length > 0) setItem('cart', JSON.stringify([...cart, {product, count}]))
            else setItem('cart', JSON.stringify([{product, count}]))
            setTimeout(window.location.replace('/products'), 2000)
        }
    }

    const isInCart = (id) => {
        const cart = JSON.parse(getItem('cart'))
        if(cart !== null && cart.length > 0) {
            const result = cart.some((prod) => prod.product._id === id)
            return result
        }
        return false
    }

    const clearCart = () => {
        localStorage.removeItem('cart')
        window.location.replace('/cart')
    }

    return(
        <CartContext.Provider value={{
            user,
            setUser,
            addToCart,
            clearCart,
            isInCart
        }}>
            {children}
        </CartContext.Provider>
    )
})

export default CartContextProvider;