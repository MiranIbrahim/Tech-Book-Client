import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-400 via-black-200 via-blue-300 to-blue-500">
      <div className="w-full max-w-md bg-black bg-opacity-30 bg-blend-screen p-16 rounded-lg">
        <form>
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-center">LOGIN</h1>
          </div>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email ID"
              //   value={email}
              //   onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              // value={password}

              // onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <button
            type="submit"
            // onClick={handleSubmit}
            className="bg-red-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
          >
            LOGIN
          </button>
        </form>
        <h2 className="text-lg text-white mt-3">New to this site? Please <Link className="text-lime-300 underline" to='/register' >Sign Up</Link> </h2>
      </div>
    </div>
  );
};

export default Login;
