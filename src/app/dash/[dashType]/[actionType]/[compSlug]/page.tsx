import { serverClient } from "@/app/_trpc/serverClient";
import CreateCompForm from "@/components/Forms/CreateCompForm";

interface PageProps {
  params: {
    compSlug: string;
  };
}

const CompEdit = async ({ params: { compSlug } }: PageProps) => {
  const comp = await serverClient.comp.getBySlug({ slug: compSlug });
  const events = await serverClient.event.get();

  return (
    <div className="flex justify-center items-center">
      <CreateCompForm initialEvents={events} initialComp={comp!} />
    </div>
  );
};

export default CompEdit;