import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DetailTodo from "../pages/Detail_todo";
import Homepage from "../pages/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/detail/:id_task",
    element: <DetailTodo />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
