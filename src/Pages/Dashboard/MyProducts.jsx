import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import useProducts from "../../Hooks/useProducts";
import Swal from "sweetalert2";

const MyProducts = () => {
  const { user, loading } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const api = "/products";
  const key = "products";
  const [products, , refetch] = useProducts({ api, key });
  if (loading) {
    return <progress className="progress w-56"></progress>;
  }
  const myProducts = products.filter((item) => item.owner_email === user.email);

  const handleDelete = (item) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.delete(`/products/${item._id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${item.productName} has been deleted`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      });
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="table table-lg">
        <thead className="text-center">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Number of Votes</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="text-right">
          {myProducts.map((item,index)=><tr key={item._id}>
            <th>{index+1}</th>
            <td>{item.productName}</td>
            <td>{item.status}</td>
            <td>{item.upvoteCount}</td>
            <td>
                <button className="btn btn-info">Update</button>
            </td>
            <td>
            <button onClick={()=>handleDelete(item)} className="btn btn-warning">Delete</button>
            </td>
          </tr>)}
        </tbody>
        <tfoot>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Number of Votes</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MyProducts;
