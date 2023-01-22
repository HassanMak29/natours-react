import { useRouteError } from "react-router-dom";
import NavBar from "../../components/navigation/NavBar";
import "./Error.css";

const Error = () => {
  const error = useRouteError();

  return (
    <>
      <NavBar />
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </>
  );
};

export default Error;
