#!/usr/bin/env node

var kv = require('twitter-kv')
var http = require('http')

http.createServer(function (req, res) {
  var addr = req.url.split('/')
  if (addr.length !== 4) return res.end('malform addr')
  if (addr[0] !== '') return res.end('malformed addr')
  if (addr[1] !== 'twitter') return res.end('malformed addr')

  kv(addr[2], addr[3], function (err, value) {
    if (err) return res.end(err)
    if (!value) { res.statusCode = 404; return res.end() }

    res.writeHead(302, { 'Location': 'https://ipfs.io/' + value })
    res.end()
  })
}).listen(8000)

