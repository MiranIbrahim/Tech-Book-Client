import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const ReportedContents = () => {
  const api = "/reports";
  const key = "reports";
  const [reports, , refetch] = useProducts({ api, key });
  console.log(reports);
  const axiosSecure = useAxiosSecure();
  const handleDelete = (item) => {
    Swal.fire({
        title: `Are you sure want to delete ${item.product_name}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/reports/moderator/${item.product_id}`).then((res) => {
            console.log(res.data);
            
            if (res.data.productResult.deletedCount > 0 && res.data.reportResult.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: `${item.product_name} has been deleted.`,
                icon: "success",
              });
              refetch();
            }
          });
        }
      });
  }
  return (
    <div>
      <h2 className="text-3xl text-center font-semibold">Reported Products</h2>
      <div className="overflow-x-auto">
        <table className="table table-md text-center">
          <thead className="">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Product Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.product_name}</td>
                <td>
                  <Link to={`/productDetails/${item.product_id}`}>
                    <button className="btn btn-link">Details</button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Product Details</th>
              <th>Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ReportedContents;
