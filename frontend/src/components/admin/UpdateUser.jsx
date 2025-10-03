import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserDetailQuery,
  useUpdateUserAdminMutation,
} from "../../api/userApi";

const UpdateUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { data, isLoading } = useGetUserDetailQuery(params?.id);
  const [updateUserAdmin, { isLoading: isUpdateLoading, isSuccess }] =
    useUpdateUserAdminMutation();
  const user = data?.data;
  const submitHandler = (e) => {
    e.preventDefault();
    const updateData = {
      name,
      email,
      role,
    };
    updateUserAdmin({ id: params?.id, body: updateData });
  };
  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setRole(user?.role);
  }, [isLoading]);
  useEffect(() => {
    if (isSuccess) navigate("/admin/users");
  }, [isSuccess]);
  return (
    <AdminLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h2 className="mb-4">Update User</h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Name
              </label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="role_field" className="form-label">
                Role
              </label>
              <select
                id="role_field"
                className="form-select"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn update-btn w-100 py-2"
              disabled={isUpdateLoading}
            >
              {isUpdateLoading ? "Updating ..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateUser;
