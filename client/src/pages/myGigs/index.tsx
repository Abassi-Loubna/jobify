import { useContext } from "react";
import AuthContext from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "../../components/card";
import { IGig } from "../../types";

interface ApiResponse {
  gigs: IGig[];
}

const Mygigs: React.FC = () => {
  const { user } = useContext(AuthContext);

  const { isLoading, error, refetch, data } = useQuery<ApiResponse>({
    queryKey: ["my-gigs", user?._id],
    queryFn: async () => {
      const res = await api.get("/gigs", {
        params: { userID: user?._id },
      });
      return res.data;
    },
    enabled: !!user?._id,
    retry: 1,
  });

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#020617]">
      <h1 className="text-2xl md:text-3xl text-white font-bold mb-6 px-2 md:px-6">
        My Gigs
      </h1>

      <div className="px-2 md:px-6">
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        )}

        {error && (
          <div className="my-10">
            <Error error={error} refetch={refetch} />
          </div>
        )}

        {!isLoading && !error && (
          <>
            {data?.gigs && data.gigs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                {data.gigs.map((gig: IGig) => (
                  <Card key={gig._id} item={gig} expand />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg sm:text-xl">
                  You haven't created any gigs yet.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Mygigs;