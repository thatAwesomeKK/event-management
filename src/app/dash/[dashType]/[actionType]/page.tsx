import { serverClient } from "@/app/_trpc/serverClient";
import Events from "@/components/Dashboard/Events";
import CreateCompForm from "@/components/Forms/CreateCompForm";
import CreateEventForm from "@/components/Forms/CreateEventForm";

interface PageProps {
  params: {
    dashType: string;
    actionType: string;
  };
}

export const dynamic = "force-dynamic";

export default async function Action({
  params: { dashType, actionType },
}: PageProps) {
  if (dashType === "organizer" && actionType === "create-event")
    return (
      <div className="flex justify-center items-center mt-10">
        <CreateEventForm />
      </div>
    );
  if (dashType === "organizer" && actionType === "create-comp") {
    const events = await serverClient.event.get();
    return (
      <div className="flex justify-center items-center mt-10">
        <CreateCompForm initialEvents={events} />
      </div>
    );
  }
  if (dashType === "organizer" && actionType === "all-events")
    return <Events />;
}
