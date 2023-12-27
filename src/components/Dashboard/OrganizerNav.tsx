import Link from "next/link";

function Organizer() {
  return (
    <div className="max-w-7xl mx-auto text-primary mt-10">
      <header className="flex justify-center space-x-5">
        <Link
          href="/dash/organizer/create-event"
          className="font-semibold text-lg cursor-pointer transition-all hover:scale-105 active:text-gray-100"
        >
          Create Event
        </Link>
        <Link
          href="/dash/organizer/create-comp"
          className="font-semibold text-lg cursor-pointer transition-all hover:scale-105 active:text-gray-100"
        >
          Create Competition
        </Link>
        <Link
          href="/dash/organizer/all-events/"
          className="font-semibold text-lg cursor-pointer transition-all hover:scale-105 active:text-gray-100"
        >
          All Events
        </Link>
      </header>
    </div>
  );
}

export default Organizer;
