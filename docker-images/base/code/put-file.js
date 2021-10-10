const { S3 } = require('aws-sdk')

async function handler() {
    const bucket = process.env.BUCKET_BUCKET01
    const key = 'files/hello.txt'

    const s3 = new S3()
    await s3.putObject({
        Bucket: bucket,
        Key: key,
        Body: Buffer.from('Hello Altostra 🎉', 'utf-8')
    }).promise()
}

handler().then(
    console.log,
    console.error
)