import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../layouts/Loader";
import {
  useDeleteUserAdminMutation,
  useGetUsersAdminQuery,
} from "../../api/userApi";
const ListUsers = () => {
  const { data, isLoading, error } = useGetUsersAdminQuery();
  const users = data?.data;
  const [deleteUserAdmin, { isLoading: isDeleteLoading }] =
    useDeleteUserAdminMutation();
  const handleDeleteUser = (id) => {
    deleteUserAdmin(id);
  };
  if (isLoading) return <Loader />;
  return (
    <AdminLayout>
      <div>
        <h1 className="my-5">Users List</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user?._id}>
                <th scope="row">{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary"
                    to={`/admin/user/${user?._id}`}
                  >
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <button
                    className="btn btn-outline-danger ms-2"
                    disabled={isLoading || isDeleteLoading}
                    onClick={() => handleDeleteUser(user?._id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ListUsers;
