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

export const RouterProvider = () => <ReactRouterProvider router={router} />;
