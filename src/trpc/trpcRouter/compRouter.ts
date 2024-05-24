import cloudinary from "@/lib/config/cloudinary";
import { privateProcedure, publicProcedure, router } from "../trpc";
import * as z from "zod";
import { db } from "@/lib/config/db";
import slugify from "slugify";
import { TRPCError } from "@trpc/server";
import { JsonArray } from "@prisma/client/runtime/library";
import { Participants } from "@/components/Dashboard/JudgingSheet";
import { log } from "console";

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
    .input(z.object({ eventId: z.string().nullable() }))
    .query(async ({ input: { eventId } }) => {
      let dbEventSlug;
      if (eventId) {
        dbEventSlug = await db.event.findFirst({
          where: {
            id: eventId,
          },
        });
      }

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
      const judgedScores = await db.judgeScore.findMany({
        where: {
          compId: comp?.id,
        },
      });

      let newParticipants: any = [];
      comp?.participants.forEach((participant) => {
        for (let judgedScore of judgedScores) {
          const newParticipant = newParticipants.find(
            (p: any) => p.id === participant.id
          );

          const score = judgedScore.participantScore.find(
            (p) => p.participantId === participant.id
          );

          if (newParticipant) {
            newParticipant.score += score?.score || 0;
            continue;
          }
          newParticipants.push({
            ...participant,
            score: score?.score || 0,
          });
        }
      });

      const newComp = {
        ...comp,
        participants: newParticipants,
      };

      return newComp;
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
            slug: true,
            title: true,
          },
        },
      },
    });
    return dbComps;
  }),
  getParticipantJudge: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;
    const dbJudge = await db.judge.findFirst({
      where: {
        id: user.id,
      },
    });

    const dbComps = await db.comp.findFirst({
      where: {
        id: dbJudge?.compId,
      },
      include: {
        participants: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });

    // console.log(dbComps);

    if (!dbJudge || !dbComps) {
      throw new TRPCError({ code: "CONFLICT" });
    }

    // console.log(dbJudge);

    const judgedScores = await db.judgeScore.findFirst({
      select: {
        participantScore: {
          select: {
            judgeId: true,
            participantId: true,
            score: true,
          },
        },
      },
    });

    const filteredScores = judgedScores?.participantScore.filter((s) =>
      s.judgeId?.includes(dbJudge.id)
    );

    let newParticipants: any = [];

    dbComps?.participants.forEach((participant) => {
      const score = filteredScores?.find(
        (p) => p.participantId === participant.id
      );

      newParticipants.push({
        ...participant,
        score: score?.score || 0,
      });
    });

    const newComp = {
      ...dbComps,
      participants: newParticipants,
    };

    return newComp;
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
          compId,
        },
      });
    }),
  judgeMarks: privateProcedure
    .input(
      z.object({
        marks: z.object({
          field1: z.number(),
          field2: z.number(),
          field3: z.number(),
        }),
        participantId: z.string(),
      })
    )
    .mutation(async ({ ctx, input: { marks, participantId } }) => {
      const { user } = ctx;
      const dbJudge = await db.judge.findFirst({
        where: {
          id: user.id,
        },
      });

      if (!dbJudge) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      const dbJudgeScore = await db.judgeScore.findFirst({
        where: {
          compId: dbJudge.compId,
        },
      });

      if (!dbJudgeScore) {
        await db.judgeScore.create({
          data: {
            compId: dbJudge.compId,
            participantScore: {
              set: {
                participantId,
              },
            },
          },
        });
      }

      const userScore = await db.judgeScore.findFirst({
        where: {
          compId: dbJudge.compId,
          AND: {
            participantScore: {
              some: {
                participantId,
              },
            },
          },
        },
      });

      if (!userScore && dbJudgeScore) {
        await db.judgeScore.update({
          where: {
            id: dbJudgeScore.id,
          },
          data: {
            participantScore: {
              push: { participantId },
            },
          },
        });
      }

      await db.judgeScore.update({
        where: {
          id: userScore?.id || dbJudgeScore?.id,
        },
        data: {
          participantScore: {
            updateMany: {
              where: {
                participantId,
              },
              data: {
                judgeId: {
                  push: dbJudge.id,
                },
                score:
                  marks.field1 +
                  marks.field2 +
                  marks.field3 +
                  (userScore?.participantScore.find(
                    (p) => p.participantId === participantId
                  )?.score || 0),
              },
            },
          },
        },
      });
    }),
  fetchJudge: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });
    if (!dbUser) {
      throw new TRPCError({ code: "CONFLICT" });
    }
    const judges = await db.judge.findMany({
      select: {
        email: true,
      },
    });
    return judges;
  }),
});

const chooseWinner = async (compId: string) => {
  const dbJudgeScore = await db.judgeScore.findFirst({
    where: {
      compId,
    },
    select: {
      participantScore: {
        select: {
          participantId: true,
          score: true,
        },
      },
    },
  });

  let startChoosingWinner = false;
  dbJudgeScore?.participantScore.forEach((score) => {
    if (score.score !== 0) {
      startChoosingWinner = true;
    }
  });
  log(startChoosingWinner);
  if (!startChoosingWinner) return;
};
