import {createTransport} from "nodemailer";

const pass = `${process.env.API_KEY_1}${process.env.API_KEY_2}`

const nodemailer = createTransport({
    host: "smtp.sendgrid.net",
    port: 25,
    auth: {
      user: "apikey",
      pass: pass,
    },
    tls: {
        rejectUnauthorized: false
    }
})

interface IMailOptions {
    to: string,
    text?: string,
    html?: string,
    subject: string,
}

const sendMail = async(opts: IMailOptions) => nodemailer.sendMail({ ...opts, from: process.env.EMAIL_FROM })

export {sendMail}