import React from "react";
import JudgingSheet from "./JudgingSheet";
import { serverClient } from "@/app/_trpc/serverClient";

const Judge = async () => {
  const comp = await serverClient.comp.getParticipantJudge();
  return (
    <main className="">
      <JudgingSheet initialParticipants={comp?.participants!} />
    </main>
  );
};

export default Judge;
