import { serverClient } from "@/app/_trpc/serverClient";
import CompsEdit from "@/components/Dashboard/CompsEdit";
import Events from "@/components/Dashboard/Events";
import CreateCompForm from "@/components/Forms/CreateCompForm";
import CreateEventForm from "@/components/Forms/CreateEventForm";
import { Card } from "@/components/ui/card";
import { getAuthSession } from "@/lib/config/authOptions";

interface PageProps {
  params: {
    dashType: string;
    actionType: string;
  };
  children: React.ReactNode;
}

export default async function EditLayout({
  params: { dashType, actionType },
  children,
}: PageProps) {
  const editDashChooser = async () => {
    if (dashType === "organizer" && actionType === "create-event")
      return <CreateEventForm />;

    if (dashType === "organizer" && actionType === "create-comp") {
      const events = await serverClient.event.get();
      return <CreateCompForm initialEvents={events} />;
    }
    if (dashType === "organizer" && actionType === "edit-events")
      return <Events />;

    if (dashType === "organizer" && actionType === "edit-comps")
      return <CompsEdit />;
  };
  return (
    <main className="flex justify-center space-x-10">
      <section className="w-[50%]">
        <Card className="h-[87vh] px-2">{editDashChooser()}</Card>
      </section>
      <section className="w-[50%]">{children}</section>
    </main>
  );
}
