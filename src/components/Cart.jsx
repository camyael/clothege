import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import CartsService from "../services/CartsService";
import { getItem } from "../utils/localStorage";
import Navbar from "./Navbar";

const Cart = () => {
    const { clearCart, user } = useContext(CartContext)
    const [ cartItem, setCartItem ] = useState([])

    useEffect(()=> {
        const cart = JSON.parse(getItem('cart'))
        if(cart !==null && cart.length > 0) setCartItem(cart)
    }, [setCartItem])

    const handleOrder = () => {
        const service = new CartsService()

        const callbackSuccess = (res) => {
            console.log(res.data)
            if(res.data.status === "success") {
                localStorage.removeItem('cart')
                setCartItem([])
                setTimeout(() => window.location.replace('/products'), 1000)
            }
        }
    
        const callbackError = (error) => {
            console.log(error)
        }

        service.order({
            body: {cartItem, user},
            callbackSuccess,
            callbackError
        })
    }
    
    return(
        <>
        <Navbar/>
        <div>
            {
                cartItem.length > 0
                ? <div>
                    {
                        cartItem.map((prod) => {
                            return (
                                <div key={prod.product._id}>
                                    <p>{prod.count}</p>
                                    <p>{prod.product._id}</p>
                                </div>
                            )
                        })
                    }
                    <button onClick={handleOrder}>Finalizar Compra</button>
                    <button onClick={() => clearCart()}>Vaciar carrito</button>
                </div>
                : <p>El carrito esta vacio</p>
            }
        </div>
        </>
    )
}

export default Cart;