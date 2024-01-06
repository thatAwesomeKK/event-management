"use client";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { buttonVariants } from "../ui/button";

const createItems = [
  {
    title: "Create Event",
    href: "/dash/organizer/create-event",
  },
  {
    title: "Create Competition",
    href: "/dash/organizer/create-comp",
  },
];

function OrganizerNav() {
  return (
    <div className="text-primary">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Create ?</AccordionTrigger>
          {createItems.map(({ title, href }, i) => (
            <AccordionContent key={i}>
              <Link
                href={href}
                className={buttonVariants({ className: "w-full py-6" })}
              >
                {title}
              </Link>
            </AccordionContent>
          ))}
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Edit</AccordionTrigger>
          <AccordionContent>
            <Link
              href="/dash/organizer/edit-events/"
              className={buttonVariants({ className: "w-full py-6" })}
            >
              Edit Events
            </Link>
          </AccordionContent>
          <AccordionContent>
            <Link
              href="/dash/organizer/edit-comps/"
              className={buttonVariants({ className: "w-full py-6" })}
            >
              Edit Comps
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default OrganizerNav;
