import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/nav/Sidebar";

const AdCreate = () => {
  // state
  const [sell, setSell] = useState(false);
  const [rent, setRent] = useState(false);

  // hooks
  const navigate = useNavigate();

  // functions
  const handleSell = () => {
    setSell(true);
    setRent(false);
  };
  const handleRent = () => {
    setSell(false);
    setRent(true);
  };

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">AdCreate</h1>
      <Sidebar />

      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "-16%%" }}
      >
        <div className="col-lg-6">
          <button
            onClick={handleSell}
            className="btn btn-primary btn-lg col-12 p-5"
          >
            <span className="h2">Sell</span>
          </button>
          {sell && (
            <div className="my-1">
              <button
                className="btn btn-secondary p-5 col-6"
                onClick={() => navigate("/ad/create/sell/house")}
              >
                House
              </button>
              <button
                className="btn btn-secondary p-5 col-6"
                onClick={() => navigate("/ad/create/sell/land")}
              >
                Land
              </button>
            </div>
          )}
        </div>
        <div className="col-lg-6">
          <button
            onClick={handleRent}
            className="btn btn-primary btn-lg col-12 p-5"
          >
            <span className="h2">Rent</span>
          </button>
          {rent && (
            <div className="my-1">
              <button
                className="btn btn-secondary p-5 col-6"
                onClick={() => navigate("/ad/create/rent/house")}
              >
                House
              </button>
              <button
                className="btn btn-secondary p-5 col-6"
                onClick={() => navigate("/ad/create/rent/land")}
              >
                Land
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdCreate;
