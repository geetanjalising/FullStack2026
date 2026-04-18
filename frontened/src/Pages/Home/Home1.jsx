// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import { Autoplay } from "swiper/modules";
// import pic from '../../assets/images/cart.jpg';
// import pic1 from '../../assets/images/Cartoon.png';
// import pic2 from '../../assets/images/discount.jpg';
// import pic3 from '../../assets/images/efashion.jpg';
// import pic4 from '../../assets/images/cart.jpg';

// const Home1 = () => {
//     return (
//         <Swiper style={{ height: "400px" }} modules={[Autoplay]}
//             autoplay={{ delay: 2000 }}
//         >
//             <SwiperSlide>
//                 <img src={pic} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <img src={pic1} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <img src={pic2} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <img src={pic3} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <img src={pic4} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//             </SwiperSlide>
//         </Swiper>
//     )
// }
// export default Home1;


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import pic from '../../assets/images/cart.jpg';
import pic1 from '../../assets/images/Cartoon.png';
import pic2 from '../../assets/images/discount.jpg';
import pic3 from '../../assets/images/efashion.jpg';

const Home1 = () => {
    return (
        <div className="w-full">
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 2500 }}
                loop={true}
                className="h-[220px] sm:h-[300px] md:h-[420px]"
            >
                {[pic, pic1, pic2, pic3].map((img, i) => (
                    <SwiperSlide key={i}>
                        <img
                            src={img}
                            className="w-full h-full object-cover"
                            alt="banner"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Home1;
