import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Videos from "./pages/Videos";
import Root from "./pages/Root";
import VideosDetail from "./pages/VideosDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "videos", element: <Videos /> },
      { path: "videos/:id", element: <VideosDetail /> },
    ],
  },
  // {
  //   path: "videos",
  //   element: <Videos />,
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
