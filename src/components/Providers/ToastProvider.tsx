"use client";
import React, { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default ToastProvider;
