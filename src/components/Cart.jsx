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
        <div className="content-size">
        <Navbar/>
        <div>
            <h2 className="section-title">Carrito</h2>
            {
                cartItem.length > 0
                ? <div id="cart-itemlist">
                    <div className="cart-items">
                    {
                        cartItem.map((prod) => {
                            return (
                                <div key={prod.product._id} className="cart-item">
                                    <img src={`${process.env.REACT_APP_URL_BACKEND}${prod.product.image}`} alt={prod.product.title} />
                                    <div>
                                        <p>{prod.product.title}</p>
                                        <p>cantidad: {prod.count}</p>
                                    </div>
                                    <p>${prod.product.price}</p>
                                </div>
                            )
                        })
                    }
                    </div>
                    <div className="cart-checkout">
                        <button className="finalize-cart" onClick={handleOrder}>Finalizar Compra</button>
                        <button className="empty-cart" onClick={() => clearCart()}>Vaciar carrito</button>
                    </div>
                </div>
                : <p>El carrito esta vacio</p>
            }
        </div>
        </div>
    )
}

export default Cart;