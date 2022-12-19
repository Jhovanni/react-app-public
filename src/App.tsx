import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import HashRouterDemo from "./components/hash-router/HashRouterDemo";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/hash-router/demo", element: <HashRouterDemo /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
