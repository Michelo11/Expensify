export async function login(clientId: string, clientSecret: string) {
  const r = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!r.ok) throw new Error(`Failed to login: ${r.statusText}`);

  const { access_token } = await r.json();
  return access_token;
}

export async function createWebhook(token: string, organization: string) {
  const r = await fetch("https://api-m.paypal.com/v1/notifications/webhooks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: `${process.env.NEXTAUTH_URL}/api/webhooks/paypal/${organization}`,
      event_types: [{ name: "PAYMENT.CAPTURE.COMPLETED" }],
    }),
  });

  if (!r.ok) throw new Error(`Failed to create webhook: ${r.statusText}`);
  const data = await r.json();
  return data;
}

export async function verifyWebhook(token: string, payload: any) {
  const res = await fetch(
    "https://api-m.paypal.com/v1/notifications/verify-webhook-signature",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) return false;
  const data = await res.json();

  return data.verification_status === "SUCCESS";
}
