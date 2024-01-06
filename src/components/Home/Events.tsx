import React from "react";
import { serverClient } from "@/app/_trpc/serverClient";
import CardItem from "../CardItem";

const Events = async () => {
  const events = await serverClient.event.get();

  return (
    <section className="my-10">
      <div className="grid grid-cols-3 gap-10 justify-center items-center max-w-[85%] mx-auto">
        {events?.map((event, i) => (
          <CardItem
            key={event.id}
            event={event}
            href={`/event/${event?.slug}`}
            buttonTitle="Know More"
          />
        ))}
      </div>
    </section>
  );
};

export default Events;
