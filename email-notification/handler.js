const AWS = require('aws-sdk')
AWS.config.update({
  region: process.env.AWS_REGION
})
const SNS = new AWS.SNS()

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: 587,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_FROM_PASSWORD
  },
});

module.exports.send = async event => {
  const emailPromises = []
  for (const record of event.Records) {
    const message = JSON.parse(record.body).Message

    emailPromises.push(
      transporter.sendMail({
        from: `"Reservas 👻" ${process.env.EMAIL_FROM}`,
        to: process.env.EMAIL_TO,
        subject: "✔ Reserva Efetuada",
        text: message,
        html: message
      })
    )
  }
  await Promise.all(emailPromises)
  console.log('Done')
  return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
