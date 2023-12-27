import { serverClient } from "@/app/_trpc/serverClient";
import Judge from "@/components/Dashboard/JudgeEditor";
import Participants from "@/components/Dashboard/Participants";
import CreateCompForm from "@/components/Forms/CreateCompForm";
import { Card } from "@/components/ui/card";
import React from "react";

interface PageProps {
  params: {
    compEditType: string;
    compSlug: string;
  };
}

const CompEdit = async ({ params: { compEditType, compSlug } }: PageProps) => {
  const comp = await serverClient.comp.getBySlug({ slug: compSlug });
  if (compEditType === "edit") {
    const events = await serverClient.event.get();
    return (
      <Card className="flex-1 flex justify-center items-center">
        <CreateCompForm
          initialEvents={events}
          initialComp={comp!}
          update={true}
        />
      </Card>
    );
  }
  if (compEditType === "participants") {
    return (
      <Card className="flex-1 flex justify-center items-center">
        <Participants initialParticipants={comp?.participants} />
      </Card>
    );
  }
  if (compEditType === "judge") {
    return <Judge comp={comp!} />;
  }
};

export default CompEdit;
