import { serverClient } from "@/app/_trpc/serverClient";
import CardItem from "../CardItem";

const Events = async () => {
  const events = await serverClient.event.getAdminEvents();

  return (
    <section className="flex-1 my-10 flex flex-col gap-5 items-center mx-auto overflow-y-scroll h-[90%]">
      {/* <div className="flex-1 flex flex-col justify-center items-center gap-5 h-full overflow-y-scroll overflow-hidden scrollbar-hide bg-red-300"> */}
      {events?.map((event, i) => (
        <CardItem
          key={event.id}
          event={event}
          href={`/dash/organizer/edit-events/${event?.slug}/edit`}
          buttonTitle="Edit"
        />
      ))}
      {/* </div> */}
    </section>
  );
};

export default Events;
