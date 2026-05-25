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
  Loader,
  Home,
} from "./ui";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthRoute from "./ui/AuthRoute";
import ProtectedRoute from "./ui/PrptectedRoutes";

import { useCurrentUser } from "./hooks/CurrentUser";


function Search() {
  const { isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" />

      <Routes>

        {/* Public Routes */}
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

        {/* Protected Layout Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/call" element={<Call />} />
          <Route path="/notification" element={<Notification />} />
        </Route>

      </Routes>
    </>
  );
}

export default Search;