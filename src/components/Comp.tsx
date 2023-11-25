
import { serverClient } from "@/app/_trpc/serverClient";
import CompAndEventCard from "./CompAndEventCard";

interface Props {
  slug: string;
  path: string;
}

const Comp = async ({ slug, path }: Props) => {
  const comps = await serverClient.comp.get({ slug });

  return (
    <section className="my-10 max-w-[85%] mx-auto">
      <div className="grid grid-cols-3 gap-10 justify-center items-center">
        {comps.map((comp, i) => (
          <CompAndEventCard
            key={comp.id}
            comp={comp}
            isRegistering
          />
        ))}
      </div>
    </section>
  );
};

export default Comp;
