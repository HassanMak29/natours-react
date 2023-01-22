import "./Home.css";
import { getAllTours } from "../../util/api";
import { useLoaderData } from "react-router-dom";
import Card from "../../components/card/Card";

const Home = () => {
  const tours = useLoaderData();

  return (
    <main className="main">
      <div className="card-container">
        {tours.map((tour) => (
          <Card key={tour.slug} tour={tour} />
        ))}
      </div>
    </main>
  );
};

export default Home;

export const loader = () => {
  return getAllTours();
};
