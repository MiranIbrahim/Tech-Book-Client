import PropTypes from "prop-types";
import useAdmin from "../../Hooks/useAdmin";

const CouponCard = ({ item, handleDelete }) => {
  const [isAdmin] = useAdmin();

  return (
    <div className="card card-compact border text-base">
      <div className="card-body">
        <h2 className="text-3xl text-red-600">{item.couponCode}</h2>
        <div className="">
          <p>
            {" "}
            <span className="font-bold text-blue-600">Expire:</span>{" "}
            {item.expiryDate}
          </p>
          <p>
            {" "}
            <span className="font-bold text-blue-600">Discount:</span>{" "}
            {item.discountAmount}
          </p>
          <p>
            {" "}
            <span className="font-bold text-blue-600">Description:</span>{" "}
            {item.description}
          </p>
        </div>
        <div className="card-actions justify-end">
          {isAdmin && (
            <button
              onClick={() => handleDelete(item._id)}
              className="btn btn-warning"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CouponCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    couponCode: PropTypes.string.isRequired,
    expiryDate: PropTypes.string.isRequired,
    discountAmount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default CouponCard;
