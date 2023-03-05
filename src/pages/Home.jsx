import { useState, useEffect} from "react";
import ProductsService from "../services/ProductsService";

const Home = () => {
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
        <section id="Home" className="content-size">
            <div className="Home-design">
                <p className="Home-design-logo logo-third">clothege</p>
                <img src="/images/niketeamch.png" className="nike-home nike-home-blackwhite" alt="nikebn"/>
                <p className="Home-design-logo logo-second">clothege</p>
                <img src="/images/niketeamch.png" className="nike-home nike-home-background" alt="nike-home"/>
                <p className="Home-design-logo logo-first">clothege</p>
                <a href="/products" className="Home-design-button">tienda</a>
            </div>
            <div className="design-decades">
                <p className="years">1980-1990</p>
                <div className="prod-item-home">
                    {
                        products.map(prod => 
                        <div className="prod-item" key={prod._id}>
                            <div className="prod-item-img">
                                <span></span>
                                <img src={prod.image} alt={prod.title}/>
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
                <p className="old-eras">the old era is back.</p>
                <img src="/images/old_era.avif" alt="old_era"/>
                <div className="item-vintage">
                    <p>vintage</p>
                    <p>80s & 90s</p>
                    <img src="/images/adidas-continental-02.jpg" alt="adidas2"/>
                    <img src="/images/adidas-continental-01.jpg" alt="adidas1"/>
                </div>
            </div>
        </section>
    )
}

export default Home;