import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Home2 = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(data => {
                console.log("API data received:", data);
                setProducts(data);
            })
            .catch(err => console.error(err));
    }, [])

    return (
        <>
            <Swiper style={{ height: "400px" }} modules={[Autoplay]}
                autoplay={{ delay: 1000 }}
                spaceBetween={2}
                slidesPerView={3}
            >
                {
                    products.map(product => {
                        return <SwiperSlide key={product.id}>
                            <NavLink to={`/products/${product.id}`}>
                                <img src={product.image} style={{ width: "30%", height: "30%" }} />
                                <h3>{product.title}</h3>
                                <p>${product.price} </p>
                            </NavLink>
                        </SwiperSlide>

                    })
                }

            </Swiper >
            <NavLink to="/products">  <button>View More Products</button></NavLink>

        </>
    )
}
export default Home2;