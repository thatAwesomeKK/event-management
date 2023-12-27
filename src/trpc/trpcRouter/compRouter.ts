import cloudinary from "@/lib/config/cloudinary";
import { privateProcedure, publicProcedure, router } from "../trpc";
import * as z from "zod";
import { db } from "@/lib/config/db";
import slugify from "slugify";
import { TRPCError } from "@trpc/server";

export const compRouter = router({
  //fetch all the comps of an event
  get: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input: { slug } }) => {
      const dbEventSlug = await db.event.findFirst({
        where: {
          slug,
        },
      });

      if (!dbEventSlug) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const comps = await db.comp.findMany({
        where: {
          eventId: dbEventSlug.id,
          isRegistering: true,
        },
      });
      return comps;
    }),
  getAdminComps: privateProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input: { slug } }) => {
      const dbEventSlug = await db.event.findFirst({
        where: {
          slug,
        },
      });

      if (!dbEventSlug) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const comps = await db.comp.findMany({
        where: {
          eventId: dbEventSlug.id,
        },
      });
      return comps;
    }),
  //fetch info of a particular comp
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input: { slug } }) => {
      const comp = await db.comp.findFirst({
        where: {
          slug,
        },
        include: {
          event: {
            select: {
              title: true,
              id: true,
            },
          },
          participants: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
        },
      });
      return comp;
    }),
  //create a comp
  create: privateProcedure
    .input(
      z.object({
        poster: z.string(),
        title: z.string(),
        desc: z.string(),
        date: z.string(),
        venue: z.string(),
        eventId: z.string(),
      })
    )
    .mutation(
      async ({ ctx, input: { poster, title, desc, date, venue, eventId } }) => {
        const { user } = ctx;

        const response = await cloudinary.uploader.upload(poster, {
          resource_type: "auto",
          folder: "event",
        });

        const slug = slugify(title, {
          lower: true,
        });

        const dbComp = await db.comp.findUnique({
          where: {
            slug,
          },
        });
        if (dbComp) {
          throw new TRPCError({ code: "CONFLICT" });
        }

        await db.comp.create({
          data: {
            poster: response.secure_url,
            eventId,
            slug,
            title,
            description: desc,
            date,
            venue,
          },
        });
      }
    ),
  update: privateProcedure
    .input(
      z.object({
        id: z.string().optional(),
        poster: z.string(),
        title: z.string(),
        desc: z.string(),
        date: z.string(),
        venue: z.string(),
        eventId: z.string(),
        isRegistering: z.boolean().optional(),
        isVerified: z.boolean().optional(),
      })
    )
    .mutation(
      async ({
        ctx,
        input: {
          id,
          poster,
          title,
          desc,
          date,
          venue,
          eventId,
          isRegistering,
          isVerified,
        },
      }) => {
        const { user } = ctx;

        const dbComp = await db.comp.findUnique({
          where: {
            id,
          },
        });

        if (!dbComp) {
          throw new TRPCError({ code: "CONFLICT" });
        }

        let updComp: any = {};

        if (dbComp.poster !== poster) {
          const response = await cloudinary.uploader.upload(poster, {
            resource_type: "auto",
            folder: "event",
          });
          updComp.poster = response.secure_url;
        }
        if (dbComp.title !== title) updComp.title = title;

        if (dbComp.description !== desc) updComp.description = desc;

        if (dbComp.date !== date) updComp.date = date;

        if (dbComp.venue !== venue) updComp.venue = venue;

        if (dbComp.isRegistering !== isRegistering)
          updComp.isRegistering = isRegistering;

        if (dbComp.isVerified !== isVerified) updComp.isVerified = isVerified;

        await db.comp.update({
          where: {
            id,
          },
          data: updComp,
        });
      }
    ),
  //particpate in a comp
  participate: privateProcedure
    .input(z.object({ compId: z.string() }))
    .mutation(async ({ ctx, input: { compId } }) => {
      const { user } = ctx;

      const isParticipating = await db.comp.findFirst({
        where: {
          id: compId,
          participantIDs: {
            has: user.id,
          },
        },
      });

      if (isParticipating) {
        throw new TRPCError({ code: "PRECONDITION_FAILED" });
      }

      await db.comp.update({
        where: {
          id: compId,
        },
        data: {
          participantIDs: {
            push: user.id,
          },
        },
      });
    }),
  getUserRegisteredComps: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;
    const dbComps = await db.comp.findMany({
      where: {
        participantIDs: {
          has: user.id,
        },
      },
      include: {
        event: {
          select: {
            title: true,
          },
        },
      },
    });
    return dbComps;
  }),
  createJudge: privateProcedure
    .input(
      z.object({ name: z.string(), password: z.string(), compId: z.string() })
    )
    .mutation(async ({ ctx, input: { name, password, compId } }) => {
      const { user } = ctx;

      const dbComp = await db.comp.findUnique({
        where: {
          id: compId,
        },
      });

      if (!dbComp) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      const email = `${name}@${dbComp.slug}.com`;

      const dbJudge = await db.judge.findUnique({
        where: {
          email,
        },
      });

      if (dbJudge) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      await db.judge.create({
        data: {
          email,
          password,
          compId
        },
      });
    }),
});
