import { createBrowserRouter } from "react-router-dom";
// import Layout from "./components/partials/Layout";
import Home from "./pages/Home";
import Boost from "./pages/Boost";
import Leaderboard from "./pages/Leaderboard";
import Earn from "./pages/Earn";
import Friends from "./pages/Friends";
import Missions from "./pages/Missions";
import Wallet from "./pages/Wallet";
import Market from "./pages/Market";
import Exchange from "./pages/Exchange";
import { UpdateProfile } from "./pages/UpdateProfile";
// import SplashScreen from "./components/partials/SplashScreen";
// import OnBoarding from "./components/onBoarding/onBoarding.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,

    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "mine",
        element: <Market />,
      },
      {
        path: "setting",
        element: <UpdateProfile />,
      },
      {
        path: "exchange",
        element: <Exchange />,
      },
      {
        path: "boost",
        element: <Boost />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "friends",
        element: <Friends />,
      },
      {
        path: "earn",
        element: <Earn />,
      },
      {
        path: "missions",
        element: <Missions />,
      },
      {
        path: "wallet",
        element: <Wallet />,
      },
    ],
  },
]);

export default router;
