import { Link } from "react-router-dom";
import { GrLike } from "react-icons/gr";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
const ProductCard = ({ item }) => {
  const {user} = useContext(AuthContext);
  return (
    <div key={item._id} className="card bg-base-100 border">
      <figure className="px-10 pt-10">
        <img src={item.image} alt="" className="rounded-xl" />
      </figure>
      <div className="card-body">
        <Link to={`/productDetails/${item._id}`}>
          <h2 className="card-title hover:underline">{item.productName}</h2>
        </Link>
        <div>
          Tags:{" "}
          {item.tags?.map((tag, index) => (
            <div
              key={index}
              className="badge badge-secondary badge-outline mr-2"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <small className="text-xs ps-3 text-blue-600">Click to visit product details page and then like it.</small>
      <div className="px-8 pb-2 text-sm flex items-center gap-3">
        
      <Link to={`/productDetails/${item._id}`}>
        <button 
        disabled={!user}
        className="text-lg btn btn-sm text-blue-600 ">
          <GrLike></GrLike>
        </button>{" "}
        </Link>
        <p>{item.upvoteCount} </p>
      </div>
    </div>
  );
};
ProductCard.propTypes = {
    item: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
      upvoteCount: PropTypes.number.isRequired,
      
    }).isRequired,
  };
export default ProductCard;
