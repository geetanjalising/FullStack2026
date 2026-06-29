// const nodemailer = require("nodemailer");

// const sendEmail = async (to, subject, html) => {
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         }
//     });

//     await transporter.sendMail({
//         from: `"ItSuitsUhh Support" <${process.env.EMAIL_USER}>`,
//         to,
//         subject,
//         html   // ✅ use parameter
//     });
// };

// module.exports = sendEmail;


//using resend because above way was not compatible for render, but through resent u can only mail to the client throught which it is logined
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
    const { error } = await resend.emails.send({
        from: "ItSuitsUhh Support <onboarding@resend.dev>", // works without custom domain
        to,
        subject,
        html
    });

    if (error) {
        console.error("❌ Resend error:", error);
        throw new Error(error.message);
    }

    console.log("✅ Email sent via Resend");
};

module.exports = sendEmail;