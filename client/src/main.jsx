import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import App from './App.jsx'
import Body from './components/Body.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import Error from './components/Error.jsx';
import { AuthProvider } from './context/authContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

let appRouter = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: ()=><ProtectedRoute Component={Body}/> },
      { path: "signin", Component: SignIn }, 
      { path: "signup", Component: SignUp },
    ],
    errorElement: <Error />,
  }
]);

const root = createRoot(document.getElementById('root'));

root.render(<AuthProvider><RouterProvider router={appRouter} /></AuthProvider>);
