import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import LoadingCircle from "../Components/LoadingCircle";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const useModerator = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isModerator, isLoading } = useQuery({
    queryKey: [user?.email, "isModerator"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/moderator/${user.email}`);
        console.log(res.data);
        return res.data?.moderator;
      }
    },
  });
  return [isModerator, isLoading];
};

// eslint-disable-next-line react/prop-types
const ModeratorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isModerator, isLoading] = useModerator();
  const location = useLocation();
  if (loading || isLoading) return <LoadingCircle></LoadingCircle>;

  if (user && isModerator) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} />;
};

export default ModeratorRoute;
