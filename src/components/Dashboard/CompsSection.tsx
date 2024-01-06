"use client";
import { trpc } from "@/app/_trpc/client";
import CardItem from "../CardItem";

interface Props {
  eventId: string;
}

const CompsSection = ({ eventId }: Props) => {
  const {
    data: comps,
    isLoading,
    isFetching,
  } = trpc.comp.getAdminComps.useQuery({ eventId });

  if (isLoading && isFetching && eventId) return <p>Loading...</p>;
  return (
    <>
      {comps?.map((comp, i) => (
        <CardItem
          key={comp.id}
          comp={comp}
          href={`edit-comps/${comp.slug}`}
          buttonTitle="Edit"
        />
      ))}
    </>
  );
};

export default CompsSection;
