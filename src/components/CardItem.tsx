import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Comp, Event } from "@prisma/client";
import DateShowcase from "./DateShowcase";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface Props {
  comp?: Comp & {
    event?: {
      title: string;
    };
  };
  isRegistering?: boolean;
  where?: string;
  edit?: boolean;
  href: string;
  buttonTitle: string;
}

interface Props {
  event?: Event;
  isRegistering?: boolean;
  where?: string;
  edit?: boolean;
  href: string;
  buttonTitle: string;
}

const CardItem = ({
  comp,
  event,
  isRegistering,
  where,
  edit = false,
  href,
  buttonTitle,
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
        <Link
          href={href}
          className={buttonVariants({ className: "w-full py-6" })}
        >
          {buttonTitle}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardItem;
