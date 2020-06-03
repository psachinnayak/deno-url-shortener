import { Server } from "https://deno.land/std@0.54.0/http/server.ts";
import { readBody, notFound } from "./helpers.ts";

import { existsShortId, saveShortUrl, getLongUrlForShortId } from "./data.ts";

import ShortUniqueId from 'https://cdn.jsdelivr.net/npm/short-unique-id@latest/short_uuid/mod.ts';




export async function handleConnections(server: Server) {
    for await (const req of server) {
        let url = req.url;
        console.log(`Url  being called is ${url}. Headers sent are ${req.headers.get("Content-type")}`);

        if (url) {
            if (url.startsWith("/")) {
                url = url.substr(1);
            }

            let tmpUrl = url.toLowerCase();
            switch (tmpUrl) {
                case "myblog":
                    let headers = new Headers();
                    headers.set("Location", "https://blog.sachinnanayak.info");
                    req.respond({ status: 302, headers: headers });
                    break;
                case "generate":
                    if (req.method == "POST") {
                        let body = await readBody(req);
                        console.debug(`Generate api called. With Body as ${body} (${body.url}) `);
                        if (body && body.url) {
                            console.debug(`Api called. About to generate a short url for ${body.url}`)
                            let shortId = null;
                            for (let retry = 3; retry > 0; retry--) {
                                let uid = new ShortUniqueId();
                                shortId = uid();
                                console.debug(`ShortId generated is ${shortId}`);
                                let isExists = await existsShortId(shortId);
                                if (!isExists) {
                                    console.log(`ShortId ${shortId} does not exist in the DB. Trial number (${retry}). ${isExists}`);
                                    break;
                                } else {
                                    console.debug(`ShortId ${shortId} exists in the DB. Trial number (${retry}). ${isExists}`);
                                    shortId = null;
                                }
                            }
                            console.debug(`Gemerated shortId ${shortId} for long url`);
                            if (shortId) {
                                await saveShortUrl(body.url, shortId);

                                let headers = new Headers();
                                // We will not be checking if the caller understands 
                                headers.set("content-type", "application/json");
                                body = JSON.stringify({
                                    "shortUrl": `https://short.sachinnayak.info/${shortId}`
                                });
                                console.log()
                                req.respond({
                                    status: 201,
                                    body: body,
                                    headers: headers
                                });
                            } else {

                                let headers = new Headers();
                                // We will not be checking if the caller understands json. 
                                // 
                                headers.set("content-type", "application/json");
                                req.respond({ status: 500, body: JSON.stringify({ code: 0, "error_message": "Unexpected Server Error. Please retry" }) });
                            }

                        } else {
                            let errorMsg = (body) ? "Bad Request. Unexpected Content Type or Content." : "Required Parameter 'url' not in request body";
                            req.respond({ status: 400, body: errorMsg });
                        }
                    }
                    break;
                // case "":
                // break;
                default:
                    if (existsShortId(url)) {
                        getLongUrlForShortId(url);
                    }else{

                    }
                // notFound(req);

            }

            // if (url == "google") {
            //     let headers = new Headers();
            //     headers.set("Location", "http://www.google.com")
            //     req.respond({ status: 302, headers: headers });
            // }
        }
        else {
            notFound(req);
        }
    }
}