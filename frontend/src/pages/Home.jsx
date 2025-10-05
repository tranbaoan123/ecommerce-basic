import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../api/productApi";
import Loader from "../components/layouts/Loader";
import ProductItem from "../components/product/ProductItem";
import Filters from "../components/layouts/Filters";
import Pagination from "../components/layouts/Pagination";
import { useState } from "react";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");
  const params = { keyword };
  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);
  params.page = page;

  const { data, isLoading } = useGetProductsQuery(params);
  console.log(params);

  if (isLoading) <Loader />;
  const columnSize = keyword ? 4 : 3;
  return (
    <div className="container">
      <div className="row">
        {keyword && (
          <div className="col-6 col-md-3 mt-5">
            <Filters />
          </div>
        )}
        <div
          className={keyword ? "col-6 col-md-9" : "col-12 col-sm-6 col-md-12"}
        >
          <h1 id="products_heading" className="text-secondary">
            {keyword
              ? `${data?.data.length} products found with keyword "${keyword}"`
              : "Latest Products"}
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {/* Product  */}
              {data?.data.map((product) => (
                <ProductItem
                  product={product}
                  key={product._id}
                  columnSize={columnSize}
                />
              ))}
            </div>
            <Pagination records={data?.records} page={page} setPage={setPage} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
