import { useForm } from "react-hook-form";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaUpload } from "react-icons/fa";
import LoadingCircle from "../../Components/LoadingCircle";
import Swal from "sweetalert2";
import CouponCard from "./CouponCard";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { loading } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  //   axiosSecure.get("/coupons").then((res) => {
  //     console.log(res.data);
  //     setCoupons(res.data);
  //   });

  const fetchCoupons = useCallback(async () => {
    try {
      const res = await axiosSecure.get("/coupons");
      console.log(res.data);
      setCoupons(res.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  }, [axiosSecure]);
  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  if (loading) {
    return <LoadingCircle></LoadingCircle>;
  }

  const onSubmit = async (data) => {
    const couponItem = {
      couponCode: data.couponCode,
      expiryDate: data.expiryDate,
      description: data.description,
      discountAmount: data.discountAmount,
    };
    const couponRes = await axiosSecure.post("/coupons", couponItem);
    console.log(couponRes.data);
    if (couponRes.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Coupon added Successfully.`,
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      fetchCoupons();
    }
  };
  return (
    <div className="max-w-full w-11/12 mx-auto">
      <h2 className="text-3xl text-center font-semibold">Add Coupon</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3 mt-5">
            {/* product name */}
            <div className="form-control mb-2 ">
              <label className="label">
                <span className="label-text">Coupon Code*</span>
              </label>
              <input
                type="text"
                placeholder="Code?"
                {...register("couponCode", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Description */}
            <div className="form-control mb-2 ">
              <label className="label">
                <span className="label-text">Description*</span>
              </label>
              <input
                type="text"
                placeholder="Description?"
                {...register("description", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
            {/* Expiration */}
            <div className="form-control mb-2 ">
              <label className="label">
                <span className="label-text">Expiry Date*</span>
              </label>
              <input
                type="date"
                placeholder="Expire date?"
                {...register("expiryDate", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
            {/* Discount Amount */}
            <div className="form-control mb-2 ">
              <label className="label">
                <span className="label-text">Discount Amount*</span>
              </label>
              <input
                type="number"
                placeholder="Discount?"
                {...register("discountAmount", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <button type="submit" className="btn">
            Add Coupon <FaUpload className="ml-4" />
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-3xl mt-10 text-center font-semibold">---------------All Coupons----------------</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">{coupons.map(item => <CouponCard key={item._id} item={item} ></CouponCard> )}</div>
      </div>
    </div>
  );
};

export default ManageCoupons;
