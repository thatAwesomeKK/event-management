import Participant from "@/components/Dashboard/Participant";
import Organizer from "../../../components/Dashboard/Organizer";

interface PageProps {
  params: {
    dashType: string;
  };
}

export default function Dashboard({ params: { dashType } }: PageProps) {
  //   if (dashType === "profile") return <Profile />;
  if (dashType === "organizer") return <Organizer />;
  if (dashType === "participant") return <Participant />;
}
