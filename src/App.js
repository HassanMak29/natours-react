import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
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
import ManageReviews from "./pages/manageReviews/ManageReviews";
import ManageUsers from "./pages/manageUsers/ManageUsers";
import ManageBookings from "./pages/manageBookings/ManageBookings";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: allToursLoader(queryClient),
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
          <ProtectedRoute backTo="/" forUser>
            <Reviews />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reviews",
        element: (
          <ProtectedRoute backTo="/" forAdmin>
            <ManageReviews />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute backTo="/" forAdmin>
            <ManageUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: "/bookings",
        element: (
          <ProtectedRoute backTo="/" forAdmin>
            <ManageBookings />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
