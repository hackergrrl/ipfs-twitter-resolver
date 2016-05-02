var kv = require('twitter-kv')
var qs = require('query-string')

var params = qs.parse(location.search)

if (!params.key) {
  document.write('need to specify "key" as a url param')
  return
}

var addr = params.key.split('/')
if (addr.length !== 4) return document.write('malform addr')
if (addr[0] !== '') return document.write('malformed addr')
if (addr[1] !== 'twitter') return document.write('malformed addr')

kv(addr[2], addr[3], function (err, value) {
  if (err) return console.error('err', err)
  document.write('value', value)
  // TODO: validate that value is an /ipfs or /ipns multiaddr
  //window.location = 'https://ipfs.io' + value
})
