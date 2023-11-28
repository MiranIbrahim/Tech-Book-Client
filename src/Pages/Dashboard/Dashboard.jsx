import { FaBoxOpen, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import { NavLink, Outlet } from "react-router-dom";

import { FaFolderPlus } from "react-icons/fa6";
import { MdOutlineReviews } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { IoStatsChart } from "react-icons/io5";
import { RiCoupon3Line } from "react-icons/ri";
import useProducts from "../../Hooks/useProducts";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import LoadingCircle from "../../Components/LoadingCircle";




const Dashboard = () => {
  const { user } = useContext(AuthContext);
  if(!user){
    return (<LoadingCircle></LoadingCircle>);
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dbUser] = useProducts({
      api: `/users/${user?.email}`,
      key: 'userRole',
    });
  console.log(dbUser.role);
  const role = 'moderator';
  // const role = dbUser.role;

  return (
    <div className="flex flex-col md:flex-row">
      {/* dashboard side bar */}
      <div className="w-full md:w-1/4 md:min-h-screen bg-blue-300 font-semibold">
        <ul className="menu p-4 text-lg">
          {/* ------------------User routes ----------------- */}
          {(role === 'subscribed' || role === 'unsubscribed') && (
            <>
              <li className="">
                <NavLink to="/dashboard/userProfile">
                  <FaUser></FaUser>
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addProduct">
                  <FaFolderPlus></FaFolderPlus>
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myProduct">
                  <FaBoxOpen></FaBoxOpen>
                  My product
                </NavLink>
              </li>
            </>
          )}


          {/* ------------------Admin routes ----------------- */}
          {role === 'admin' && (
            <>
              <li className="">
                <NavLink to="/dashboard/statistics">
                  <IoStatsChart />
                  Statistics
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageUsers">
                  <FaUsers />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageCoupons">
                  <RiCoupon3Line />
                  Manage Coupons
                </NavLink>
              </li>
            </>
          )}


          {/* ------------------Moderator routes ----------------- */}
          {role === 'moderator' && (
            <>
              <li className="">
                <NavLink to="/dashboard/productReviewQueue">
                  <MdOutlineReviews />
                  Product Queue
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reportedContents">
                  <TbReport />
                  Reported Contents
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">
              <FiMenu></FiMenu>
              All Products
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1  ml-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
