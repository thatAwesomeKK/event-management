"use client";
import React, { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

const CompsEdit = () => {
  const { data: events, isLoading: isLoadingEvents } =
    trpc.event.getAdminEvents.useQuery();
  const [eventId, setEventId] = useState<string | null>(null);

  const { data: comps, isLoading: isLoadingComps } =
    trpc.comp.getAdminComps.useQuery({ eventId }, { enabled: !!eventId });

  return (
    <section>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Events</AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible>
              {events?.map((event, i) => (
                <AccordionItem key={i} value={event.id}>
                  <AccordionTrigger onClick={() => setEventId(event.id)}>
                    {event.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Accordion type="single" collapsible>
                      {comps?.map((comp, i) => (
                        <AccordionItem key={i} value={comp.id}>
                          <AccordionTrigger>{comp.title}</AccordionTrigger>
                          <AccordionContent className="flex justify-evenly items-center">
                            <Link
                              className={buttonVariants({ className: "w-32" })}
                              href={`/dash/organizer/edit-comps/${comp.slug}/edit`}
                            >
                              Edit
                            </Link>
                            <Link
                              className={buttonVariants({ className: "w-32" })}
                              href={`/dash/organizer/edit-comps/${comp.slug}/participants`}
                            >
                              Participants
                            </Link>
                            <Link
                              className={buttonVariants({ className: "w-32" })}
                              href={`/dash/organizer/edit-comps/${comp.slug}/judge`}
                            >
                              Judge
                            </Link>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default CompsEdit;
