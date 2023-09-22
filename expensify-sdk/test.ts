import { createTransaction } from ".";

createTransaction(
    [
        {
            description: "test",
            amount: 100,
            createdAt: new Date(),
            action: "DEPOSIT",
        },
    ],
    "clmu7jhcb00035v6wz65ljzd8",
    "1234"
).then(console.log);