import { useState, useEffect } from "react";
import axios from "axios";

import { useAuth } from "../context/auth";
import AdCard from "../components/cards/AdCard";

const Home = () => {
  const [auth] = useAuth();

  // state
  const [adsForSell, setAdsForSell] = useState([{}]);
  const [adsForRent, setAdsForRent] = useState([{}]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    const { data } = await axios.get("/api/ads");
    console.log("data", data);
    setAdsForSell(data.adsForSell);
    setAdsForRent(data.adsForRent);
  };

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">ForSell</h1>
      <div className="container">
        <div className="row">
          {adsForSell.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
      <h1 className="display-1 bg-primary text-light p-5">ForRent</h1>
      <div className="container">
        <div className="row">
          {adsForRent.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
