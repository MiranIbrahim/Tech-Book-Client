import { useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";


import { AuthContext } from "../../Providers/AuthProvider";
import { useContext, useState } from "react";
import { FaUpload } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingCircle from "../../Components/LoadingCircle";
const image_api_key = import.meta.env.VITE_IMAGE_BB_API_KEY;
const image_bb_api_url = `https://api.imgbb.com/1/upload?key=${image_api_key}`;

const AddProduct = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, reset } = useForm();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLinks, setSelectedLinks] = useState([]);
  if (loading) {
    return <LoadingCircle></LoadingCircle>;
  }
  const onSubmit = async (formData) => {
    const data = {
      ...formData,
      tags: selectedTags,
      links: selectedLinks,
    };
    console.log(data);

    const imageFile = {
      image: data.image[0],
    };
    const res = await axiosPublic.post(image_bb_api_url, imageFile, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });

    console.log(res.data);
    if (res.data.success) {
      const productItem = {
        productName: data.productName,
        image: res.data.data.display_url,
        description: data.description,
        tags: data.tags,
        externalLinks: data.links,
        timestamp: new Date().toISOString(),
        status: "pending",
        owner_email: data.email,
        user_name: data.user_name,
        user_photo: data.user_image,
        upvoteCount: 0,
        featured: false,
      };
      const productRes = await axiosSecure.post("/products", productItem);
      console.log(productRes.data);
      if (productRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.productName} is added to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="max-w-full w-11/12 mx-auto">
      <h2 className="text-3xl text-center font-semibold">Add Products</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 sm:flex-row">
            {/* user email */}
            <div className="form-control w-full my-6 sm:w-1/3">
              <label className="label">
                <span className="label-text">Eamil*</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="input input-bordered w-full"
                value={user.email}
                readOnly
              />
            </div>
            {/* user name */}
            <div className="form-control w-full my-6 sm:w-1/3">
              <label className="label">
                <span className="label-text">Name*</span>
              </label>
              <input
                type="text"
                placeholder="name"
                {...register("user_name")}
                className="input input-bordered w-full"
                value={user.displayName}
                readOnly
              />
            </div>
            {/* user image */}
            <div className="form-control w-full my-6 sm:w-1/3">
              <label className="label">
                <span className="label-text">Image*</span>
              </label>
              <div className="flex gap-2">
                <div>
                  <img
                    src={user.photoURL}
                    className="w-12 h-12 rounded-lg mb-3"
                    alt=""
                  />
                </div>
                <input
                  type="text"
                  placeholder="photoURL"
                  {...register("user_image")}
                  className="input input-bordered w-full"
                  value={user.photoURL}
                  readOnly
                />
              </div>
            </div>
          </div>
          {/* product name */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Product Name*</span>
            </label>
            <input
              type="text"
              placeholder="Product Name"
              {...register("productName", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Description */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Description*</span>
            </label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered h-24"
              placeholder="Details"
              required
            ></textarea>
          </div>

          {/* tags */}

          <div>
            <h1>Add Tags</h1>
            <TagsInput
              value={selectedTags}
              onChange={setSelectedTags}
              placeHolder="enter tags"
            />
            <em>press enter to add new tag</em>
            <pre className="mb-2">
              <input
                type="text"
                placeholder="tags"
                {...register("tags")}
                className="input input-bordered w-full hidden"
                value={selectedTags.map((tag) => tag.text).join(", ")}
                readOnly
              />
            </pre>
          </div>
          {/* External links input */}
          <div className="mt-10">
            <h1>Add External Links</h1>
            <TagsInput
              value={selectedLinks}
              onChange={setSelectedLinks}
              placeHolder="enter Links"
            />
            <em>press enter to add new tag</em>
            <pre className="mb-2">
              <input
                type="text"
                placeholder="Links"
                {...register("links")}
                className="input input-bordered w-full hidden"
                value={selectedLinks.map((link) => link.text).join(", ")}
                readOnly
              />
            </pre>
          </div>
          {/* image input */}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button type="submit" className="btn">
            Add Product <FaUpload className="ml-4"/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

// {
//   "couponCode": "SAVE20",
//   "expiryDate": "2023-12-31",
//   "description": "Save 20% on your purchase",
//   "discountAmount": 20
// },