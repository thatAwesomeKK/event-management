import Image from "next/image";
import { Agbalumo, Handlee, Lilita_One, Lobster, Marhey, Pacifico, Patua_One, Permanent_Marker, Potta_One, Russo_One } from "next/font/google";
import { serverClient } from "@/app/_trpc/serverClient";
import DateShowcase from "@/components/DateShowcase";
import ParticipateButton from "@/components/ParticipateButton";
import { getAuthSession } from "@/lib/config/authOptions";

const handlee = Handlee({ subsets: ["latin"], weight: ["400"] });
const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });
const permanentMarker = Permanent_Marker({ subsets: ["latin"], weight: ["400"] });

interface pageProps {
  params: {
    compSlug: string;
  };
}

const gradient = "text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600";

const CompInfo = async ({ params: { compSlug } }: pageProps) => {
  const comp = await serverClient.comp.getBySlug({ slug: compSlug });
  const session = await getAuthSession();
  return (
    <div className="flex overflow-y-hidden min-h-screen max-w-[90vw] mx-auto">
      <div className="flex-1 mx-5 md:ml-12 pb-12 scrollbar-hide overflow-y-scroll">
        <p className="font-bold text-2xl text-primary mb-10 mt-14 underline">
          Know More
        </p>
        {session?.user.role === "participant" && (
          <ParticipateButton compId={comp?.id!} />
        )}
        <div className="flex flex-col space-y-3">
          <h1
            className={`${permanentMarker.className} capitalize underline font-extrabold text-5xl sm:text-6xl md:text-[5.4rem] mb-10 text-primary ${gradient}`}
          >
            {comp?.title}
          </h1>
          <p
            className={`${handlee.className} font-medium text-xl text-primary`}
          >
            <span
              className={`${pacifico.className} font-bold text-3xl ${gradient}`}
            >
              Date & Time:
            </span>
            <DateShowcase className="ml-1 text-start" date={comp?.date!} />
          </p>
          <p
            className={`${pacifico.className} font-bold text-3xl text-transparent bg-clip-text ${gradient}`}
          >
            Venue:{" "}
            <span
              className={`${handlee.className} font-medium text-xl text-primary`}
            >
              {comp?.venue}
            </span>
          </p>
          <div className="">
            <p
              className={`${pacifico.className} font-bold text-3xl ${gradient}`}
            >
              Description:{" "}
            </p>
            <p
              className={`${handlee.className} font-semibold text-xl text-primary ml-2 lg:ml-4 mr-2 mt-2`}
            >
              {comp?.description}
            </p>
          </div>
        </div>
      </div>
      <div className="md:flex-wrap hidden h-screen overflow-hidden lg:flex justify-center items-center">
        <Image src={comp?.poster!} alt="poster" height={1080} width={710} />
      </div>
    </div>
  );
};

export default CompInfo;
