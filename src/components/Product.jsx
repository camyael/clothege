import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductsService from "../services/ProductsService";
import Navbar from "./Navbar";

const Product = () => {
    const { addToCart, isInCart } = useContext(CartContext)
    const [ product, setProduct ] = useState([])
    const [ count, setCount ] = useState(1)
    const { id } = useParams()

    useEffect(() => {
            const callbackSuccess = (res) => {
                setProduct(res.data.payload)
            }
        
            const callbackError = (err) => {
                console.log(err)
            }
    
            const service = new ProductsService();
            service.getById({
                id: id,
                callbackSuccess,
                callbackError
            })
    }, [id])

    const reduceCount = () => {
        if(count > 1) {
            setCount(count - 1)
        }
    }

    const addToCount = () => {
        if(product.stock > count) {
            setCount(count + 1)
        }
    }

    const incart = isInCart(product._id)

    return (
        <div className="content-size">
            <Navbar/>
            <div className="itemDetail">
                <div className="itemDetail-img">
                    <span></span>
                    <img src={`${process.env.REACT_APP_URL_BACKEND}${product.image}`} alt={product.title}/>
                </div>
                <div className="itemDetail-info">
                    <div>
                        <p>{product.brand}</p>
                        <h3>{product.title}</h3>
                    </div>
                    <p>${product.price} </p>
                    <p>{product.description} </p>
                    {
                        incart === false
                        ? <div className="itemCount">
                            <div>
                                <button className="reduceCount" onClick={reduceCount}>-</button>
                                <span className="span-count">{count}</span>
                                <button className="addToCount" onClick={addToCount}>+</button>
                            </div>
                            <button id="itemFormCount" onClick={() => addToCart(product, count)}>agregar al carrito</button>
                        </div>
                        : <a href="/cart">ir al carrito</a>
                    }
                    <p>stock: {product.stock}</p>
                    <a href="/products">volver</a> 
                </div>
            </div>
        </div>
    )
}

export default Product;