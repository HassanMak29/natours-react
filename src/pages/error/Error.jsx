import { memo, useEffect } from "react";
import { useRouteError } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navigation/NavBar";
import "./Error.css";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <NavBar />
      <div id="error-page" className="main">
        <h1>Oops!</h1>
        {error.status !== 404 && (
          <p className="error-standard-messsage">
            Sorry, an unexpected error has occurred.
          </p>
        )}
        <p className="error">
          {error.message
            ? error.message
            : `${error.status} ${error.statusText}`}
        </p>
      </div>
      <Footer />
    </>
  );
};

export default memo(Error);
