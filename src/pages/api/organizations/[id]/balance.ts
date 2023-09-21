import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "../../../../lib/prisma";
import { authOptions } from "../../auth/[...nextauth]";
import { Transaction } from "@prisma/client";
import { isWithinInterval, startOfWeek, endOfWeek, isBefore, isAfter } from 'date-fns';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { id, range } = req.query;

  if (req.method === "GET") {
    try {
      const transactions = await prisma.transaction.findMany({
        where: {
          organization: {
            id: id as string,
            members: {
              some: {
                userId: session.user!.id,
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      let currentTransactions: Transaction[] = [];
      if (range === "all") {
        currentTransactions = transactions;
      } else if (range === "week") {
        const currentDate = new Date();
        const startDateOfCurrentWeek = startOfWeek(currentDate);
        const endDateOfCurrentWeek = endOfWeek(currentDate);

        currentTransactions = transactions.filter(
          (transaction) => isWithinInterval(transaction.createdAt, { start: startDateOfCurrentWeek, end: endDateOfCurrentWeek })
        );
      } else if (range === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        currentTransactions = transactions.filter(
          (transaction) => transaction.createdAt >= monthAgo
        );
      }


      let currentBalance = 0;
      let balance = 0;
      let savings = 0;
      let expenses = 0;
      for (const transaction of currentTransactions) {
        if (transaction.action === "DEPOSIT") {
          savings += transaction.amount;
          balance += transaction.amount;
        } else {
          expenses += transaction.amount;
          balance -= transaction.amount;
        }
      }

      for (const transaction of transactions) {
        if (transaction.action === "DEPOSIT") {
          currentBalance += transaction.amount;
        } else {
          currentBalance -= transaction.amount;
        }
      }

      res.status(200).json({
        balance: currentBalance,
        savings,
        expenses,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
