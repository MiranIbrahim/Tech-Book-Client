import { GrLike } from "react-icons/gr";
import { useLoaderData } from "react-router-dom";
import { FaFlag } from "react-icons/fa";
import { useContext, useState } from "react";

import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AddReview from "./AddReview";
import { FacebookShareButton, FacebookIcon , WhatsappShareButton, WhatsappIcon } from "react-share";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const product = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [presentVote, setPresentVote] = useState(product.upvoteCount);

  // ---------------for report-------------------
  const { data: report = [], refetch: reportRefetch } = useQuery({
    queryKey: ["reports", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reports/${product._id}`);
      return res.data;
    },
  });
  const reportedEmail = report?.user_emails?.includes(user?.email);

  const handleReport = async (id, name) => {
    const reportItem = {
      product_id: id,
      product_name: name,
      user_email: user.email,
    };
    const result = await axiosSecure.post("/reports", reportItem);
    // console.log(result.data);
    if (result.data.insertedId > 0 || result.data.modifiedCount > 0) {
      toast("Reported !", {
        icon: <FaFlag></FaFlag>,
      });
      reportRefetch();
    }
  };

  // ---------------for UpVote-------------------

  const { data: like = [], refetch: likeRefetch } = useQuery({
    queryKey: ["like", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/likes/${product._id}`);
      return res.data;
    },
  });

  const likedEmail = like?.user_emails?.includes(user?.email);
  // console.log(likedEmail)
  const handleUpVote = async (id) => {
    const voteItem = {
      product_id: id,
      user_email: user?.email,
    };
    const result = await axiosSecure.post("/likes", voteItem);
    console.log("prodRes", result.data.productResult);
    console.log("likeRes", result.data.likeResult);
    if (
      result.data.productResult.modifiedCount > 0 ||
      result.data.likeResult?.insertedId > 0 ||
      result.data.likeResult?.modifiedCount > 0
    ) {
      console.log("age");
      setPresentVote(presentVote + 1);
      console.log("moddhe");
      likeRefetch();
      console.log("pore");
    }
  };

  return (
    <div className="py-10">
      <h2 className="my-10 text-3xl text-center ">Product Details</h2>
      <div className="flex">
        <div className="flex-1 ">
          <img src={product.image} alt="" />
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="my-4 text-xl text-orange-600 font-semibold">
            {product.productName}
          </h2>
          <p>
            {product.tags.map((tag, index) => (
              <div
                key={index}
                className="badge badge-secondary badge-outline mr-2"
              >
                {tag}
              </div>
            ))}
          </p>
          <p>
            {product.externalLinks.map((externalLink, index) => (
              <div key={index} className="badge badge-outline">
                <a
                  className="hover:text-blue-500"
                  target="#"
                  href={`${externalLink}`}
                >
                  {externalLink}
                </a>
              </div>
            ))}
          </p>
          <p className="font-bold">Details: {product.description}</p>

          <div className="pb-2 text-lg flex items-center gap-3">
            <button
              onClick={() => handleUpVote(product._id)}
              className={`btn btn-sm text-blue-600 font-extrabold
              ${(likedEmail || !user) && "disabled"}
              `}
              disabled={likedEmail || !user}
            >
              <GrLike></GrLike>
            </button>{" "}
            <p>{presentVote} </p>
          </div>
          <div>
            <button
              onClick={() => handleReport(product._id, product.productName)}
              className={`btn btn-sm btn-warning 
              ${(reportedEmail || !user) && "disabled"}`}
              disabled={reportedEmail || !user}
            >
              Report <FaFlag></FaFlag>
            </button>
          </div>
          <div className="flex gap-5 items-center">
            <p>Share on Facebook </p>
            <FacebookShareButton
              url={`https://quirky-liquid.surge.sh/productDetails/${product._id}`}
              quote={`Share ${product.productName}`}
              hashtag="#TechBook"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton
              url={`https://quirky-liquid.surge.sh/productDetails/${product._id}`}
              quote={`Share ${product.productName}`}
              hashtag="#TechBook"
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </div>
      </div>
      {/* <ReviewSlider id = {product._id}></ReviewSlider> */}
      <AddReview id={product._id}></AddReview>
    </div>
  );
};

export default ProductDetails;
