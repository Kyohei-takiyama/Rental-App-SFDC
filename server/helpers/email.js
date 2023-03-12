import * as config from "../config.js";

export const emailTemplate = (email, content, replyTo, subject) => {
  return {
    Source: config.constants.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
              <html>
              <h1>ようこそ</h1>
              ${content}
              <p>&copy; ${new Date().getFullYear()}</p>
          </html>
                    `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Test sending from SFDC app",
      },
    },
  };
};
