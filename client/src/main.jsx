import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Body from "./components/Body.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Error from "./components/Error.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Application from "./components/Application.jsx";
import Jobs from "./components/Jobs.jsx";

let appRouter = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: ProtectedRoute,
        children: [
          { index: true, Component: Body },
          { path: "applications", Component: Application },
          { path: "jobs", Component: Jobs },
        ],
      },
      { path: "signin", Component: SignIn },
      { path: "signup", Component: SignUp },
    ],
    errorElement: <Error />,
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <RouterProvider router={appRouter} />
  </AuthProvider>
);
