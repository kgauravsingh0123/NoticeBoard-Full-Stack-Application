import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  // GET ONE NOTICE
  if (req.method === "GET") {
    try {
      const notice = await prisma.notice.findUnique({
        where: {
          id,
        },
      });

      if (!notice) {
        return res.status(404).json({
          message: "Notice not found",
        });
      }

      return res.status(200).json(notice);
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
      });
    }
  }

  // UPDATE NOTICE
  if (req.method === "PUT") {
    try {
      const {
        title,
        body,
        category,
        priority,
        publishDate,
        image,
      } = req.body;

      if (!title || title.trim() === "") {
        return res.status(400).json({
          message: "Title is required",
        });
      }

      if (!body || body.trim() === "") {
        return res.status(400).json({
          message: "Body is required",
        });
      }

      if (!publishDate || isNaN(Date.parse(publishDate))) {
        return res.status(400).json({
          message: "Invalid publish date",
        });
      }

      const updatedNotice = await prisma.notice.update({
        where: {
          id,
        },
        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
          image,
        },
      });

      return res.status(200).json(updatedNotice);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to update notice",
      });
    }
  }

  // DELETE NOTICE
  if (req.method === "DELETE") {
    try {
      await prisma.notice.delete({
        where: {
          id,
        },
      });

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({
        message: "Failed to delete notice",
      });
    }
  }

  return res.status(405).json({
    message: "Method Not Allowed",
  });
}