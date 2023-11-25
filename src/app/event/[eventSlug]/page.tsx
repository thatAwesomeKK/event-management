import { serverClient } from "@/app/_trpc/serverClient";
import Comp from "@/components/Comp";
import DateShowcase from "@/components/DateShowcase";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface pageProps {
  params: {
    eventSlug: string;
  };
}

const EventInfo = async ({ params: { eventSlug } }: pageProps) => {
  const event = await serverClient.event.getBySlug({ slug: eventSlug });

  return (
    <div className="text-white mt-10 max-w-[90vw] mx-auto">
      <section className="flex justify-center items-start gap-20">
        <div className="flex-1 hidden md:flex justify-end">
          <Image src={event?.poster!} alt="poster" height={1080} width={640} />
        </div>
        <div className="flex-1">
          <h1 className="font-extrabold text-5xl md:text-7xl">
            {event?.title}
          </h1>
          <p className="font-medium text-xl ml-2">{event?.description}</p>
          <span className="ml-2">
            Date :
            <DateShowcase
              className="text-start ml-2"
              date={event?.date || ""}
            />
          </span>
          <br />
          <span className="ml-2">Venue: {event?.venue}</span>
        </div>
      </section>
      <Separator className="my-10 max-w-[95vw] mx-auto" />
      <section>
        <h2 className="font-bold text-5xl md:text-6xl text-center mb-5 text-white underline">
          Competitions
        </h2>
        <Comp slug={eventSlug} path="event" />
      </section>
    </div>
  );
};

export default EventInfo;
