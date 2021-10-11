const { S3, SQS } = require('aws-sdk')

async function handler() {
    const {
        QUEUE_QUEUE01: queue,
    } = process.env

    const file = 'Hello Altostra 🎉'

    const sqs = new SQS()
    await sqs.sendMessage({
        QueueUrl: queue,
        MessageBody: file,
    }).promise()
}

handler().then(
    console.log,
    console.error
)