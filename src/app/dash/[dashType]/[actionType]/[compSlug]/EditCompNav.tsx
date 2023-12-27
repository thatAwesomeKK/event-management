import Link from "next/link";
import React from "react";

interface Props {
  compSlug: string;
}

const EditCompNav = ({ compSlug }: Props) => {
  return (
    <header className="flex justify-center space-x-5">
      <Link
        href={`/dash/organizer/all-events/${compSlug}/edit`}
        className="font-semibold text-lg cursor-pointer transition-all hover:scale-105 active:text-gray-100"
      >
        Edit
      </Link>
      <Link
        href={`/dash/organizer/all-events/${compSlug}/participants`}
        className="font-semibold text-lg cursor-pointer transition-all hover:scale-105 active:text-gray-100"
      >
        Participants
      </Link>
      <Link
        href={`/dash/organizer/all-events/${compSlug}/judge`}
        className="font-semibold text-lg cursor-pointer transition-all hover:scale-105 active:text-gray-100"
      >
        Judge
      </Link>
    </header>
  );
};

export default EditCompNav;
