const AWS = require('aws-sdk')
AWS.config.update({
  region: process.env.AWS_REGION
})

const documentClient = new AWS.DynamoDB.DocumentClient()
const { v4: uuid } = require('uuid');

module.exports.create = async (event) => {
    const body = JSON.parse(event.body)
    await documentClient.put({
        TableName: process.env.DYNAMODB_BOOKINGS,
        Item: {
            id: uuid(),
            date: body.date,
            user: event.requestContext.authorizer
        }
    }).promise()
    // event.requestContext.authorizer
    return {
        statusCode: 200,
        body: JSON.stringify({message: 'Reserva criada'})
    }
}