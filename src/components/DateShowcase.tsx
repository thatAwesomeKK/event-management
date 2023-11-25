"use client";
import { cn } from "@/lib/utils";
import React from "react";
import ReactDatePicker from "react-datepicker";

interface PageProps {
  date: Date | string;
  className?: string;
}

function DateShowcase({ date, className }: PageProps) {
  return (
    <ReactDatePicker
      className={cn("bg-transparent flex text-center", className)}
      dateFormat="dd-MM-yyyy"
      selected={new Date(date)}
      onChange={(e) => console.log(e)}
      placeholderText="This is readOnly"
      readOnly
    />
  );
}

export default DateShowcase;
