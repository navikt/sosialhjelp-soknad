var express = require('express')
var app = express()
var path = require('path')
const port = process.env.PORT

app.get("*/static/*", (req, res) => {
  //let path = req.params[0].replace("/soknadsosialhjelp/", "");
  console.log(`request path: ${req.path}. serving: ${path.resolve(__dirname, "build/static", req.params[1])}`)
  //console.dir(req)
  res.sendFile(path.resolve(__dirname, "static", req.params[1]))
})

app.get("/soknadsosialhjelp/statisk/*", (req, res) => {
  console.log(`statisk ${req.path}`)
  res.sendFile(path.resolve(__dirname, "statisk", req.params[0]))
})

app.get("/soknadsosialhjelp/*", (req, res) => {
  console.log(`route  ${req.path}`)
  res.sendFile(path.resolve(__dirname, "EllaBlunk.less.html"))
})

app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`)
})
