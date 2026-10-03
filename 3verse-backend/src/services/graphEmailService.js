import { ClientSecretCredential } from "@azure/identity";

const GRAPH_SCOPE = "https://graph.microsoft.com/.default";

const getCredential = () => {
  const { MICROSOFT_TENANT_ID, MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET } =
    process.env;

  if (
    !MICROSOFT_TENANT_ID ||
    !MICROSOFT_CLIENT_ID ||
    !MICROSOFT_CLIENT_SECRET
  ) {
    throw new Error(
      "Microsoft Graph email is not configured. Please set MICROSOFT_TENANT_ID, MICROSOFT_CLIENT_ID, and MICROSOFT_CLIENT_SECRET.",
    );
  }

  return new ClientSecretCredential(
    MICROSOFT_TENANT_ID,
    MICROSOFT_CLIENT_ID,
    MICROSOFT_CLIENT_SECRET,
  );
};

const getAccessToken = async () => {
  const credential = getCredential();

  const token = await credential.getToken(GRAPH_SCOPE);

  if (!token) {
    throw new Error("Unable to get Microsoft Graph access token.");
  }

  return token.token;
};

export const sendEmail = async ({ to, subject, html }) => {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${process.env.MICROSOFT_SENDER_EMAIL}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject,
          body: {
            contentType: "HTML",
            content: html,
          },
          toRecipients: [
            {
              emailAddress: {
                address: to,
              },
            },
          ],
        },
        saveToSentItems: true,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return true;
};
