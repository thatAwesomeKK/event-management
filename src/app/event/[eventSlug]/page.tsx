import { serverClient } from "@/app/_trpc/serverClient";
import Comp from "@/components/Comp";
import DateShowcase from "@/components/DateShowcase";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Marhey, Pacifico } from "next/font/google";

const marhey = Marhey({ subsets: ["latin"], weight: ["400"] });
const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });

interface pageProps {
  params: {
    eventSlug: string;
  };
}

const EventInfo = async ({ params: { eventSlug } }: pageProps) => {
  const event = await serverClient.event.getBySlug({ slug: eventSlug });

  return (
    <div className="text-white mt-10 max-w-[90vw] mx-auto">
      <section className="flex justify-center items-start">
        <div className="flex-1 hidden md:flex justify-end">
          <Image src={event?.poster!} alt="poster" height={1080} width={640} />
        </div>
        <div className="flex-1 flex justify-center items-center flex-col mt-5">
          <h1
            className={`${marhey.className} font-extrabold text-5xl md:text-7xl text-primary`}
          >
            {event?.title}
          </h1>
          <div
            className={`${pacifico.className} text-2xl mt-4 flex flex-col space-y-2 text-primary`}
          >
            <span className="">
              Date :
              <DateShowcase
                className="text-start ml-1"
                date={event?.date || ""}
              />
            </span>
            <span className="text-primary">Venue: {event?.venue}</span>
            <p className="font-medium text-primary">Info: {event?.description}</p>
          </div>
        </div>
      </section>
      <Separator className="my-10 max-w-[95vw] mx-auto" />
      <section>
        <h2 className="font-bold text-5xl md:text-6xl text-center mb-5 text-primary underline">
          Competitions
        </h2>
        <Comp slug={eventSlug} path="event" />
      </section>
    </div>
  );
};

export default EventInfo;
