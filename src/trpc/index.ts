import { router } from "./trpc";
import { authRouter } from "./trpcRouter/authRouter";
import { compRouter } from "./trpcRouter/compRouter";
import { eventRouter } from "./trpcRouter/eventRouter";

export const appRouter = router({
  auth: authRouter,
  event: eventRouter,
  comp: compRouter,
});

export type AppRouter = typeof appRouter;
