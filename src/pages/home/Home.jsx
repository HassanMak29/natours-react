import "./Home.css";
import { useQuery } from "react-query";
import Card from "../../components/card/Card";
import Spinner from "../../components/spinner/Spinner";
import { getAllTours } from "../../util/api";
import { useGlobalContext } from "../../context/UserContext";
import { useEffect } from "react";

const Home = () => {
  const { setTours } = useGlobalContext();
  const { isLoading, data: tours } = useQuery({
    queryKey: ["allTours"],
    queryFn: getAllTours,
    cacheTime: 1000 * 60 * 20,
  });

  useEffect(() => {
    setTours(tours);
  }, []);

  return !isLoading ? (
    <main className="main">
      <div className="card-container">
        {tours.map((tour) => (
          <Card key={tour.slug} tour={tour} />
        ))}
      </div>
    </main>
  ) : (
    <Spinner />
  );
};

export default Home;

export const loader = (queryClient) => async () => {
  return (
    queryClient.getQueryData("allTours") ??
    (await queryClient.fetchQuery("allTours", async () => getAllTours()))
  );
};
