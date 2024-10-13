import { Router, Request, Response } from "express";
import nodemailer from 'nodemailer'

export const emailRouter = Router();

emailRouter.post('/send', async (req: Request, res: Response) => {
    let transport = nodemailer.createTransport({
        service: 'Zoho',
        host: 'smtppro.zoho.eu',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    console.log(process.env.EMAIL)
    console.log(process.env.EMAIL_PASSWORD)
    
    let mailOptions = {
        from: 'Dmtreaqq Pavlov',
        to: req.body.email,
        subject: req.body.subject,
        html: req.body.message
    };

   const info = await transport.sendMail(mailOptions);
   console.log(info)

    return res.json({ message: "Email sent to " + req.body.email })
})