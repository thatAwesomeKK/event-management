import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/dash/organizer")) {
      if (req.nextauth.token?.role === "organizer") {
        return NextResponse.next();
      } else if (req.nextauth.token?.role === "judge") {
        return NextResponse.next();
      } else {
        return NextResponse.rewrite(new URL("/denied", req.url));
      }
    }
    if (
      req.nextUrl.pathname.startsWith("/dash/participant") &&
      req.nextauth.token?.role !== "participant"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/dash/:path*"] };
