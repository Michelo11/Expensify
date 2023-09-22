import axios from "axios";

export interface Transaction {
  description: string;
  amount: number;
  createdAt: Date;
  action: "WITHDRAW" | "DEPOSIT";
}

export async function createTransaction(
    transactions: Transaction[],
    organizationId: string,
    clientSecret: string
  ) {
    const { data } = await axios.post(
      `http://localhost:3000/api/organizations/${organizationId}/external/push`,
      {transactions},
      {
        headers: {
          authorization: clientSecret,
        },
      }
    );
    return data;
  }
