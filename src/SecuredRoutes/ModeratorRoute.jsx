import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isModerator, isPending: isLoading } = useQuery({
    queryKey: [user?.email, "isModerator"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/moderator/${user.email}`);
      console.log(res.data);
      return res.data?.admin;
    },
  });
  return [isModerator, isLoading];
};

// eslint-disable-next-line react/prop-types
const ModeratorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isModerator, isLoading] = useAdmin();
  const location = useLocation();
  if (loading || isLoading)
    return <progress className="progress w-56"></progress>;

  if (user && isModerator) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} />;
};

export default ModeratorRoute;
