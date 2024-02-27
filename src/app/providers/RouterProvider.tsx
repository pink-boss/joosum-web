import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import Root from "@/pages/root";
import SignIn from "@/pages/sign-in";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);

const RouterProvider = () => <ReactRouterProvider router={router} />;

export default RouterProvider;
