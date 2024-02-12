import db from "@/app/lib/db";
import { getAccounts } from "../../get-account";
import { INCOME, OUTCOME } from "@/app/types/accounts";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { fromAccount, toAccount, amount } = body;

  if (fromAccount.id === toAccount.id) {
    return new Response("You cannot transfer for the same account", {
      status: 404,
    });
  }

  if (amount > fromAccount.amount) {
    return new Response("You don't have much money to send", { status: 404 });
  }

  const data = await getAccounts();

  if (data?.checking?.id === fromAccount.id) {
    const newAmountChecking = fromAccount.amount - amount;
    await db.checking.update({
      data: {
        amount: newAmountChecking,
        checkingHistory: {
          connectOrCreate: {
            create: { amountTransfered: amount, type: OUTCOME },
            where: { id: data?.checking?.id },
          },
        },
      },
      where: { id: fromAccount.id },
    });

    const newAmountSaving = toAccount.amount + amount;
    await db.saving.update({
      where: { id: toAccount.id },
      data: {
        amount: newAmountSaving,
        savingHistory: {
          connectOrCreate: {
            create: { type: INCOME, amountTransfered: amount },
            where: { id: data?.saving?.id },
          },
        },
      },
    });

    return new Response(
      JSON.stringify({ message: "Transfer successfully done" }),
      { status: 201 }
    );
  }

  if (data?.saving?.id === fromAccount.id) {
    const newAmountSaving = fromAccount.amount - amount;
    await db.saving.update({
      where: { id: fromAccount.id },
      data: {
        amount: newAmountSaving,
        savingHistory: {
          connectOrCreate: {
            create: { amountTransfered: amount, type: OUTCOME },
            where: { id: data?.saving?.id },
          },
        },
      },
    });

    const newAmountChecking = toAccount.amount + amount;
    await db.checking.update({
      data: {
        amount: newAmountChecking,
        checkingHistory: {
          connectOrCreate: {
            create: { amountTransfered: amount, type: INCOME },
            where: { id: data?.checking?.id },
          },
        },
      },
      where: { id: toAccount.id },
    });

    return new Response(
      JSON.stringify({ message: "Transfer successfully done" }),
      { status: 201 }
    );
  }
}
