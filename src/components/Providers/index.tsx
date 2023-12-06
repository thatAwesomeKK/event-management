"use client";
import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "./ToastProvider";
import TRPCProvider from "./TRPCProvider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ToastProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TRPCProvider>
          <SessionProvider>{children}</SessionProvider>
        </TRPCProvider>
      </ThemeProvider>
    </ToastProvider>
  );
};

export default Providers;
