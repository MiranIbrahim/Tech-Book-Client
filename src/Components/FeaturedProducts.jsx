import useProducts from "../Hooks/useProducts";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const api = "/products";
  const key = "products";
  const [products] = useProducts({ api, key });
  const featuredProducts = products.filter(
    (item) => item.status === "accepted" && item.featured == true
  );
  console.log(featuredProducts);
  return (
    <div className="my-10">
      <h2 className="my-10 text-3xl text-center ">Featured Products</h2>
      <div className="md:grid grid-cols-4 gap-4">
        {featuredProducts.map((item) => (
          <ProductCard key={item._id} item={item}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
