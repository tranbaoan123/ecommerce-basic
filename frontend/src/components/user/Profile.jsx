import { useSelector } from "react-redux";
import default_avatar from "../../assets/default_avatar.jpg";
import UserLayout from "../layouts/UserLayout";
const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <UserLayout>
      <div className="row justify-content-around mt-5 user-info">
        <div className="col-12 col-md-3">
          <figure className="avatar avatar-profile">
            <img
              className="rounded-circle img-fluid"
              src={user?.avatar?.url || default_avatar}
              alt="user avatar"
            />
          </figure>
        </div>

        <div className="col-12 col-md-5">
          <h4>Full Name</h4>
          <p>{user?.name}</p>

          <h4>Email Address</h4>
          <p>{user?.email}</p>

          <h4>Joined On</h4>
          <p>{user?.createdAt.substring(0, 10)}</p>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
