import Participant from "@/components/Dashboard/Participant";
import OrganizerNav from "../../../components/Dashboard/OrganizerNav";
import Judge from "@/components/Dashboard/Judge";
import { Card } from "@/components/ui/card";
import { getAuthSession } from "@/lib/config/authOptions";

interface PageProps {
  params: {
    dashType: string;
  };
  children: React.ReactNode;
}

export const dynamic = "force-dynamic";

export default async function DashLayout({
  params: { dashType },
  children,
}: PageProps) {
  const session = await getAuthSession();
  const dashChooser = () => {
    if (dashType === "organizer" && session?.user.role === "organizer")
      return <OrganizerNav />;
    if (dashType === "participant" && session?.user.role === "participant")
      return <Participant />;
    if (dashType === "organizer" && session?.user.role === "judge")
      return <Judge />;
  };

  return (
    <main className="flex justify-center space-x-10 max-w-[100vw] mt-10">
      <section className={`${session?.user.role === "judge" ? "w-[70%]" : "w-[30%]"} `}>
        <Card className="min-h-[87vh] px-2 ">{dashChooser()}</Card>
      </section>
      <section
        className={`${session?.user.role === "judge" ? "hidden" : "w-[50%]"} `}
      >
        {children}
      </section>

    </main>
  );
}
