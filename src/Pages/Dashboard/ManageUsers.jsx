import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import useProducts from "../../Hooks/useProducts";

import LoadingCircle from "../../Components/LoadingCircle";

// probirghosh.ph@gmail.com

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const api = "/users";
  const key = "users";
  const [users, loading, refetch] = useProducts({ api, key });
  console.log(users);

  const handleRole = (user, role) => {
    console.log(user.name, role);
    Swal.fire({
      title: `Are you sure want to make ${role} ${user.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Make ${role}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const userRole = {
          role,
        };
        const res = await axiosSecure.patch(`/users/${user._id}`, userRole);
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: `${role} Created`,
            text: `${user.name} is ${role} now.`,
            icon: "success",
          });
          refetch();
        }
      }
    });
  };
  if (loading) {
    return <LoadingCircle></LoadingCircle>;
  }

  return (
    <div>
      <div className="ml-5">
        <h2 className="text-3xl">Total users: {users.length}</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra-zebra w-full">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, index) => (
                <tr key={user._id} className="text-center">
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" && (
                      <span className="text-red-600 font-bold">Admin</span>
                    )}
                    {user.role === "moderator" && (
                      <span className="text-yellow-600 font-bold">
                        Moderator
                      </span>
                    )}
                    {user.role === "unsubscribed" && (
                      <span className="text-blue-400 font-bold">
                        Unsubscribed
                      </span>
                    )}
                    {user.role === "subscribed" && (
                      <span className="text-green-600 font-bold">
                        Subscribed
                      </span>
                    )}
                  </td>
                  <td className="grid lg:grid-cols-2 gap-2">
                    <button
                      onClick={() => handleRole(user, "admin")}
                      className="btn btn-xs px-8 bg-red-600 text-white"
                      disabled={user.role === 'admin'}
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => handleRole(user, "moderator")}
                      className="btn btn-xs px-8 bg-yellow-600 text-white"
                      disabled={user.role === 'moderator'}
                    >
                      Moderator
                    </button>
                    <button
                      onClick={() => handleRole(user, "subscribed")}
                      className="btn btn-xs px-8 text-white bg-green-600"
                      disabled={user.role === 'subscribed'}
                    >
                      Subscribed
                    </button>
                    <button
                      onClick={() => handleRole(user, "unsubscribed")}
                      className="btn btn-xs px-8 text-white bg-blue-500"
                      disabled={user.role === 'unsubscribed'}
                    >
                      Unsubscribed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
