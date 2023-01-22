import { Outlet, useNavigation } from "react-router-dom";
import "./RootLayout.css";

import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navigation/NavBar";
import Spinner from "../../components/spinner/Spinner";

const RootLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <NavBar />
      {navigation.state === "loading" ? <Spinner /> : <Outlet />}
      <Footer />
    </>
  );
};

export default RootLayout;
