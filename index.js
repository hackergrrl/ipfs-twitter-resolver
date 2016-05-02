#!/usr/bin/env node

var kv = require('twitter-kv')
var http = require('http')

var argv = require('minimist')(process.argv.slice(2));

if (argv.h || argv.help) {
  console.error('USAGE: ipfs-twitter-resolver [-p|--port 80] [-g|--gateway https://ipfs.io]')
  process.exit(1)
}

var gateway = argv.g || argv.gateway || 'https://ipfs.io'
var port = argv.p || argv.port || 8000

http.createServer(function (req, res) {
  var addr = req.url.split('/')
  if (addr.length !== 4) return res.end('malform addr')
  if (addr[0] !== '') return res.end('malformed addr')
  if (addr[1] !== 'twitter') return res.end('malformed addr')

  kv(addr[2], addr[3], function (err, value) {
    if (err) return res.end(err)
    if (!value) { res.statusCode = 404; return res.end() }

    res.writeHead(302, { 'Location': gateway + value })
    res.end()
  })
}).listen(port, function ready () {
  console.error('port', port)
  console.error('gateway', gateway)
})

