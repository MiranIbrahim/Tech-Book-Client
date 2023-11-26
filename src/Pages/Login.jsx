import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
const Login = () => {
  const {signIn} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password).then((res) => {
      const user = res.user;
      console.log(user);
      Swal.fire({
        title: "Login Successful",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      navigate(from, { replace: true });
    });
  };
  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-400 via-black-200 via-blue-300 to-blue-500">
      <div className="w-full max-w-md bg-black bg-opacity-30 bg-blend-screen p-16 rounded-lg">
      <form onSubmit={handleLogin}>
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-center">LOG IN</h1>
          </div>
          <div className="mb-6">
            <input
              type="email"
              name="email"
              placeholder="Email ID *"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password *"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </form>
        <h2 className="text-lg text-white mt-3 font-semibold">New to this site? Please <Link className="text-lime-300 underline" to='/register' >Sign Up</Link> </h2>
      </div>
    </div>
  );
};

export default Login;
