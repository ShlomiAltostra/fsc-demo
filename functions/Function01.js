const { ECS } = require('aws-sdk')

module.exports.handler = async ({
  Records: [{ body }]
}) => {
  const ecs = new ECS()

  const {
    TASK_DEF_FSC: taskDef,
    SERVERLESS_CLUSTER: cluster,
  } = process.env

  console.log({
    taskDef,
    cluster,
    body,
  })

  await ecs.runTask({
    taskDefinition: taskDef,
    overrides: {
      containerOverrides: [{
        name: 'LogFile01Container',
        environment: [{
          name: 'FILE',
          value: body,
        }]
      }]
    },
    cluster,
    launchType: 'FARGATE',
    networkConfiguration: {
      awsvpcConfiguration: {
        subnets: [
          'subnet-0314c10ed209b1f69',
          'subnet-07e27daff27fdd40d',
        ],
        assignPublicIp: 'ENABLED',
      }
    }
  }).promise()
}