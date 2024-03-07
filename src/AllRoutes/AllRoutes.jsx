import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateLayout from "../Layout/PrivateLayout";
import Cart from "../Pages/Cart";
import Confirmation from "../Pages/Confirmation";
import Payment from "../Pages/Payment";

function AllRoutes({orderDetails, merchantMetadata}) {
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
      </Routes>
    </div>
  );
}

export default AllRoutes;
