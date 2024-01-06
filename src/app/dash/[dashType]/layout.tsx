import Participant from "@/components/Dashboard/Participant";
import OrganizerNav from "../../../components/Dashboard/OrganizerNav";
import Judge from "@/components/Dashboard/Judge";
import { Card } from "@/components/ui/card";

interface PageProps {
  params: {
    dashType: string;
  };
  children: React.ReactNode;
}

export const dynamic = "force-dynamic";

export default function DashLayout({
  params: { dashType },
  children,
}: PageProps) {
  const dashChooser = () => {
    if (dashType === "organizer") return <OrganizerNav />;
    if (dashType === "participant") return <Participant />;
    if (dashType === "judge") return <Judge />;
  };
  return (
    <main className="flex justify-center space-x-10 max-w-[100vw] mt-10">
      <section className="w-[30%]">
        <Card className="min-h-[87vh] px-2">{dashChooser()}</Card>
      </section>
      <section className="w-[50%]">{children}</section>
    </main>
  );
}
