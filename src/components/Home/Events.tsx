import React from "react";
import CompAndEventCard from "../CompAndEventCard";
import { serverClient } from "@/app/_trpc/serverClient";

const Events = async () => {
  const events = await serverClient.event.get();
  
  return (
    <section className="my-10">
      <div className="grid grid-cols-3 gap-10 justify-center items-center max-w-[85%] mx-auto">
        {events?.map((event, i) => (
          <CompAndEventCard key={event.id} info={event} type={"event"} />
        ))}
      </div>
    </section>
  );
};

export default Events;
