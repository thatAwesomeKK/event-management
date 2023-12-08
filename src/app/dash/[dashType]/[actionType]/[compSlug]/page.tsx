import { serverClient } from "@/app/_trpc/serverClient";
import Participants from "@/components/Dashboard/Participants";
import CreateCompForm from "@/components/Forms/CreateCompForm";
import { Card } from "@/components/ui/card";

interface PageProps {
  params: {
    compSlug: string;
  };
}

const CompEdit = async ({ params: { compSlug } }: PageProps) => {
  const comp = await serverClient.comp.getBySlug({ slug: compSlug });
  const events = await serverClient.event.get();

  return (
    <main className="flex justify-center items-start min-h-[100vh] mt-10">
      <Card className="flex-1 flex justify-center items-center">
        <CreateCompForm initialEvents={events} initialComp={comp!} />
      </Card>
      <div className="flex-1">
        <Participants initialParticipants={comp?.participants} />
      </div>
    </main>
  );
};

export default CompEdit;
