import { Link } from "react-router-dom";
import useProducts from "../Hooks/useProducts";
import { GrLike } from "react-icons/gr";

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
          <div key={item._id} className="card bg-base-100 border">
            <figure className="px-10 pt-10">
              <img src={item.image} alt="" className="rounded-xl" />
            </figure>
            <div className="card-body">
              <Link to={`/productDetails/${item._id}`}>
                <h2 className="card-title hover:underline">
                  {item.productName}
                </h2>
              </Link>
              <div>
                Tags:{" "}
                {item.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="badge badge-secondary badge-outline mr-2"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="px-8 pb-2 text-lg flex items-center gap-3">
              <button className="text-lg ">
                <GrLike></GrLike>
              </button>{" "}
              <p>{item.upvoteCount} </p>
            </div>
          </div>
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
