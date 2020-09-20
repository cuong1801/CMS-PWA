/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const favicon = require('serve-favicon')
const dotenv = require('dotenv')
dotenv.config()

app.use(express.static(path.join(__dirname, 'dist'), { index: false, extensions: ['html'] }))
app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')))

app.get('/*', function (_, res) {
    res.sendFile(__dirname + '/dist/index.html')
})

const port = process.env.PORT || 3007
const httpServer = http.createServer(app)
httpServer.listen(port)
console.log('> Ready on http://localhost:' + port)
