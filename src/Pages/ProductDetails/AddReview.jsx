import { useContext } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import LoadingCircle from "../../Components/LoadingCircle";
import Swal from "sweetalert2";
import { IoIosSend } from "react-icons/io";

import { AuthContext } from "../../Providers/AuthProvider";

const AddReview = ({ id }) => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  console.log(id);

  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, reset } = useForm();

  if (loading) {
    return <LoadingCircle></LoadingCircle>;
  }
  const onSubmit = async (data) => {
    console.log(data);

    const reviewItem = {
      user_name: user.displayName,
      user_image: user.photoURL,
      product_id: id,
      review: data.review,
      rating: parseInt(data.rating),
    };
    const reviewRes = await axiosSecure.post("/reviews", reviewItem);
    console.log(reviewRes.data);
    if (reviewRes.data.insertedId) {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Your Review has been posted`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="max-w-full w-11/12 mx-auto mt-10">
      <h2 className="text-3xl text-center font-semibold">
        ----------------Give a Review----------------
      </h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Review */}
          <div className="form-control w-full my-6">
            <div className="flex items-center gap-4">
              <img
                src={user.photoURL}
                className="w-12 h-12 rounded-full mb-3 "
                alt=""
              />
              <p className="uppercase font-bold">{user.displayName}</p>
            </div>
            <label className="label">
              <span className="label-text">Share your review</span>
            </label>
            <textarea
              {...register("review")}
              className="textarea textarea-bordered h-24"
              placeholder="Details"
              required
            ></textarea>
          </div>
          <div className="flex items-center gap-4">
            <div className=" font-bold text-lg bg-yellow-400 px-6 rounded">
              <span>Give a rating: </span>
              <select
                type="number"
                {...register("rating", { type: "number" })}
                className=" px-6 py-3  bg-yellow-400  rounded-lg"
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn bg-orange-500 font-bold text-lg"
            >
              send <IoIosSend className="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddReview.propTypes = {
  id: PropTypes.string.isRequired, 
};

export default AddReview;
