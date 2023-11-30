import useProducts from "../Hooks/useProducts";
import ProductCard from "../Components/ProductCard";

const Products = () => {
  const api = "/products";
  const key = "products";
  // eslint-disable-next-line no-unused-vars
  const [products, loading, refetch] = useProducts({ api, key });
  const acceptedProducts = products.filter(
    (item) => item.status === "accepted"
  );

  return (
    <div className="py-10">
      <h2 className="my-10 text-3xl text-center ">All Products</h2>

      <div className="md:grid grid-cols-4 gap-4">
        {acceptedProducts.map((item) => (
          <ProductCard key={item._id} item={item}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Products;
