import Image from "next/image";
import React, { FC } from "react";

interface Props {}

const Hero = () => {
  return (
    <section
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)",
      }}
      className="relative overflow-x-hidden"
    >
      <div className="absolute z-10 bottom-20 left-8 flex flex-col justify-start items-start space-y-5">
        <h1 className=" text-white font-bold text-8xl">
          Organize Events with Ez!
        </h1>
        <button className="border border-blue-500 bg-blue-500 text-white font-semibold text-2xl py-2 px-3 rounded-lg hover:bg-blue-400 hover:scale-105 transition-all ease-in-out duration-100">
          Learn More
        </button>
      </div>
      <div className="relative w-[100vw] h-[70vh] blur-sm">
        <Image
          className="object-cover"
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="bg"
          fill
        />
      </div>
    </section>
  );
};

export default Hero;
