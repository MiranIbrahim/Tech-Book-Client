
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./UseAxiosPublic";

const useProducts = ({ api, key }) => {

  const axiosPublic = useAxiosPublic();
  const {
    data: products = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axiosPublic.get(api);
      return res.data;
    },
  });
  return [products, loading, refetch];
};

export default useProducts;
