import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingCircle from "../Components/LoadingCircle";

const useModerator = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isModerator, isPending: isLoading } = useQuery({
    queryKey: [user?.email, "isModerator"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/moderator/${user.email}`);
      console.log(res.data);
      return res.data?.moderator;
    },
  });
  return [isModerator, isLoading];
};

// eslint-disable-next-line react/prop-types
const ModeratorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isModerator, isLoading] = useModerator();
  const location = useLocation();
  if (loading || isLoading)
    return <LoadingCircle></LoadingCircle>;

  if (user && isModerator) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} />;
};

export default ModeratorRoute;
