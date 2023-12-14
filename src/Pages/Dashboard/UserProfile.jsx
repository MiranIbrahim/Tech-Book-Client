import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { MdOutlineVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingCircle from "../../Components/LoadingCircle";

const UserProfile = () => {
  const [isSubscribed, setIsSubscribed] = useState(true);
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  if (loading) {
    return <LoadingCircle></LoadingCircle>;
  }
  
  axiosSecure.get(`/users/${user?.email}`)
  .then(res => {
    // console.log(res.data.role);
    if(res.data.role==='unsubscribed'){
      setIsSubscribed(false);
    }
  })
  console.log(isSubscribed)
  return (
    <div>
      <h2 className="text-3xl text-center font-semibold">My Profile</h2>
      <div className="p-5 flex">
        <div>
          <div>
            <img
              className="w-32 h-32 rounded-full"
              src={user.photoURL}
              alt=""
            />
          </div>
          <p>Name : {user.displayName}</p>
          <p>Email ID : {user.email}</p>
        </div>
        <div>
          {isSubscribed ? (
            <div className="badge badge-primary badge-outline">
              <MdOutlineVerified />
              Verified
            </div>
          ) : (
            <>
              <Link to='/dashboard/payment'>
                <button className="btn btn-primary">
                  pay $20 to subscribe{" "}
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
