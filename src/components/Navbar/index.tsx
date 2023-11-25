import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getAuthSession } from "@/lib/config/authOptions";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";
import UserDropdown from "./UserDropdown";
import { ThemeToggle } from "../ThemeToggle";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <nav className="sticky top-0 shadow-md shadow-secondary z-50 flex justify-between items-center h-16 px-8 bg-background">
      <div className="">
        <Link
          href="/"
          className="normal-case text-2xl text-primary font-semibold"
        >
          Eventator
        </Link>
      </div>
      <div className="flex justify-center items-center gap-7">
        <div className="">
          <ThemeToggle/>
        </div>
        <UserDropdown>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={session?.user.pfp || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
        </UserDropdown>
      </div>
    </nav>
  );
};

export default Navbar;
