
import Banner from "../Components/Banner";
import Coupons from "../Components/Coupons";
import FeaturedProducts from "../Components/FeaturedProducts";
import TrendingProducts from "../Components/TrendingProducts";



const Home = () => {
    
    return (
        <div>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <Coupons></Coupons>

        </div>
    );
};

export default Home;