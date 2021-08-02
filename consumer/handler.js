const AWS = require('aws-sdk')
AWS.config.update({
  region: process.env.AWS_REGION
})

const SNS = new AWS.SNS()

const converter = AWS.DynamoDB.Converter
const moment = require('moment')
moment.locale('pt-br')

module.exports.listen = async event => {
  const snsPromises = []
  for (const record of event.Records) {
    if (record.eventName === 'INSERT') {
      const reserva = (converter.unmarshall(record.dynamodb.NewImage))
      snsPromises.push(SNS.publish({
        TopicArn: process.env.SNS_NOTIFICATION_TOPIC,
        Message: `Reserva efetuada por: ${reserva.user.name} (${reserva.user.email}) para ${moment(reserva.date).format('LLLL')}`
      }).promise())
    }
  }
  await Promise.all(snsPromises)
  console.log('Mensagens enviadas para a fila')
  return { message: 'OK'}
};
