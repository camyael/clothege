import { useContext, useState, useEffect } from "react";
import { getItem } from "../utils/localStorage";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
    const { user } = useContext(CartContext)
    const [ count, setCount ] = useState(null)

    useEffect(()=> {
        const cart = JSON.parse(getItem('cart'))
        if(cart !== null && cart.length > 0) {
            const qntfs = cart.reduce((acc, prod) => acc + prod.count, 0)
            setCount(qntfs)
        }
    }, [setCount])

    return(
        <nav>
            <a href="/" id="logo-navbar">clothege</a>
            <a href="/products">productos</a>
            <a href="/cart">carrito { count !== null && <span>{count}</span>}</a>
            <div>
                {
                    user && user.user.role === 'user'
                    ? <img src={user.user.image} alt="user-icon"/>
                    : <img src={`${process.env.REACT_APP_URL_BACKEND}/images/ecommerce/icon-usuario.png`} alt="user-icon"/>
                }
                {
                    user !== null
                    ? <a href="/profile">perfil</a>
                    : <a href="/login">iniciar sesión</a>
                }
            </div>
            {user && user.user.role === 'admin' && <a href="/createproducts">crear productos</a>}
        </nav>
    )
}

export default Navbar;