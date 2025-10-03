import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import SaleChart from "../charts/SaleChart";
import { useLazyGetDashboardSalesQuery } from "../../api/orderApi";
import { useEffect } from "react";
import Loader from "../layouts/Loader";
const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const [getDashboardSales, { isLoading, error, data }] =
    useLazyGetDashboardSalesQuery();

  const handleSubmit = () => {
    getDashboardSales({
      startDate: new Date(startDate).toISOString(),
      endDate: endDate.toISOString(),
    });
  };
  useEffect(() => {
    if (error) alert(error?.data?.message);
    if (startDate && endDate && !data) {
      getDashboardSales({
        startDate: new Date(startDate).toISOString(),
        endDate: endDate.toISOString(),
      });
    }
  }, [error]);
  console.log(data);
  if (isLoading) return <Loader />;
  return (
    <AdminLayout>
      <div className="d-flex justify-content-start align-items-center">
        <div className="mb-3 me-4">
          <label className="form-label d-block">Start Date</label>
          <DatePicker
            selected={startDate}
            selectsStart
            onChange={(date) => setStartDate(date)}
            startDate={startDate}
            endDate={endDate}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label d-block">End Date</label>
          <DatePicker
            selected={endDate}
            selectsEnd
            onChange={(date) => setEndDate(date)}
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="form-control"
          />
        </div>
        <button className="btn fetch-btn ms-4 mt-3 px-5" onClick={handleSubmit}>
          Fetch
        </button>
      </div>

      <div className="row pr-4 my-5">
        <div className="col-xl-6 col-sm-12 mb-3">
          <div className="card text-white bg-success o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Sales
                <br />
                <b>${data?.totalSales?.toFixed(2)}</b>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-sm-12 mb-3">
          <div className="card text-white bg-danger o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Orders
                <br />
                <b>{data?.totalOrders}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SaleChart salesData={data?.salesData} />
      <div className="mb-5"></div>
    </AdminLayout>
  );
};

export default Dashboard;
