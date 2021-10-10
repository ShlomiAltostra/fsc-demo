const { S3, SQS } = require('aws-sdk')

async function handler() {
    const {
        BUCKET_BUCKET01: bucket,
        QUEUE_QUEUE01: queue,
        EVENT: eventJSON,
    } = process.env
    const event = JSON.parse(eventJSON)
    const {
        Records: [{
            s3: {
                object: { key }
            }
        }]
    } = event

    console.log({
        bucket,
        queue,
        key,
    })

    const s3 = new S3()
    const { Body: file } = await s3.getObject({
        Bucket: bucket,
        Key: key,
    }).promise()

    console.log(file)

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