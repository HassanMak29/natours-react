import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import { ContextProvider } from "./context/UserContext";
import Bookings from "./pages/bookings/Bookings";
import ErrorPage from "./pages/error/Error";
import Home, { loader as allToursLoader } from "./pages/home/Home";
import Login, { action as loginAction } from "./pages/login/Login";
import Account from "./pages/myAccount/Account";
import Register, { action as registerAction } from "./pages/register/Register";
import RootLayout from "./pages/rootLayout/RootLayout";
import TourDetails from "./pages/tourDetails/TourDetails";
import Reviews from "./pages/reviews/Reviews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: allToursLoader,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "tour",
        children: [
          {
            path: ":slug-:tourId",
            element: <TourDetails />,
          },
        ],
      },
      {
        path: "/user/account",
        element: (
          <ProtectedRoute backTo="/">
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/bookings",
        element: (
          <ProtectedRoute backTo="/">
            <Bookings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/reviews",
        element: (
          <ProtectedRoute backTo="/">
            <Reviews />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ContextProvider>
  );
}

export default App;
