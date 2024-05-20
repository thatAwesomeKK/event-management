import { serverClient } from "@/app/_trpc/serverClient";
import JudgeEditor from "@/components/Dashboard/JudgeEditor";
import ListJudge from "@/components/Dashboard/ListJudge";
import Participants from "@/components/Dashboard/Participants";
import CreateCompForm from "@/components/Forms/CreateCompForm";
import CreateEventForm from "@/components/Forms/CreateEventForm";
import { Card } from "@/components/ui/card";
import React from "react";

interface PageProps {
  params: {
    slug: string;
    editType: string;
    actionType: string;
  };
}

const EditingPage = async ({
  params: { slug, editType, actionType },
}: PageProps) => {
  const editChooser = async () => {
    if (editType === "edit" && actionType === "edit-events") {
      const event = await serverClient.event.getBySlug({ slug });
      return (
        <Card className="flex-1 flex justify-center items-center">
          <CreateEventForm initialEvent={event!} update={true} />
        </Card>
      );
    }
    if (editType === "edit" && actionType === "edit-comps") {
      const events = await serverClient.event.get();
      const comp = await serverClient.comp.getBySlug({ slug });
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
    if (editType === "participants" && actionType === "edit-comps") {
      const comp = await serverClient.comp.getBySlug({ slug });
      return (
        <Card className="flex-1 min-h-[87vh] px-2">
          <Participants initialParticipants={comp?.participants} />
        </Card>
      );
    }
    if (editType === "judge" && actionType === "edit-comps") {
      const comp = await serverClient.comp.getBySlug({ slug });
      const judges = await serverClient.comp.fetchJudge();
      return (
        <Card className="flex-1 flex flex-col justify-center items-center">
          <JudgeEditor comp={comp!} />
          <ListJudge judges={judges}/>
        </Card>
      );
    }
  };
  return <section className="">{editChooser()}</section>;
};

export default EditingPage;
