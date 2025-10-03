import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import { useUploadAvatarMutation } from "../../api/userApi";
import { useSelector } from "react-redux";
import default_avatar from "../../assets/default_avatar.jpg";
const UploadAvatar = () => {
  const { user } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user.avatar?.url : default_avatar
  );
  const navigate = useNavigate();
  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();
  useEffect(() => {
    if (isSuccess) navigate("/me/profile");
  }, [isSuccess, error]);
  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      avatar,
    };

    uploadAvatar(userData);
  };
  const handleOnChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState == 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Upload Avatar</h2>

            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <figure className="avatar item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="image"
                    />
                  </figure>
                </div>
                <div className="input-foam">
                  <label className="form-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    className="form-control"
                    id="customFile"
                    accept="images/*"
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Uploading ..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UploadAvatar;
