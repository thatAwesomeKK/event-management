import Image from "next/image";
import { Handlee, Pacifico } from "next/font/google";
import { serverClient } from "@/app/_trpc/serverClient";
import DateShowcase from "@/components/DateShowcase";
import ParticipateButton from "@/components/ParticipateButton";
import { getAuthSession } from "@/lib/config/authOptions";

const handlee = Handlee({ subsets: ["latin"], weight: ["400"] });
const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });

interface pageProps {
  params: {
    compSlug: string;
  };
}

const CompInfo = async ({ params: { compSlug } }: pageProps) => {
  const comp = await serverClient.comp.getBySlug({ slug: compSlug });
  const session = await getAuthSession();
  return (
    <div className="flex overflow-y-hidden h-screen">
      <div className="flex-1 mx-5 md:ml-12 pb-12 scrollbar-hide overflow-y-scroll">
        <p className="font-bold text-2xl text-[#f5a7a7a0] mb-10 mt-14 underline">
          Know More
        </p>
        {session?.user.role === "participant" && <ParticipateButton compId={comp?.id!} />}
        <div className="relative h-36 mb-10">
          <h3 className="absolute font-extrabold text-5xl sm:text-6xl md:text-7xl text-red-100 z-10">
            {comp?.title}
          </h3>
          <h3 className="absolute left-2 font-extrabold text-5xl sm:text-6xl md:text-7xl text-[#b65e5e]">
            {comp?.title}
          </h3>
        </div>
        <p className={`${handlee.className} font-medium text-xl text-white`}>
          {" "}
          <span
            className={`${pacifico.className} font-bold text-3xl text-[#de7474]`}
          >
            Date & Time:{" "}
          </span>
          <DateShowcase date={comp?.date!} />
        </p>
        <p
          className={`${pacifico.className} font-bold text-3xl text-[#de7474]`}
        >
          Venue:{" "}
          <span
            className={`${handlee.className} font-medium text-lg text-white`}
          >
            {comp?.venue}
          </span>
        </p>
        <div className="mt-10">
          <p
            className={`${pacifico.className} font-bold text-2xl text-[#de7474]`}
          >
            Description:{" "}
          </p>
          <p
            className={`${handlee.className} font-semibold text-xl text-white ml-2 lg:ml-4 mr-2 mt-2`}
          >
            {comp?.description}
          </p>
        </div>
      </div>
      <div className="md:flex-wrap hidden h-screen overflow-hidden lg:flex justify-center items-center">
        <Image src={comp?.poster!} alt="poster" height={1080} width={710} />
      </div>
    </div>
  );
};

export default CompInfo;
