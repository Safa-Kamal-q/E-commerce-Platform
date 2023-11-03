import nodemailer from 'nodemailer'

//Note: we use https://mailtrap.io/inboxes/2471699/messages/3820304553 to test email 

const sendEmail = async (option: any) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const emailOptions = {
        from: 'Cineflix support<support@cineflix.com>',
        to: option.email,
        subject: option.subject,
        text: option.message
    }
    await transport.sendMail(emailOptions)
}
export {
    sendEmail
}