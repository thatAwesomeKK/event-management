import { serverClient } from "@/app/_trpc/serverClient";
import CardItem from "./CardItem";

interface Props {
  slug: string;
  path: string;
}

const Comp = async ({ slug, path }: Props) => {
  const comps = await serverClient.comp.get({ slug });

  return (
    <section className="my-10 max-w-[85%] mx-auto">
      <div className="md:grid md:grid-cols-3 gap-10 justify-center items-center flex flex-col">
        {comps.map((comp, i) => (
          <CardItem
            key={comp.id}
            comp={comp}
            href={`/event/${slug}/${comp?.slug}`}
            buttonTitle="Know More"
          />
        ))}
      </div>
    </section>
  );
};

export default Comp;
