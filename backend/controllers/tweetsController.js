import { PrismaClient } from "@prisma/client";
import { parse } from "dotenv";
const prisma = new PrismaClient();

export async function getTweets(req, res) {
  try {
    const userId = req.user.id;

    console.log(userId);

    const tweets = await prisma.tweet.findMany({
      include: {
        author: {
          select: {
            username: true,
            name: true,
          },
        },
        Likes: {
          select: {
            likedBy: {
              select: {
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(tweets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur interne" });
  }
}

export async function likeTweet(req, res) {
  try {
    const tweetId = req.params.tweetId;
    const userId = req.user.id;

    const existingLike = await prisma.like.findFirst({
      where: {
        tweetId: parseInt(tweetId),
        likedById: parseInt(userId),
      },
      select: {
        id: true,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      res.status(200).json({ message: "Tweet unliked" });
    } else {
      await prisma.like.create({
        data: {
          tweetId: parseInt(tweetId),
          likedById: parseInt(userId),
        },
      });
      res.status(200).json({ message: "Tweet liked" });
    }
  } catch (error) {
    console.error("Erreur Prisma:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function addTweet(req, res) {
  try {
    const { tweet } = req.body;
    const userId = req.user.id;
    await prisma.tweet.create({
      data: {
        content: tweet,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.status(201).json({ message: "Tweet ajouté" });
  } catch (error) {
    console.error("Erreur Prisma:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
