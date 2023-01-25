import "./Home.css";
import { useQuery } from "react-query";
import Card from "../../components/card/Card";
import Spinner from "../../components/spinner/Spinner";
import { getAllTours } from "../../util/api";

const Home = () => {
  const { isLoading, data: tours } = useQuery({
    queryKey: ["allTours"],
    queryFn: getAllTours,
    cacheTime: 1000 * 60 * 20,
  });

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
