import { GrLike } from "react-icons/gr";
import { useLoaderData } from "react-router-dom";
import { FaFlag } from "react-icons/fa";
import { useContext, useState } from "react";

import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
    // console.log("prodRes", result.data.productResult);
    // console.log("likeRes", result.data.likeResult);
    if (
      result.data.productResult &&
      result.data.productResult.modifiedCount > 0 &&
      (result.data.likeResult?.insertedId > 0 ||
        result.data.likeResult?.modifiedCount > 0)
    ) {
      setPresentVote(presentVote + 1);
      likeRefetch();
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
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

{
  /* <Swiper
  navigation={true}
  modules={[Navigation]}
  className="mySwiper text-center max-w-6xl space-y-7"
>
  {reviews.map((review) => (
    <SwiperSlide className="space-y-7" key={review._id}>
      <div className="flex flex-col items-center">
        <Rating
          className=""
          style={{ maxWidth: 180 }}
          value={review.rating}
          readOnly
        />
      </div>
      <figure className="flex flex-col items-center">
        <svg
          width="100"
          height="86"
          viewBox="0 0 100 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M34.615 39.1542L21.1533 39.1542C19.5506 39.1542 18.1881 38.5935 17.0662 37.4716C15.9449 36.3497 15.3835 34.9876 15.3835 33.3845V31.4623C15.3835 27.2152 16.8862 23.5897 19.8914 20.5846C22.8963 17.5805 26.5225 16.0778 30.7691 16.0778H34.615C35.6565 16.0778 36.5576 15.697 37.3191 14.9361C38.0803 14.1747 38.4608 13.2736 38.4608 12.2319V4.53889C38.4608 3.49738 38.0801 2.59543 37.3191 1.83408C36.5578 1.07379 35.6567 0.692383 34.615 0.692383L30.7691 0.692383C26.602 0.692383 22.6265 1.50446 18.84 3.12628C15.0539 4.74917 11.7791 6.9429 9.01428 9.70769C6.2497 12.4712 4.0566 15.7462 2.43393 19.5328C0.811258 23.3188 -0.000183105 27.2954 -0.000183105 31.4621L-0.000183105 73.7688C-0.000183105 76.9756 1.1211 79.6985 3.36472 81.9429C5.60854 84.1861 8.33355 85.3076 11.5385 85.3076H34.6164C37.8212 85.3076 40.5453 84.1861 42.7894 81.9429C45.0326 79.6985 46.1545 76.9756 46.1545 73.7688V50.6929C46.1545 47.4867 45.0326 44.7638 42.7879 42.5191C40.5449 40.2762 37.8197 39.1542 34.615 39.1542Z"
            fill="#151515"
          />
          <path
            d="M96.6366 42.5191C94.3936 40.2762 91.6692 39.1542 88.4637 39.1542L75.0022 39.1542C73.4004 39.1542 72.0366 38.5935 70.9166 37.4716C69.7942 36.3497 69.2339 34.9876 69.2339 33.3845V31.4623C69.2339 27.2152 70.7366 23.5897 73.7403 20.5846C76.7442 17.5805 80.3701 16.0778 84.6189 16.0778H88.4639C89.5056 16.0778 90.4074 15.697 91.1683 14.9361C91.9288 14.1747 92.3108 13.2736 92.3108 12.2319V4.53889C92.3108 3.49738 91.929 2.59543 91.1683 1.83408C90.4076 1.07379 89.5058 0.692383 88.4639 0.692383L84.6189 0.692383C80.4495 0.692383 76.4748 1.50446 72.6872 3.12628C68.9018 4.74917 65.628 6.9429 62.8632 9.70769C60.0984 12.4712 57.9043 15.7462 56.2822 19.5328C54.66 23.3188 53.8475 27.2954 53.8475 31.4621V73.7688C53.8475 76.9756 54.9698 79.6985 57.2128 81.9429C59.456 84.1861 62.1804 85.3076 65.3857 85.3076H88.4624C91.668 85.3076 94.3921 84.1861 96.6351 81.9429C98.8798 79.6985 99.9998 76.9756 99.9998 73.7688V50.6929C100 47.4865 98.8798 44.7638 96.6366 42.5191Z"
            fill="#151515"
          />
        </svg>
      </figure>
      <p className="max-w-4xl mx-auto">{review.details}</p>
      <h3 className="text-2xl text-yellow-600">{review.name}</h3>
    </SwiperSlide>
  ))}
</Swiper>; */
}

// // for like
// const likeApi = `/likes/${product._id}`;
// const likeKey = "like";
// const [like, , refetch] = useProducts({ likeApi, likeKey });
// console.log(like);
// const likedEmail = like?.user_emails?.includes(user?.email);
// console.log(likedEmail);

// const handleUpVote = async (id) => {
//   const voteItem = {
//     product_id: id,
//     user_email: user?.email,
//   };
//   const result = await axiosSecure.post("/likes", voteItem);
//   console.log(result.data);

//   if (
//     result.data.productResult &&
//     result.data.productResult.modifiedCount > 0 &&
//     (result.data.likeResult?.insertedId > 0 ||
//       result.data.likeResult?.modifiedCount > 0)
//   ) {
//     refetch();
//   }
// };
