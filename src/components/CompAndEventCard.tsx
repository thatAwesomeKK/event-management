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
import { Button, buttonVariants } from "./ui/button";
import { Comp, Event } from "@prisma/client";

interface Props {
  comp?: Comp & {
    event?: {
      title: string;
    };
  };
  isRegistering?: boolean;
  where?: string;
  edit?: boolean;
}

interface Props {
  event?: Event;
  isRegistering?: boolean;
  where?: string;
  edit?: boolean;
}

const CompAndEventCard = ({
  comp,
  event,
  isRegistering,
  where,
  edit = false,
}: Props) => {
  return (
    <Card className="shadow-lg shadow-secondary w-[22rem] lg:w-96">
      {comp?.poster || event?.poster ? (
        <CardHeader className="flex-1 flex justify-center items-center">
          <Image
            className="rounded-lg"
            src={comp?.poster! || event?.poster || ""}
            alt="Movie"
            height={100}
            width={300}
          />
        </CardHeader>
      ) : (
        <CardContent className="flex-1 hidden lg:flex flex-col justify-evenly items-center">
          <CardTitle className="text-lg">
            {comp?.title || event?.title}
          </CardTitle>
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
      )}
      <CardFooter className="flex-1 mt-2">
        {event && edit && (
          <Link
            href={`?event=${event?.slug}`}
            className={buttonVariants({ className: "w-full py-6" })}
          >
            Get Comps
          </Link>
        )}
        {where !== "dashboard" ? (
          <div className="w-full">
            <Separator
              className="my-1 w-[97%] mx-auto mb-2"
              orientation="horizontal"
            />

            {isRegistering && !edit ? (
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
          </div>
        ) : (
          <>
            {comp && edit ? (
              <Link
                className={buttonVariants({ className: "w-full py-6" })}
                href={`all-events/${comp?.slug}/edit`}
              >
                Edit
              </Link>
            ) : (
              ""
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default CompAndEventCard;
