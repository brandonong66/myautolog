function logRequests(req, res, next) {
  console.log(`Request: ${req.method} ${req.url}, Body: `, req.body)
  const oldWrite = res.write
  const oldEnd = res.end
  const chunks = []
  res.write = (...restArgs) => {
    chunks.push(Buffer.from(restArgs[0]))
    oldWrite.apply(res, restArgs)
  }
  res.end = (...restArgs) => {
    if (restArgs[0]) {
      chunks.push(Buffer.from(restArgs[0]))
    }
    const body = Buffer.concat(chunks).toString("utf8")
    console.log(`Response: ${res.statusCode}, Body: `, body)
    oldEnd.apply(res, restArgs)
  }
  next()
}

export default logRequests
