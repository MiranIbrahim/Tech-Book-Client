import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";

import useAxiosSecure from "../../Hooks/UseAxiosSecure";

const ProductReviewQueue = () => {
  const api = "/products/status";
  const key = "products";
  const [products, , refetch] = useProducts({ api, key });
  console.log(products);
  const axiosSecure = useAxiosSecure();

  const handleFeatured = async (item) => {
    const itemFeature = {
      featured: true,
    };
    const res = await axiosSecure.patch(`/products/${item._id}`, itemFeature);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      refetch();
    }
  };

  const handleAccept = async (item) => {
    const itemStatus = {
      status: "accepted",
    };
    const res = await axiosSecure.patch(`/products/${item._id}`, itemStatus);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      refetch();
    }
  };

  const handleReject = async (item) => {
    const itemStatus = {
      status: "rejected",
    };
    const res = await axiosSecure.patch(`/products/${item._id}`, itemStatus);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      refetch();
    }
  };

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold">Product Queue</h2>
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Product Details</th>
              <th>Featured?</th>
              <th>Status</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.productName}</td>
                <td>
                  <Link to={`/productDetails/${item._id}`}>
                    <button className="btn btn-link">Details</button>
                  </Link>
                </td>
                <td>
                  <div className="flex justify-center items-center">
                    {item.featured ? (
                      <>
                        <span className="text-pink-500 font-semibold">
                          featured
                        </span>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleFeatured(item)}
                          className="btn btn-xs"
                        >
                          make featured
                        </button>
                      </>
                    )}
                  </div>
                </td>

                <td>
                  <div className="flex flex-col justify-center items-center">
                    {item.status === "accepted" && (
                      <span className="text-green-600 font-bold">
                        {item.status}
                      </span>
                    )}
                    {item.status === "pending" && (
                      <span className="text-yellow-600 font-bold">
                        {item.status}
                      </span>
                    )}
                    {item.status === "rejected" && (
                      <span className="text-red-600 font-bold">
                        {item.status}
                      </span>
                    )}
                    <button
                      onClick={() => handleAccept(item)}
                      className="btn btn-xs"
                      disabled={item.status === "accepted"}
                    >
                      Accept?
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleReject(item)}
                    className="btn btn-xs btn-error"
                    disabled={item.status === "rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>company</th>
              <th>location</th>
              <th>Last Login</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ProductReviewQueue;
