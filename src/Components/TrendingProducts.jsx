import { Link } from "react-router-dom";
import useProducts from "../Hooks/useProducts";
import ProductCard from "./ProductCard";

const TrendingProducts = () => {
  const api = "/trending-products";
  const key = "trending-products";
  const [products] = useProducts({ api, key });
  const trendingProducts = products.filter(
    (item) => item.status === "accepted" && item.featured == true
  );
  console.log(trendingProducts);
  return (
    <div className="my-10">
      <h2 className="my-10 text-3xl text-center ">Trending Products</h2>
      <div className="md:grid grid-cols-4 gap-4">
        {trendingProducts.map((item) => (
          <ProductCard key={item._id} item={item}></ProductCard>
        ))}
      </div>
      <div className="my-5 flex justify-center">
        <Link to="/products">
          <button className="btn btn-primary"> Show All Products</button>
        </Link>
      </div>
    </div>
  );
};

export default TrendingProducts;
