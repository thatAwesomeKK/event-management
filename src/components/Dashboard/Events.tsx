import { serverClient } from "@/app/_trpc/serverClient";
import CardItem from "../CardItem";

const Events = async () => {
  const events = await serverClient.event.getAdminEvents();

  return (
    <section className="my-10 flex flex-col md:flex-row justify-center items-center mx-auto">
      <div className="flex-1 flex justify-center items-center gap-5 overflow-y-scroll overflow-hidden scrollbar-hide">
        {events?.map((event, i) => (
          <CardItem
            key={event.id}
            event={event}
            href={`/dash/organizer/edit-events/${event?.slug}/edit`}
            buttonTitle="Edit"
          />
        ))}
      </div>
    </section>
  );
};

export default Events;
