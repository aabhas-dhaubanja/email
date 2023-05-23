import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aabhas41@gmail.com",
    pass: process.env.PASS,
  },
});

const app = express();

app.use(cors());

app.use(express.json());

app.post("/", (req, res) => {
  if (!req?.body?.name || !req?.body?.email || !req?.body?.message) {
    res.status(400).send("invalid payload");
  }

  const mailOptions = {
    from: "aabhas41@gmail.com", // sender address
    to: "aabhas41@gmail.com", // list of receivers
    subject: "From aabhasdhaubanja.com.np <Contact Form>", // Subject line
    html: `<p>Name: ${req.body.name}, Email: ${req.body.email}, Message: ${req.body.message}</p>`, // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.error(err);
      res.status(400).send(err);
    } else res.send("successful");
  });
});

app.listen(3000, () => console.log("listening on port 3000..."));
