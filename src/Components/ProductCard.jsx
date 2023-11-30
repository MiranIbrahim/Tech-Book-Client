import { Link } from "react-router-dom";
import { GrLike } from "react-icons/gr";
import PropTypes from 'prop-types';
const ProductCard = ({ item }) => {
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
      <div className="px-8 pb-2 text-lg flex items-center gap-3">
        <button className="text-lg ">
          <GrLike></GrLike>
        </button>{" "}
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
