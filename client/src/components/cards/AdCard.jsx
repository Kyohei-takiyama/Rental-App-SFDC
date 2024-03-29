import React from "react";
import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { BiArea } from "react-icons/bi";
import { Badge } from "antd";

const AdCard = ({ ad }) => {
  const formatNumber = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="col-lg-4 p-4 gx-4 gy-4">
      <Badge.Ribbon
        text={`${ad.type} for ${ad.action}`}
        color={ad.action === "Sell" ? "blue" : "red"}
      >
        <div className="card hoverable shadow">
          <img
            src={ad?.photos[0].Location}
            alt={`${ad.type}-${ad.address}-${ad.action}-${ad.price}`}
            style={{ height: "250px", objectFit: "cover" }}
          />

          <div className="card-body">
            <div>
              <h3>¥{formatNumber(ad.price)}</h3>
              <p className="card-text">{ad.address}</p>
            </div>
            <p className="card-text d-flex justify-content-between">
              {ad.bedrooms ? (
                <span>
                  <IoBedOutline /> {ad.bedrooms}
                </span>
              ) : (
                ""
              )}
              {ad.bedrooms ? (
                <span>
                  <TbBath /> {ad.bathrooms}
                </span>
              ) : (
                ""
              )}
              {ad.landsize ? (
                <span>
                  <BiArea /> {ad.landsize}
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
      </Badge.Ribbon>
    </div>
  );
};

export default AdCard;
