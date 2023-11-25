import CompAndEventCard from "../CompAndEventCard";
import { serverClient } from "@/app/_trpc/serverClient";
import CompsSection from "./CompsSection";

const Events = async () => {
  const events = await serverClient.event.getAdminEvents();

  return (
    <section className="my-10 flex flex-col md:flex-row justify-center items-center max-w-[85vw] mx-auto">
      <div className="flex-1 flex justify-center items-center gap-5 overflow-y-scroll overflow-hidden scrollbar-hide">
        {events?.map((event, i) => (
          <CompAndEventCard
            key={event.id}
            event={event}
            where="dashboard"
            edit={true}
          />
        ))}
      </div>
      <div className="flex-1 flex justify-center items-center gap-5 overflow-y-scroll overflow-hidden scrollbar-hide">
        <CompsSection />
      </div>
    </section>
  );
};

export default Events;
