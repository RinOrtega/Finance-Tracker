import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom/dist"

import "./index.css"

import App from "./App.jsx"
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Error from "./pages/Error.jsx";
import Tracker from "./pages/Tracker.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: "/login",
        element: <Login />
      }, {
        path: "/signup",
        element: <Signup />
      }, {
        path: "/me",
        element: <Profile />
      }, {
        path: "/tracker",
        element: <Tracker />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
