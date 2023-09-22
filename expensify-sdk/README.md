
# expensify-sdk
An sdk to integrate with expensify APIs

## Installation
```bash
npm install @michelo11/expensify-sdk
# OR
yarn add @michelo11/expensify-sdk
# OR
pnpm install @michelo11/expensify-sdk
```

## Usage
```typescript
import { createTransaction } "@michelo11/expensify-sdk";

createTransaction(
    [
        {
            description: "Example transaction",
            amount: 100,
            createdAt: new Date(),
            action: "DEPOSIT",
        },
    ],
    "ORGANIZATION ID",
    "API KEY"
).then(console.log);
```

