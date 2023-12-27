import Participant from "@/components/Dashboard/Participant";
import OrganizerNav from "../../../components/Dashboard/OrganizerNav";
import Judge from "@/components/Dashboard/Judge";

interface PageProps {
  params: {
    dashType: string;
  };
}

export default function Dashboard({ params: { dashType } }: PageProps) {
  //   if (dashType === "profile") return <Profile />;
  if (dashType === "organizer") return <OrganizerNav />;
  if (dashType === "participant") return <Participant />;
  if (dashType === "judge") return <Judge />;
}
