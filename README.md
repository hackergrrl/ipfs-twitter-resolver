# ipfs-twitter-resolver

> tiny CLI server for resolving `/twitter/user/key` to an [IPFS][] address

## background

[IPFS][] has a name resolution mechanism called IPNS, which will resolve
addresses of the form `/ipns/Qmfoobarbaz` to an IPFS address, where
`Qmfoobarbaz` is the [multihash][] of a public key. These are generally resolved
using a [DHT][]. DHTs have many great properties, but long-term survivability is
not one of them.

How swell would it be if you could make a tweet on Twitter like

```
blog = /ipfs/QmeV1kwh3333bsnT6YRfdCRrSgUPngKmAhhTa4RrqYPbKT
```

then hit a normal HTTP server on the URL
`http://example.com/twitter/noffle/blog` to get redirected to that IPFS address?
This is a pretty easy way to update the hash that say, a blog, points to.

## example

```js
$ npm install -g ipfs-twitter-resolver

$ ipfs-twitter-resolver &

$ curl -L http://localhost:8000/twitter/noffle/avatar
...
< HTTP/1.1 302 Found
< Location: https://ipfs.io/ipfs/QmdXZsi5GvsnKewXK35DypLxTzseR8tuVGyBLMQcBpEmMc/avatar.png
<
```

## install

With [npm](https://npmjs.org/) installed, run

```
$ npm install -g ipfs-twitter-resolver
```

## license

ISC

[IPFS]: https://ipfs.io
[multihash]: https://github.com/jbenet/multihash
[DHT]: https://en.wikipedia.org/wiki/Distributed_hash_table
