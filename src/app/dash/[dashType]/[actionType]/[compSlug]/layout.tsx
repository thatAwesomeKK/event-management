import EditCompNav from "./EditCompNav";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
  params: { compSlug },
}: {
  children: React.ReactNode;
  params: {
    compSlug: string;
  };
}) {
  return (
    <section>
      <EditCompNav compSlug={compSlug} />
      <main className="flex justify-center items-start min-h-[100vh] mt-10">
        {children}
      </main>
    </section>
  );
}
