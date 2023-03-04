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
        <>
            <Navbar/>
            <div className="itemDetail">
                <div className="itemDetail-img">
                    <img src={product.image} alt={product.title}/>
                </div>
                <div className="itemDetail-info">
                    <h3>{product.title}</h3>
                    <p>Precio {product.price} </p>
                    <p>Descripción {product.description} </p>
                    {
                        incart === false
                        ? <div className="itemCount">
                            <button id="reduceCount" onClick={reduceCount}>-</button>
                            <span id="span-count">{count}</span>
                            <button className="addToCount" onClick={addToCount}>+</button>
                            <button id="itemFormCount" onClick={() => addToCart(product, count)}>Enviar</button>
                        </div>
                        : <a href="/cart">Ir al carrito</a>
                    }
                    <p>Stock: {product.stock}</p>
                    <a href="/products">Volver</a> 
                </div>
            </div>
        </>
    )
}

export default Product;