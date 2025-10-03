import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import default_avatar from "../../assets/default_avatar.jpg";
const ListReview = ({ reviews }) => {
  return (
    <div className="reviews w-75">
      <h3>Other's Reviews:</h3>
      <hr />
      {reviews?.map((review) => (
        <div className="review-card my-3" key={review?._id}>
          <div className="row">
            <div className="col-1">
              <img
                src={review?.user?.avatar?.url || default_avatar}
                alt="User Name"
                width="50"
                height="50"
                className="rounded-circle"
              />
            </div>
            <div className="col-11">
              <div className="star-ratings">
                <Rating
                  readOnly
                  value={review?.rating}
                  key={review?.rating}
                  style={{ maxWidth: 180 }}
                />
              </div>
              <p className="review_user">by {review?.user?.name}</p>
              <p className="review_comment">{review?.comment}</p>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ListReview;
