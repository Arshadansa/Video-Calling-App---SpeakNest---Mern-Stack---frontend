import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Call,
  Login,
  Singup,
  Chat,
  Notification,
  Homepage,
  Onboarding,
} from "./ui";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthRoute from "./ui/AuthRoute";
import ProtectedRoute from "./ui/PrptectedRoutes";

function Search() {
  return (
    <>
      <ToastContainer position="top-right" />
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Singup />
            </AuthRoute>
          }
        />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/call"
          element={
            <ProtectedRoute>
              <Call />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notification"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default Search;
