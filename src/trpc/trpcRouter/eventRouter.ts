import { db } from "@/lib/config/db";
import { privateProcedure, publicProcedure, router } from "../trpc";
import * as z from "zod";
import cloudinary from "@/lib/config/cloudinary";
import slugify from "slugify";
import { TRPCError } from "@trpc/server";

export const eventRouter = router({
  //fetch all events
  get: publicProcedure.query(async () => {
    const events = await db.event.findMany();
    return events;
  }),
  //fetch event info with slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input: { slug } }) => {
      const event = await db.event.findFirst({
        where: {
          slug,
        },
      });
      return event;
    }),
  //create an event
  create: privateProcedure
    .input(
      z.object({
        poster: z.string(),
        title: z.string(),
        desc: z.string(),
        date: z.string(),
        venue: z.string(),
      })
    )
    .mutation(async ({ ctx, input: { poster, title, desc, date, venue } }) => {
      const { user } = ctx;

      const response = await cloudinary.uploader.upload(poster, {
        resource_type: "auto",
        folder: "event",
      });

      const slug = slugify(title, {
        lower: true,
      });

      const dbEvent = await db.event.findUnique({
        where: {
          slug,
        },
      });
      if (dbEvent) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      await db.event.create({
        data: {
          poster: response.secure_url,
          slug,
          title,
          description: desc,
          date,
          venue,
          uid: user.id,
        },
      });
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string().optional(),
        poster: z.string(),
        title: z.string(),
        desc: z.string(),
        date: z.string(),
        venue: z.string(),
      })
    )
    .mutation(
      async ({ ctx, input: { id, poster, title, desc, date, venue } }) => {
        const { user } = ctx;

        const dbEvent = await db.event.findUnique({
          where: {
            id,
          },
        });

        if (!dbEvent) {
          throw new TRPCError({ code: "CONFLICT" });
        }

        let updEvent: any = {};

        if (dbEvent.poster !== poster) {
          const response = await cloudinary.uploader.upload(poster, {
            resource_type: "auto",
            folder: "event",
          });
          updEvent.poster = response.secure_url;
        }
        if (dbEvent.title !== title) updEvent.title = title;

        if (dbEvent.description !== desc) updEvent.description = desc;

        if (dbEvent.date !== date) updEvent.date = date;

        if (dbEvent.venue !== venue) updEvent.venue = venue;

        await db.event.update({
          where: {
            id,
          },
          data: updEvent,
        });
      }
    ),
  //fetch events belonging to organizer
  getAdminEvents: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;

    const dbEvents = await db.event.findMany({
      where: {
        uid: user.id,
      },
    });

    return dbEvents;
  }),
});
