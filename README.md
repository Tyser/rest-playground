# REST Playground

Table of Contents

## HTTP

HTTP is a communication protocol defined primarily for the use of communicating
over the Internet. It's a set of standards for text transfer over the wire.
These standards are important for servers and systems to interpret the
intentions of clients.

### Anatomy of an HTTP Request

Here is what the raw text of an HTTP request looks like:

```
GET / HTTP/1.1
Host: www.google.com
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36
Accept-Encoding: gzip,deflate,sdch
Accept-Language: en-US,en;q=0.8
If-Modified-Since: Tue, 07 Feb 2012 04:44:06 GMT
```

All that stuff before the `<!doctype>` is called collectively, the Headers.
Let's break it down:

```
GET / HTTP/1.1
```

The above specifies that the request used the `GET` HTTP verb. When you type
a web address into the browser bar, it will by default use the `GET` verb. We'll
talk more about HTTP verbs later. This line also specifies that we made a
request to the root url `/`. Also, we are sending that we're using the
`HTTP/1.1` protocol. This helps the server determine whether or not it supports
this type of request.

```
Host: www.google.com
```

This Header value tells which host we're making the request to. This helps the
DNS and other servers direct your request to the correct host.

The other Headers to different things based on the the server implementation,
but these help the server to accommodate the requester.

* `Connection: keep-alive` Tells the server or proxy to keep the connection
  alive because we might make some more requests.
* `Cache-Control: max-age=0` Tells the server that we want a fresh copy of the
  page, not a cached version.
* `Accept: text/html,...` Tells the server what format we want to data to come
  back in. You can send multiple values if you would accept multiple types, but
  the server will only send one back, and probably the one you preferred.
* `User-Agent: Mozilla/5.0 ...` Tells the server what kind of user agent is
  making the request. Browsers will send this automatically, but you can have
  plugins that will spoof other user-agents to trick servers into sending you
  different content. That's kind of like signing up for a new service with a
  fake name and email.
* `Accept-Encoding: gzip,deflate,sdch` Tells the server that they can encode
  the data (zipped, compressed, etc.), and the client will decode the response.
* `Accept-Language: en-US,en;q=0.8` Tells the server to accept a different
  language, if the contents might change based on the locale.
* `If-Modified-Since: Tue, 07 Feb 2012 04:44:06 GMT` Tells the server, "I
  already have a copy of this page that I requested at this time. If it hasn't
  changed since then, just tell me that it hasn't changed so I don't have to
  process a full body response."

The empty line after that signifies the end of the headers, and that the request
body will be contained after that. Request bodies are not usually parsed in
`GET` requests.

### Anatomy of an HTTP Response

Once we've made the request, we await the response. Here's what a response might
look like:

```
HTTP/1.1 200 OK
Cache-Control: private, max-age=0
Content-Encoding: gzip
Content-Length: 7293
Content-Type: text/html; charset=ISO-8859-1
Date: Sat, 03 Oct 2015 20:42:48 GMT

<!doctype><html>...</html>
```

Let's break it down like we did the request:

```
HTTP/1.1 200 OK
```

The first line specifies how the response should be handled. This specifies the
HTTP version used in response, the HTTP status code (`200`), and the status
message, which in the case of `200` means OK, or the response was successful.
We'll expound more on status codes in a bit.

Here's what the rest of the response headers mean:

* `Cache-Control: private, max-age=0` Says that this is the most up to date
  version.
* `Content-Encoding: gzip` Says that the response is gzipped.
* `Content-Length: 7293` Tells how long the response body is, so that the client
  can use this to parse only what's needed.
* `Content-Type: text/html; charset=ISO-8859-1` This specifies the content-type
  that was actually sent back, based on the request's `Accept:` header.
* `Date: Sat, 03 Oct 2015 20:42:48 GMT` This is the date that the request was
  successfully processed.

The empty line break after the headers signifies that the start of the response
will be after this. In this case, it was the `<!doctype><html>...</html>`, which
obviously expands out to the full html page.

### Verbs

HTTP Verbs are an expressive way of telling the server *what* we want to do with
a specific online resource. There are 26 accepted HTTP verbs, but most actions
can be defined in just a handful of those.

If you've done any PHP, you've probably used the `$_GET` and `$_POST` variables
to access form data. Those are referring to HTTP verbs. Before we get into some
more common HTTP verbs, you should understand a common acronym used to describe
common database actions:

* **C**reate - Create a record
* **R**ead - Retrieve a record
* **U**pdate - Update a record
* **D**elete - Delete a record

The most common HTTP verbs correspond with these actions:

* `GET` - Read
* `POST` - Create
* `PUT/PATCH` - Update
* `DELETE` - Delete

Some other ones to be aware of are and what they mean to the server:

* `HEAD` - Don't process the request, just give me back the headers you would
  send back in a normal request
* `OPTIONS` - Asks the user what HTTP verbs the url uses. This needs to be
  supported by the server in order to make Cross Origin Resource Sharing, which
  allows requests originated from different hosts to make requests to the
  server. This is mostly just a browser security measure, but if you run into
  that error in the console, that's what's going on.

### Status Codes

Status codes are not nearly as well used as they should be, and it's one of the
most useful things in debugging both client and server applications.

Status Codes let the client know the status of the response; whether it failed,
succeeded, why it failed, who's fault it probably was, or how the next response
should take place.

[Here](http://www.restapitutorial.com/httpstatuscodes.html) you can view all of
the status codes in use today, but here are the ones you should be familiar
with:

* `200 OK` The request was successful according to the parameters sent in the
  request.
* `201 Created` The request was successful and created the object intended.
  Used a lot with the `POST` request
* `204 No Content` The request was successful, but there is no response body.
* `301 Moved Permanently` The resource that was request was moved to a new
  location (specified in the `Location:` header). The Client should make record
  of the move
* `304 Not Modified` This is sent if the server has determined from the request
  that the client has an adequately up to date version of the response (based
  on the `If-Modified-Since:` header). No response body should be sent. This is
  often sent by the browser as an interception to a request made to a resource
  that still falls within the cache window. You need to clear the browser cache
  in order to refresh the response.
* `400 Bad Request` This usually means that there was some kind of validation
  error, usually within the request body, but this can also happen if an invalid
  Header was sent.
* `401 Unauthorized` This means that the server has determined that the
  requestor needs to be logged in to verify a requestor's identity.
* `403 Forbidden` This means that the server understood the request, but is
  refusing to fulfill the request, usually if a user doesn't have access to a
  specific resource.
* `404 Not Found` The server could not determine or find the resource requested.
  This is similar to `410 Gone`, but `410` means that the server did have a
  resource existed at that endpoint, but is gone. Depending on the database
  setup, it may not be possible to determine if it's `410 Gone`.
* `500 Internal Server Error` An error happened on the server. From this   
  response code, it's not the client's fault, and repeating the request will
  most likely result in the same error.

If you'll notice, the first digit in the status code split up the status codes
into different general meaning:

* `2xx` - Successful Response
* `3xx` - Redirection
* `4xx` - Client Error (The server determined that the client must change the   
  request in order to proceed)
* `5xx` - Server Error (The server ran into an unhandled error)

The more you use them, the better you'll be able to debug your http requests.

After having this basic understanding of HTTP, it will be much easier to
understand what REST is all about.

## REST

REST stands for **RE**presentational **S**tate **T**ransfer. It is a set of
guidelines/contsraints for building maintainable and scalable APIs
(**A**pplication **P**rogamming **I**nterface), specifically, HTTP APIs.

The main set of guidelines can be boiled down to these:

1. **Uniform Interface** Resource based, which means that each url represents
  a unique resource. Think of resources as nouns, and not verbs. That's what
  HTTP verbs are for.
2. **Stateless** This means that the server can determine everything that it
  needs to do based on the request.
3. **Cacheable** The resources should be cacheable for some given amount of
  time. This will lighten the load on the server, and reduce the amount of
  processing that the client will need to do.
4. **Client-Server** A RESTful API should be split out from the client logic.
  This makes the API more scalable, and allows multiple clients to consume the
  same API.
5. **Layered System** Intermediary systems like proxies and load balancers may
  improve scalability and performance, and as long as the servers are stateless,
  it should have no problem with this scalability.

Here are the considerations you want to make when designing a RESTful API:

* Correctly use the HTTP verbs for the different actions that take place with
  the data.
* Send back accurate status codes to the client.
* Give sensible resource names
  * **Good** /users/12345
  * **Bad** /api?type=user&id=12345
* Use plural names instead of singular names for consistency
  * **Good** /users   /users/12345
  * **Bad** /users   /user/12345

### Examples

Let's say there is a data model that looks like this for a user:

```json
{
  "id": "1",
  "email": "test@email.com",
  "firstName": "Jack",
  "lastName": "Black",
}
```

If we wanted to get a list of users, we would make a `GET` request to `/users`

```
GET /users HTTP/1.1
Host: ...
```

and we would get back

```
HTTP/1.1 200 OK
...

[
  {
    "id": "1",
    "email": "test@email.com",
    "firstName": "Jack",
    "lastName": "Black"
  }
]
```

Now if we wanted to create a new user, we would send the following request:

```
POST /users HTTP/1.1
Host: ...
...

{
  "email": "my@email.com",
  "firstName": "Matt",
  "lastName": "Damon"
}
```

and if it was successful, we would get back:

```
HTTP/1.1 201 Created
...

{
  "id": "2",
  "email": "test@email.com",
  "firstName": "Matt",
  "lastName": "Damon"
}
```

Now if we wanted to retrieve a specific user's info, we could do:

```
GET /users/2 HTTP/1.1
Host: ...
```

and we would get back:

```
HTTP/1.1 200 OK
...

{
  "id": "2",
  "email": "test@email.com",
  "firstName": "Matt",
  "lastName": "Damon"
}
```

If we want to delete a user, we could do:

```
DELETE /users/2 HTTP/1.1
...
```

We would get back:

```
HTTP/1.1 204 No Content
...
```

So if we tried to get it again:

```
GET /users/2 HTTP/1.1
...
```

We would get back:

```
HTTP 404 Not Found
...
```

# Interactive Playground

For a more interactive experience, go to
[http://rest-playground.herokuapp.com](http://rest-playground.herokuapp.com) and
play around with creating people and pets for those people. Note that whenever
the app resets, the data will reset as well. It's justing keeping everything
in memory for *playing* purposes.
