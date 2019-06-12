var express = require('express')
var app = express()
var path = require('path')
const port = process.env.PORT

app.get("/soknadsosialhjelp/static/*", (req, res) => {
  console.log(`static ${req.path}`)
  res.sendFile(path.resolve(__dirname, "static", req.params[0]))
})

app.get("/soknadsosialhjelp/statisk/*", (req, res) => {
  console.log(`static ${req.path}`)
  res.sendFile(path.resolve(__dirname, "soknadsosialhjelp/statisk", req.params[0]))
})

app.get("/soknadsosialhjelp/*", (req, res) => {
  console.log(`route  ${req.path}`)
  res.sendFile(path.resolve(__dirname, "index.html"))
})

app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`)
})
