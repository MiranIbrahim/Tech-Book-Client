import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";

import { AuthContext } from "../../Providers/AuthProvider";
import { useContext, useState } from "react";
import { FaUpload } from "react-icons/fa";
const image_api_key = import.meta.env.VITE_IMAGE_BB_API_KEY;
const image_bb_api_url = `https://api.imgbb.com/1/upload?key=${image_api_key}`;

const UpdateProducts = () => {
  const product = useLoaderData();
  const { _id, productName, description, tags, externalLinks,  } =
    product;
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { loading } = useContext(AuthContext);

  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, reset } = useForm();
  const [selectedTags, setSelectedTags] = useState(tags);
  const [selectedLinks, setSelectedLinks] = useState(externalLinks);
  if (loading) {
    return <progress className="progress w-56"></progress>;
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
      };
      const productRes = await axiosSecure.patch(
        `/products/${_id}`,
        productItem
      );
      console.log(productRes.data);
      if (productRes.data.modifiedCount) {
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
          {/* product name */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Product Name*</span>
            </label>
            <input
              type="text"
              defaultValue={productName}
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
              defaultValue={description}
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
              defaultValue={tags}
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
            defaultValue={externalLinks}
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
            Add Product <FaUpload className="ml-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProducts;
