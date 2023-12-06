"use client";
import { trpc } from "@/app/_trpc/client";
import { useSearchParams } from "next/navigation";
import CompAndEventCard from "../CompAndEventCard";

const CompsSection = () => {
  const searchParams = useSearchParams();
  const event = searchParams.get("event");

  const { data: comps } = trpc.comp.get.useQuery({ slug: event! });

  return (
    <>
      {comps?.map((comp, i) => (
        <CompAndEventCard key={comp.id} comp={comp} where="dashboard" edit={true} />
      ))}
    </>
  );
};

export default CompsSection;
