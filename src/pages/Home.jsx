const Home = () => {
    return (
        <section id="Home">
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
                <p className="old-eras">the old era is back.</p>
                <img src="/images/old_era.avif" alt="old_era"/>
                <div>
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