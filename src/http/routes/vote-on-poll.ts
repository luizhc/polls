import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { voting } from "../../utils/voting-pub-sub";

export async function voteOnPoll(app: FastifyInstance) {
  app.post("/polls/:pollId/votes", async (request, reply) => {
    const voteOnPollParams = z.object({ pollId: z.string().uuid() });
    const voteOnPollBody = z.object({ pollOptionId: z.string().uuid() });

    const { pollId } = request.params as { pollId: string };
    const { pollOptionId } = request.body as { pollOptionId: string };

    const validationResultParams = voteOnPollParams.safeParse({ pollId });
    const validationResultBody = voteOnPollBody.safeParse({ pollOptionId });

    if (!validationResultParams.success) {
      return reply.status(400).send({ message: "Invalid poll ID on params." });
    }

    if (!validationResultBody.success) {
      return reply
        .status(400)
        .send({ message: "Invalid option poll ID on body." });
    }

    const hasPoll = await prisma.poll.findUnique({ where: { id: pollId } });

    if (!hasPoll) {
      return reply.status(400).send({ message: "Poll not found." });
    }

    const hasPollOption = await prisma.pollOption.findUnique({
      where: { id: pollOptionId },
    });

    if (!hasPollOption) {
      return reply.status(400).send({ message: "Poll option not found." });
    }

    let { sessionId } = request.cookies;

    if (sessionId) {
      const userPreviousVoteOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId,
          },
        },
      });

      if (
        userPreviousVoteOnPoll &&
        userPreviousVoteOnPoll.pollOptionId !== pollOptionId
      ) {
        await prisma.vote.delete({
          where: {
            id: userPreviousVoteOnPoll.id,
          },
        });

        // const votes = await redis.zincrby(
        //   pollId,
        //   -1,
        //   userPreviousVoteOnPoll.pollOptionId
        // );

        voting.publish(pollId, {
          pollOptionId: userPreviousVoteOnPoll.pollOptionId,
          // votes: Number(votes),
          votes: 0,
        });
      } else if (userPreviousVoteOnPoll) {
        return reply
          .status(400)
          .send({ message: "You already voted on this poll." });
      }
    }

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true,
      });
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId,
      },
    });

    // const votes = await redis.zincrby(pollId, 1, pollOptionId);

    // voting.publish(pollId, { pollOptionId, votes: Number(votes) });
    voting.publish(pollId, { pollOptionId, votes: 0 });

    return reply.status(201).send();
  });
}
