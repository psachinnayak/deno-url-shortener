# deno-url-shortner
This is a simple URL Shortener written in Deno.

Do *NOT* expect this application to be supported. And do not believe this to be PRODUCTION ready. You should *NO*T run this in production. 

This project is a personal project being written to explore Deno.land

It attempts to utilize redis as the backend, and generate short URLs when /generate is called. Sample for the call to generate:

```curl
curl -X POST -H "Content-Type:application/json" -d '{"url":"https://blog.sachinnayak.info"}' http://localhost:8000/generate
```

This provides a JSON response, with a property shortUrl containing the short URL.

You need to have redis running on 127.0.0.1:6379. If you want to test it with a different server, set the corresponding hostname in src/data.ts
