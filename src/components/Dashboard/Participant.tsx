import React from "react";
import CompAndEventCard from "../CompAndEventCard";
import { serverClient } from "@/app/_trpc/serverClient";

const Participant = async () => {
  const comps = await serverClient.comp.getUserRegisteredComps();

  return (
    <main className="my-10">
      <h1 className="font-bold text-6xl text-center underline">
        Participating In
      </h1>
      <div className="grid grid-cols-3 gap-10 justify-center items-center max-w-[85%] mx-auto">
        {comps.map((comp, i) => (
          <CompAndEventCard
            key={i}
            comp={comp}
            type={"comp"}
            where={"dashboard"}
          />
        ))}
      </div>
    </main>
  );
};

export default Participant;
