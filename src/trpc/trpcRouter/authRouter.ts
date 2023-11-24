import { db } from "@/lib/config/db";
import { publicProcedure, router } from "../trpc";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  //Create a user
  signup: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input: { username, email, password } }) => {
      const dbUser = await db.user.findFirst({
        where: {
          email,
        },
      });
      if (dbUser) {
        throw new TRPCError({ code: "UNPROCESSABLE_CONTENT" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);
      await db.user.create({
        data: { email: email, password: secPass, username: username },
      });
      return { message: "Registration Success!" };
    }),
});
