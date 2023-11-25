import { HiOutlinePaperAirplane } from "react-icons/hi";

const NotFound = () => {
  return (
    <div>
        <div className="text-center">
      <h1 className="mb-4 text-6xl font-semibold text-red-500 mt-10">404</h1>
      <p className="mb-4 text-lg text-gray-600">
        Oops! Looks like you are lost.
      </p>
      <div className="animate-bounce">
        <HiOutlinePaperAirplane className="mx-auto h-16 w-16 text-red-500"></HiOutlinePaperAirplane>
      </div>
      <p className="mt-4 text-gray-600">
        Lets get you back{" "}
        <a href="/" className="text-blue-500">
          home
        </a>
        .
      </p>
    </div>
    </div>
  );
};

export default NotFound;
