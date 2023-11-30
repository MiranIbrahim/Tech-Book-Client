import { Link } from "react-router-dom";
import NavLogo from "../assets/Icon/NavLogo.png";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const navItems = (
    <>
      <li>
        <Link className="text-lg font-semibold" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="text-lg font-semibold" to="/products">
          Products
        </Link>
      </li>
      {!user && (
        <li>
          <Link className="text-lg font-semibold" to="/login">
            Login/SignUp
          </Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar fixed z-10 max-w-screen-xl bg-black bg-opacity-30 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <HiMiniBars3CenterLeft className="h-5 w-5" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-black bg-base-100 bg-opacity-20 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <Link to={"/"} className=" w-52 ">
          <img src={NavLogo} alt="" className="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoURL}
                />
              </div>
            </div>
            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content  rounded-box w-52 text-slate-600 bg-base-200">
              <li className="text-center text-blue-600">
                {user.displayName}
              </li>
              <li>
              <Link to='/dashboard/userProfile'>Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogOut} className="">
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
