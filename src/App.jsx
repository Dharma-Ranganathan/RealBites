import "./App.css";
// Loader functions
import {
  bitesLoader,
  getMyBitesLoader,
  singleBiteLoader,
  testimonialLoader,
  setLoggedInTrue,
} from "./store/loaders.js";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Testimonials from "./pages/Testimonials";
import TodayBites from "./pages/TodayBites.jsx";
import BitesLayout from "./layouts/BitesLayout.jsx";
import BiteDetails from "./components/BiteDetails.jsx";
import SignIn from "./pages/SignIn.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import MyBites from "./pages/MyBites.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import Taglines from "./pages/Taglines.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Logout from "./pages/Logout.jsx";
import UpdateBite from "./pages/UpdateBite.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} errorElement={<ErrorPage />} />
      <Route
        path="testimonials"
        element={<Testimonials />}
        loader={testimonialLoader}
        errorElement={<ErrorPage />}
      />
      <Route
        path="today-bites"
        element={<BitesLayout />}
        errorElement={<ErrorPage />}
      >
        <Route
          index
          element={<TodayBites />}
          loader={bitesLoader}
          errorElement={<ErrorPage />}
        />
        <Route
          path=":id"
          element={<BiteDetails />}
          loader={singleBiteLoader}
          errorElement={<ErrorPage />}
        />
      </Route>
      <Route path="sign-in" element={<SignIn />} errorElement={<ErrorPage />} />
      <Route
        path="my-profile"
        element={<MyProfile />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="update-profile"
        element={<UpdateProfile />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="my-bites"
        element={<MyBites />}
        errorElement={<ErrorPage />}
        loader={getMyBitesLoader}
      />
      <Route
        path="taglines"
        element={<Taglines />}
        loader={bitesLoader}
        errorElement={<ErrorPage />}
      />
      <Route path="logout" element={<Logout />} errorElement={<ErrorPage />} />

      <Route
        path="/update-bite"
        element={<UpdateBite />}
        errorElement={<ErrorPage />}
      />

      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
