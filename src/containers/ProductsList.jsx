import { useEffect, useState } from "react";
import ProductsService from "../services/ProductsService";
import Navbar from "../components/Navbar";

const ProductsList = () => {
    const [ products, setProducts ] = useState([])

    useEffect(() => {
        const callbackSuccess = (res) => {
            setProducts(res.data.payload)
        }
    
        const callbackError = (err) => {
            console.log(err)
        }

        const service = new ProductsService();
        service.getAll({
            callbackSuccess: callbackSuccess,
            callbackError: callbackError
        })

    }, [setProducts])

    return (
        <div className="content-size">  
            <Navbar/>
            <h2 className="section-title">productos</h2>
            <div id="products-list">
                {products.map(prod => 
                    <div className="prod-item" key={prod._id}>
                        <div className="prod-item-img">
                            <span></span>
                            <img src={`${process.env.REACT_APP_URL_BACKEND}${prod.image}`} alt={prod.title}/>
                        </div>
                        <div className="prod-item-text">
                            <p className="prod-item-title">{prod.title}</p>
                            <div>
                                <p>${prod.price}</p>
                                <a href={`/products/${prod._id}`} className="prod-item-vermas">ver más</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductsList;