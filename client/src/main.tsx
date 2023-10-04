import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App";
import { Toaster } from "./components/ui/toaster";
import { UserContextProvider } from "./context/UserContext";
import "./index.css";
import Chat from "./routes/Chat";
import Login from "./routes/Login";
import Register from "./routes/Register";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Register />,
		// errorElement: <ErrorPage />,
		// loader: rootLoader,
		// action: rootAction,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/chat",
		element: <Chat />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<UserContextProvider>
			<RouterProvider router={router} />
			<Toaster />
		</UserContextProvider>
	</React.StrictMode>
);
