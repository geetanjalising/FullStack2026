import Home1 from "./Home1";
import Home2 from "./Home2";
import Contact from "../Contact/Contact";
// const Home = () => {
//     return (
//         <>
//             <Home1 />
//             <Home2 />
//         </>
//     )
// }
// export default Home;

const Home = () => {
    return (
        <div className="pt-14"> {/* height of navbar */}
            <Home1 />
            <Home2 />
            <Contact />
        </div>
    )
}
export default Home;
