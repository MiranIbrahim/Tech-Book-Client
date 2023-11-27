import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { MdOutlineVerified } from "react-icons/md";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const isSubscribed = false;
  return (
    <div className="p-5 flex">
      <div>
        <div>
          <img className="w-32 h-32 rounded-full" src={user.photoURL} alt="" />
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
            <button className="btn btn-primary">pay $20 to subscribe </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
