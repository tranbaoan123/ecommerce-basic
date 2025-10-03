import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helpers";
import { PRODUCT_CATEGORIES } from "../../constants/constants";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
const Filters = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();

  const handleClickCheckbox = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name);
    checkboxes.forEach((item) => {
      if (item.value !== checkbox.value) item.checked = false;
    });
    if (checkbox.checked === false) {
      //  Delete filter params
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    } else {
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value);
      } else {
        searchParams.append(checkbox.name, checkbox.value);
      }
      const path = window.location.pathname + "?" + searchParams.toString();
      navigate(path);
    }
  };
  const handleDefaultCheck = (checkboxType, checkboxValue) => {
    const value = searchParams.get(checkboxType);
    return value === checkboxValue;
  };
  const handleButtonClick = (e) => {
    e.preventDefault();
    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };
  useEffect(() => {
    if (searchParams.has("min")) setMin(searchParams.get("min"));
    if (searchParams.has("max")) setMin(searchParams.get("max"));
  }, []);
  return (
    <div className="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading mb-3">Price</h5>
      <form id="filter_form" className="px-2" onSubmit={handleButtonClick}>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min ($)"
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max ($)"
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              GO
            </button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Category</h5>
      {PRODUCT_CATEGORIES.map((category, index) => (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            id="check4"
            value={category}
            defaultChecked={handleDefaultCheck("category", category)}
            onChange={(e) => handleClickCheckbox(e.target)}
          />
          <label className="form-check-label" htmlFor="check4">
            {category}
          </label>
        </div>
      ))}

      <hr />
      <h5 className="mb-3">Ratings</h5>

      {[5, 4, 3, 2, 1].map((rating) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="ratings"
            id="check7"
            value={rating}
            defaultChecked={handleDefaultCheck("ratings", rating.toString())}
            onChange={(e) => handleClickCheckbox(e.target)}
          />
          <label className="form-check-label" htmlFor="check7">
            <Rating
              readOnly
              value={rating}
              key={rating}
              style={{ maxWidth: 90 }}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default Filters;
