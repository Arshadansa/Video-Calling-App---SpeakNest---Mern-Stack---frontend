import React from "react";
import { Route, Routes } from "react-router-dom";

import {
  Friends,
  Login,
  Singup,
  Chat,
  Notification,
  Onboarding,
  Loader,
  Home,
  Header,
  CallPage,
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
          <Route path="/friends" element={<Friends />} />

          <Route path="/notification" element={<Notification />} />
        </Route>
        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute>
              <Header/>
              <Chat />
            </ProtectedRoute>
          }
        />
         <Route
          path="/call/:id"
          element={
            <ProtectedRoute>
              <Header/>
              <CallPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default Search;
