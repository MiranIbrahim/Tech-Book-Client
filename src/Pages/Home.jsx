import Banner from "../Components/Banner";
import FeaturedProducts from "../Components/FeaturedProducts";
import TrendingProducts from "../Components/TrendingProducts";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
        </div>
    );
};

export default Home;