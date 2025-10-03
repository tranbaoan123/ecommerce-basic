import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import { useUpdatePasswordMutation } from "../../api/userApi";

const UpdatePassword = () => {
  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) navigate("/me/profile");
  }, [isSuccess, error]);
  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      oldPassword,
      newPassword,
    };

    updatePassword(userData);
  };
  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Update Password</h2>
            <div className="mb-3">
              <label htmlFor="old_password_field" className="form-label">
                Old Password
              </label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="new_password_field" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn w-100"
              disabled={isLoading}
            >
              {isLoading ? "Updating ..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdatePassword;
