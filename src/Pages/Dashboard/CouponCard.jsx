import { useAdmin } from "../../SecuredRoutes/AdminRoute";

const CouponCard = ({ item }) => {
  const [isAdmin] = useAdmin();

  return (
    <div className="card card-compact border text-base">
      <div className="card-body">
        <h2 className="card-title text-red-600">{item.couponCode}</h2>
        <div className="">
          <p> <span className="font-bold text-blue-600">Expire:</span> {item.expiryDate}</p>
          <p> <span className="font-bold text-blue-600">Discount:</span> {item.discountAmount}</p>
          <p> <span className="font-bold text-blue-600">Description:</span> {item.description}</p>
        </div>
        <div className="card-actions justify-end">
          {isAdmin && <button className="btn">Delete</button>}
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
