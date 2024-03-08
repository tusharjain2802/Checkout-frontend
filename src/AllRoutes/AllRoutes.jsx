import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateLayout from "../Layout/PrivateLayout";
import Cart from "../Pages/Cart";
import Confirmation from "../Pages/Confirmation";
import Payment from "../Pages/Payment";
import Pending from "../Pages/Pending";
import Failed from "../Pages/Failed";

function AllRoutes({ orderDetails, merchantMetadata }) {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateLayout>
              <Cart />
            </PrivateLayout>
          }
        />

        <Route
          path="/payment"
          element={
            <PrivateLayout>
              <Payment />
            </PrivateLayout>
          }
        />

        <Route
          path="/confirmation"
          element={
            <PrivateLayout>
              <Confirmation />
            </PrivateLayout>
          }
        />
        <Route
          path="/pending"
          element={
            <PrivateLayout>
              <Pending />
            </PrivateLayout>
          }
        />
        <Route
          path="/failed"
          element={
            <PrivateLayout>
              <Failed />
            </PrivateLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default AllRoutes;
