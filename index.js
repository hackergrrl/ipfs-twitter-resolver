var kv = require('twitter-kv')
var qs = require('query-string')

var params = qs.parse(location.search)

if (!params.key) {
  document.write('need to specify "key" as a url param')
  document.write('<br><br>')
  document.write('e.g. ?key=/twitter/noffle/blog')
  return
}

var addr = params.key.split('/')
if (addr.length !== 4) return document.write('malform addr')
if (addr[0] !== '') return document.write('malformed addr')
if (addr[1] !== 'twitter') return document.write('malformed addr')

document.write('Loading...<br><br>')

kv(addr[2], addr[3], function (err, value) {
  if (err) return document.write('err', err)
  document.write('<a href=https://ipfs.io' + value + '>' + value + '</a>')
  document.write('<br><br>redirecting..')

  // TODO: validate that value is an /ipfs or /ipns multiaddr

  setTimeout(function () {
    window.location = 'https://ipfs.io' + value
  }, 1700)
})
