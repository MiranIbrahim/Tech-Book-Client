import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import NotFound from "../Pages/NotFound";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Statistics from "../Pages/Dashboard/Statistics";
import ManageCoupons from "../Pages/Dashboard/ManageCoupons";
import ProductReviewQueue from "../Pages/Dashboard/ProductReviewQueue";
import ReportedContents from "../Pages/Dashboard/ReportedContents";
import UserProfile from "../Pages/Dashboard/UserProfile";
import AddProduct from "../Pages/Dashboard/AddProduct";
import MyProducts from "../Pages/Dashboard/MyProducts";
import UpdateProducts from "../Pages/Dashboard/UpdateProducts";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import AdminRoute from "../SecuredRoutes/AdminRoute";
import ModeratorRoute from "../SecuredRoutes/ModeratorRoute";
import Payment from "../Pages/Dashboard/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetails></ProductDetails>,
        loader: ({ params }) =>
          fetch(`https://tech-book-server-iota.vercel.app/products/${params.id}`),
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      //   Admin routes
      {
        path: "/dashboard/statistics",
        element: (
          <AdminRoute>
            <Statistics></Statistics>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageCoupons",
        element: (
          <AdminRoute>
            <ManageCoupons></ManageCoupons>
          </AdminRoute>
        ),
      },
      // Moderator routes
      {
        path: "/dashboard/productReviewQueue",
        element: (
          <ModeratorRoute>
            <ProductReviewQueue></ProductReviewQueue>,
          </ModeratorRoute>
        ),
      },
      {
        path: "/dashboard/reportedContents",
        element: (
          <ModeratorRoute>
            <ReportedContents></ReportedContents>,
          </ModeratorRoute>
        ),
      },
      // User Routes
      {
        path: "/dashboard/userProfile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/dashboard/addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/myProduct",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "/dashboard/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/updateProduct/:id",
        element: <UpdateProducts></UpdateProducts>,
        loader: ({ params }) =>
          fetch(`https://tech-book-server-iota.vercel.app/products/${params.id}`),
      },
    ],
  },
]);
