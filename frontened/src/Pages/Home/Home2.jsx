import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Home2 = () => {
    const products = useSelector(state => state.products.products);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            {/* Section title */}
            <h2 className="text-2xl font-semibold mb-6">
                Featured Products
            </h2>

            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 2000 }}
                loop={true}
                spaceBetween={20}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {products.map(product => (
                    <SwiperSlide key={product.id}>
                        <NavLink
                            to={`/products/${product.id}`}
                            className="block bg-white rounded-xl shadow hover:shadow-lg transition p-4 h-full m-1"
                        >
                            <div className="flex flex-col h-full">

                                {/* Image */}
                                <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="max-h-full object-contain"
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="mt-4 text-sm font-medium line-clamp-2 min-h-[40px]">
                                    {product.title}
                                </h3>

                                {/* Spacer (push price down) */}
                                <div className="flex-grow" />

                                {/* Price */}
                                <p className="mt-2 font-semibold text-lg">
                                    ${product.price}
                                </p>

                            </div>
                        </NavLink>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* CTA */}
            <div className="text-center mt-10">
                <NavLink to="/products">
                    <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
                        View More Products
                    </button>
                </NavLink>
            </div>
        </div>
    )
}

export default Home2;
