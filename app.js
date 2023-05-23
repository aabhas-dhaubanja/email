"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "aabhas41@gmail.com",
        pass: process.env.PASS,
    },
});
const port = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/", (req, res) => {
    var _a, _b, _c;
    if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.name) || !((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.email) || !((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.message)) {
        res.status(400).send("invalid payload");
    }
    const mailOptions = {
        from: "aabhas41@gmail.com",
        to: "aabhas41@gmail.com",
        subject: "From aabhasdhaubanja.com.np <Contact Form>",
        html: `<p>Name: ${req.body.name}, Email: ${req.body.email}, Message: ${req.body.message}</p>`, // plain text body
    };
    console.log(process.env.PASS);
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        else
            res.send("successful");
    });
});
app.listen(port, () => console.log(`listening on port ${port}...`));
