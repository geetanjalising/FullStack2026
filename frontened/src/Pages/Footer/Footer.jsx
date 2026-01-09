
import { FaInstagram, FaFacebookSquare, FaTwitter, FaYoutube } from "react-icons/fa"
const Footer = () => {
    const year = new Date().getFullYear();
    //console.log(year);
    return (
        <footer>
            <div className='color-white'>
                <div className='flex bg-[rgb(54,52,62)] justify-evenly w-full pt-[min(50px,10%)] [&_p]:text-[13px]'>
                    <div className='mt-[20px]'>
                        <h4>GET TO KNOW US</h4>
                        <p>About Us</p>
                        <p>Careers</p>
                        <p>Press Releases</p>
                        <p>Services & Cares</p>
                        <br /><br />
                        <h4>ONLINE SHOPPING</h4>
                        <p>Men</p>
                        <p>Women</p>
                        <p>Kids</p>
                        <p>Home & Living</p>
                        <p>Gift Cards</p>
                        <br /><br />
                        <h4>MAKE MONEY WITH US</h4>
                        <p>Blog</p>
                        <p>Careers</p>
                        <p>Site MAp</p>
                        <p>Corporate Information</p>
                        <p>White Hat</p>
                    </div>


                    <div className='mt-[20px]'>
                        <h4>CUSTOMER POLICIES</h4>
                        <p>Contact Us</p>
                        <p>FAQ</p>
                        <p>T&C</p>
                        <p>Terms Of Use</p>
                        <p>Track Orders</p>
                        <p>Shipping</p>
                        <p>Cancellation</p>
                        <p>Returns</p>
                        <p>Privacy policy</p>
                        <p>Grievience Officer</p>
                    </div>
                    <div className='mt-[20px]'>
                        <h4>Registered Office Address</h4>
                        <p>Buildings Alyssa,</p>
                        <p>Begonia and Clover situated in Embassy Tech Village,</p>
                        <p>Outer Ring Road,</p>
                        <p>Devarabeesanahalli Village,</p>
                        <p>Varthur Hobli,</p>
                        <p>Bengaluru – 560103, India</p>
                        <br /><br />
                        <h4>KEEP IN TOUCH</h4>
                        <FaFacebookSquare style={{ height: "40px", width: "40px", margin: "5px", padding: "5px" }} />
                        <FaYoutube style={{ height: "40px", width: "40px", margin: "5px", padding: "5px" }} />
                        <FaTwitter style={{ height: "40px", width: "40px", margin: "5px", padding: "5px" }} />
                        <FaInstagram style={{ height: "40px", width: "40px", margin: "5px", padding: "5px" }} />
                    </div>
                </div>
                <div className='w-full bg-black text-white px-[15%] tracking-[0.3px]'>

                    <p>Conditions of Use & Sale &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  Privacy Notice  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Interest-Based Ads  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  © 1996-{year}, Amazon.com, Inc. or its affiliates &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Press Releases</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
