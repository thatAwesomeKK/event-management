import React from "react";
import Image from "next/image";
import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";
import DateShowcase from "./DateShowcase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { buttonVariants } from "./ui/button";
import { Comp, Event } from "@prisma/client";

interface Props {
  comp?: Comp & {
    event?: {
      title: string;
    };
  };
  type: string;
  isRegistering?: boolean;
  where?: string;
}

interface Props {
  event?: Event;
  type: string;
  isRegistering?: boolean;
  where?: string;
}

const CompAndEventCard = ({
  comp,
  event,
  type,
  isRegistering,
  where,
}: Props) => {
  return (
    <Card className="flex flex-col h-fit shadow-lg shadow-secondary">
      <div className="flex">
        <CardHeader className="flex-1 flex justify-center items-center">
          <Image
            className="rounded-lg"
            src={comp?.poster! || event?.poster || ""}
            alt="Movie"
            height={100}
            width={200}
          />
        </CardHeader>
        <Separator className="h-80 mt-3" orientation="vertical" />
        <CardContent className="flex-1 flex flex-col justify-evenly items-center">
          <CardTitle>{comp?.title || event?.title}</CardTitle>
          <DateShowcase date={comp?.date || event?.date || ""} />
          <CardDescription className="line-clamp-6 w-full">
            {comp?.event?.title && (
              <>
                <span>Event:</span> {comp?.event?.title}
              </>
            )}
            <br />
            {comp?.description || event?.description}
          </CardDescription>
        </CardContent>
      </div>
      {where !== "dashboard" && (
        <>
          <Separator
            className="my-1 w-[97%] mx-auto"
            orientation="horizontal"
          />
          <CardFooter className="flex-1 mt-2">
            {isRegistering ? (
              <Link
                className={buttonVariants({ className: "w-full py-6" })}
                href={`/event/${comp?.eventId}/${comp?.slug}`}
              >
                Learn More!
              </Link>
            ) : (
              <Link
                className={buttonVariants({ className: "w-full py-6" })}
                href={`/event/${event?.slug}`}
              >
                Learn More!
              </Link>
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default CompAndEventCard;
