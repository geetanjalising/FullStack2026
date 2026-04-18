
// import { FaInstagram, FaFacebookSquare, FaTwitter, FaYoutube } from "react-icons/fa"
// const Footer = () => {
//     const year = new Date().getFullYear();
//     //console.log(year);
//     return (
//         <footer>
//             <div className='color-white'>
//                 <div className='flex bg-[rgb(54,52,62)] justify-evenly w-full pt-[min(50px,10%)] [&_p]:text-[13px]'>
//                     <div className='mt-[20px]'>
//                         <h4>GET TO KNOW US</h4>
//                         <p>About Us</p>
//                         <p>Careers</p>
//                         <p>Press Releases</p>
//                         <p>Services & Cares</p>
//                         <br /><br />
//                         <h4>ONLINE SHOPPING</h4>
//                         <p>Men</p>
//                         <p>Women</p>
//                         <p>Kids</p>
//                         <p>Home & Living</p>
//                         <p>Gift Cards</p>
//                         <br /><br />
//                         <h4>MAKE MONEY WITH US</h4>
//                         <p>Blog</p>
//                         <p>Careers</p>
//                         <p>Site MAp</p>
//                         <p>Corporate Information</p>
//                         <p>White Hat</p>
//                     </div>


//                     <div className='mt-[20px]'>
//                         <h4>CUSTOMER POLICIES</h4>
//                         <p>Contact Us</p>
//                         <p>FAQ</p>
//                         <p>T&C</p>
//                         <p>Terms Of Use</p>
//                         <p>Track Orders</p>
//                         <p>Shipping</p>
//                         <p>Cancellation</p>
//                         <p>Returns</p>
//                         <p>Privacy policy</p>
//                         <p>Grievience Officer</p>
//                     </div>
//                     <div className='mt-[20px]'>
//                         <h4>Registered Office Address</h4>
//                         <p>Buildings Alyssa,</p>
//                         <p>Begonia and Clover situated in Embassy Tech Village,</p>
//                         <p>Outer Ring Road,</p>
//                         <p>Devarabeesanahalli Village,</p>
//                         <p>Varthur Hobli,</p>
//                         <p>Bengaluru – 560103, India</p>
//                         <br /><br />
//                         <h4>KEEP IN TOUCH</h4>
//                         <FaFacebookSquare style={{ height: "40px", width: "40px", margin: "5px", padding: "5px" }} />
//                         <FaYoutube style={{ height: "40px", width: "40px", margin: "5px", padding: "5px" }} />
//                         <FaTwitter style={{ height: "40px", width: "40px", margin: "5px", padding: "5px" }} />
//                         <FaInstagram style={{ height: "40px", width: "40px", margin: "5px", padding: "5px" }} />
//                     </div>
//                 </div>
//                 <div className='w-full bg-black text-white px-[15%] tracking-[0.3px]'>

//                     <p>Conditions of Use & Sale &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  Privacy Notice  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Interest-Based Ads  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  © 1996-{year}, Amazon.com, Inc. or its affiliates &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Press Releases</p>
//                 </div>
//             </div>
//         </footer>
//     )
// }

// export default Footer

import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#36343E] text-gray-300 mt-16">

            {/* Top Footer */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">

                {/* Column 1 */}
                <div>
                    <h4 className="text-white font-semibold mb-4">GET TO KNOW US</h4>
                    <ul className="space-y-2">
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Press Releases</li>
                        <li>Services & Cares</li>
                    </ul>

                    <h4 className="text-white font-semibold mt-6 mb-4">ONLINE SHOPPING</h4>
                    <ul className="space-y-2">
                        <li>Men</li>
                        <li>Women</li>
                        <li>Kids</li>
                        <li>Home & Living</li>
                        <li>Gift Cards</li>
                    </ul>
                </div>

                {/* Column 2 */}
                <div>
                    <h4 className="text-white font-semibold mb-4">CUSTOMER POLICIES</h4>
                    <ul className="space-y-2">
                        <li>Contact Us</li>
                        <li>FAQ</li>
                        <li>T&C</li>
                        <li>Terms Of Use</li>
                        <li>Track Orders</li>
                        <li>Shipping</li>
                        <li>Cancellation</li>
                        <li>Returns</li>
                        <li>Privacy Policy</li>
                        <li>Grievance Officer</li>
                    </ul>
                </div>

                {/* Column 3 */}
                <div>
                    <h4 className="text-white font-semibold mb-4">MAKE MONEY WITH US</h4>
                    <ul className="space-y-2">
                        <li>Blog</li>
                        <li>Careers</li>
                        <li>Site Map</li>
                        <li>Corporate Information</li>
                        <li>White Hat</li>
                    </ul>
                </div>

                {/* Column 4 */}
                <div>
                    <h4 className="text-white font-semibold mb-4">
                        Registered Office Address
                    </h4>
                    <p className="leading-6 text-gray-400">
                        Buildings Alyssa,<br />
                        Begonia and Clover situated in Embassy Tech Village,<br />
                        Outer Ring Road,<br />
                        Devarabeesanahalli Village,<br />
                        Varthur Hobli,<br />
                        Bengaluru – 560103, India
                    </p>

                    <h4 className="text-white font-semibold mt-6 mb-4">
                        KEEP IN TOUCH
                    </h4>

                    <div className="flex gap-4 text-xl">
                        <FaFacebookF className="hover:text-white cursor-pointer" />
                        <FaYoutube className="hover:text-white cursor-pointer" />
                        <FaTwitter className="hover:text-white cursor-pointer" />
                        <FaInstagram className="hover:text-white cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-black text-gray-400 text-xs py-4 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 md:gap-6 justify-center md:justify-between text-center md:text-left">
                    <span>Conditions of Use & Sale</span>
                    <span>Privacy Notice</span>
                    <span>Interest-Based Ads</span>
                    <span>© 1996–{year}, Amazon.com, Inc. or its affiliates</span>
                    <span>Press Releases</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
