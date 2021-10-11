async function handler(...args) {
    console.log(process.env.FILE)
}

handler().then(
    console.log,
    console.error
)