import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "d1c5820b30933c4e2af7ba29ea997fe0",
  },
});
