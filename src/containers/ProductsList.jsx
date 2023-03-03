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
        <>  
        <Navbar/>
        <div>
            {products.map(prod => 
                <div key={prod._id}>
                    <p>Producto: {prod.title}, precio: ${prod.price}, id: {prod._id}</p>
                    <img src={prod.image} alt={prod.title}/>
                    <a href={`/products/${prod._id}`}>Ver más</a>
                </div>
            )}
        </div>
        </>
    )
}

export default ProductsList;