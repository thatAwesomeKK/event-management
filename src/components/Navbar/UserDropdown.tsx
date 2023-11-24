"use client";
import React, { FC, ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogInIcon, LogOutIcon, SettingsIcon, UserCircle2 } from "lucide-react";

interface Props {
  children: ReactNode;
}

const UserDropdown: FC<Props> = ({ children }) => {
  const { data: session, status } = useSession();

  const router = useRouter();
  return (
    <DropdownMenu>
      {children}
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Your Loving Menu</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          {session?.user?.role === "organizer" && (
            <DropdownMenuItem
              onClick={() => router.push("/dash/organizer/create-event")}
            >
              <UserCircle2 className="h-4 w-4 mr-2" /> Create Event/Comp
            </DropdownMenuItem>
          )}
          {session?.user?.role === "participant" && (
            <DropdownMenuItem onClick={() => router.push("/dash/participant")}>
              <UserCircle2 className="h-4 w-4 mr-2" />
              Participate
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <SettingsIcon className="h-4 w-4 mr-2" /> Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          {session?.user ? (
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOutIcon className="h-4 w-4 mr-2" />
              SignOut
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => router.push("/signin")}>
              <LogInIcon className="h-4 w-4 mr-2" />
              SignIn
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
