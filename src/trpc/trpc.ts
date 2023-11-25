import { getAuthSession } from "@/lib/config/authOptions";
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.create({
  transformer: superjson,
});
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const session = await getAuthSession();

  if (!session?.user || !session.user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      user: session.user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
