import Actions from "../pages/Actions";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Sensors from "../pages/Sensors";

export const routes = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/sensors",
    component: Sensors,
  },
  {
    path: "/actions",
    component: Actions,
  },
  {
    path: "/profile",
    component: Profile,
  },
];