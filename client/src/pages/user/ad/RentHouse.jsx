import React from "react";
import AdForm from "../../../components/forms/AdForm";
import Sidebar from "../../../components/nav/Sidebar";

const RentHouse = () => {
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">RentHouse</h1>
      <Sidebar />
      <div className="container mt-2">
        <AdForm action="Rent" type="House" />
      </div>
    </div>
  );
};

export default RentHouse;
