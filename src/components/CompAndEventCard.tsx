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
  info: Comp & {
    event?: { title: string };
  };
  type: string;
  isRegistering?: boolean;
}

const CompAndEventCard = ({ info, type, isRegistering }: Props) => {
  return (
    <Card className="flex flex-col h-fit shadow-lg shadow-secondary">
      <div className="flex">
        <CardHeader className="flex-1 flex justify-center items-center">
          <Image
            className="rounded-lg"
            src={info.poster!}
            alt="Movie"
            height={100}
            width={200}
          />
        </CardHeader>
        <Separator className="h-80 mt-3" orientation="vertical" />
        <CardContent className="flex-1 flex flex-col justify-evenly items-center">
          <CardTitle>{info.title}</CardTitle>
          <DateShowcase date={info.date} />
          <CardDescription className="line-clamp-6 w-full">
            {info.event?.title && (
              <>
                <span>Event:</span> {info.event?.title}
              </>
            )}
            <br />
            {info.description}
          </CardDescription>
        </CardContent>
      </div>
      <Separator className="my-1 w-[97%] mx-auto" orientation="horizontal" />
      <CardFooter className="flex-1 mt-2">
        {isRegistering ? (
          <Link
            className={buttonVariants({ className: "w-full py-6" })}
            href={`/event/${info.eventId}/${info.slug}`}
          >
            Learn More!
          </Link>
        ) : (
          <Link
            className={buttonVariants({ className: "w-full py-6" })}
            href={`/event/${info.slug}`}
          >
            Learn More!
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default CompAndEventCard;
