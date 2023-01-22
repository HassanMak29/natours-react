import "./Spinner.css";
import BeatLoader from "react-spinners/BeatLoader";

function Spinner() {
  return (
    <main className="spinner-wrapper">
      <BeatLoader size={50} />
    </main>
  );
}

export default Spinner;
