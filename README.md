# deno-url-shortner
This project is a personal project being written to explore Deno.land

## Prerequisite:
- Deno should be installed and available in $PATH (should be executable in Shell)
- Redis should be up and running on 127.0.0.1, port 6379. In case the server details are different edit the file in src/redis_db_access.ts


## How to Test it out:
To execute this application execute the below commands in a new Shell (bash is one such shell):
```bash
cd src
deno run --allow-net app.ts
```

It attempts to utilize redis as the backend, and generate short URLs when /generate is called. Sample for the call to generate:

```curl
curl -X POST -H "Content-Type:application/json" -d '{"url":"https://blog.sachinnayak.info"}' http://localhost:8000/shorten
```

This provides a JSON response. In this JSON response a property *shortUrl* contains the shortened URL.

## Inspiration:
I recently was reading a blog post where the individual was writing a URL shortner in NodeJS. I was wanting to explore deno.land since some time, so decided to write a URL shortener in Deno.

## TBD:
- Had a failure with using localhost in redis hostname. Need to debug if this is a problem with my system or generic to deno / connect
- Cleaned up redis_db_access to use interface, so a different backend can be used. Rest of the classes have all methods / functions exposed at the top level.

## Disclaimer:
This is a simple and very insecure URL Shortener written in Deno.

Do *NOT* expect this application to be supported. This to never planned to be PRODUCTION ready. You should *NO*T run this in production. 

