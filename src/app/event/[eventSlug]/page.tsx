import { serverClient } from "@/app/_trpc/serverClient";
import Comp from "@/components/Comp";
import Image from "next/image";

interface pageProps {
  params: {
    eventSlug: string;
  };
}

const EventInfo = async ({ params: { eventSlug } }: pageProps) => {
  const event = await serverClient.event.getBySlug({ slug: eventSlug });

  return (
    <div className="mx-10 text-white">
      <section className="my-10">
        <div className="flex">
          <div className="flex-1">
            <Image
              src={event?.poster!}
              alt="poster"
              height={1080}
              width={640}
            />
          </div>
          <div className="flex-1">
            <h1 className="font-extrabold text-7xl">{event?.title}</h1>
            <p className="font-medium text-xl">{event?.description}</p>
          </div>
        </div>
      </section>
      <section className="my-28">
        <h2 className="font-bold text-6xl text-center mb-5 text-white">
          Competitions
        </h2>
        <Comp slug={eventSlug} path="event" />
      </section>
    </div>
  );
};

export default EventInfo;
