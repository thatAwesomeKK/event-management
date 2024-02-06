import React from "react";
import JudgingSheet from "./JudgingSheet";
import { serverClient } from "@/app/_trpc/serverClient";

const Judge = async () => {
  const comp = await serverClient.comp.getParticipantJudge();
  return (
    <main className="">
      <h1 className="text-center font-bold text-5xl mb-10 mt-5">Judge {comp?.title}</h1>
      <JudgingSheet initialParticipants={comp?.participants!} />
    </main>
  );
};

export default Judge;
