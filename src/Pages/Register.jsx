import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  const handleGoogleSignIn = () => {};
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-blue-400 via-black-200 via-blue-300 to-blue-500">
      <div className="w-full max-w-md bg-black bg-opacity-30 bg-blend-screen py-8 px-10 mt-20 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-center">REGISTER</h1>
          </div>
          <div className="mb-6">
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              name="name"
              placeholder="User Name *"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              {...register("name", {
                required: "Name is required",
              })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-6">
            <input
              type="email"
              name="email"
              placeholder="Email ID *"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              {...register("email", {
                required: "Email Address is required",
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password *"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern:
                  /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Minimum 6 character required</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-500">Maximum 20 character required</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-800">
                {" "}
                *At least one uppercase letter, one lowercase letter, one number
                and one special character required.*
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-red-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </form>
        <h2 className="text-lg text-white mt-3 font-semibold">
          Already have an account? Please{" "}
          <Link className="text-lime-300 underline" to="/login">
            Log in
          </Link>{" "}
        </h2>
        <div className="divider divider-warning text-white font-bold">
          **OR**
        </div>
        <div className="text-3xl flex justify-evenly bg-white p-3">
          <button>
            <FaFacebook></FaFacebook>
          </button>
          <button onClick={handleGoogleSignIn}>
            <FaGoogle></FaGoogle>
          </button>
          <button>
            <FaGithub></FaGithub>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
