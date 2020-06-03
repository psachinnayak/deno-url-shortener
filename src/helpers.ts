
import { ServerRequest } from "https://deno.land/std@0.54.0/http/server.ts";

export async function readBody(req: ServerRequest) {
    let body = "";
    const lengthOfBody = 10;
    let data = new Uint8Array(100);
    let tmp = await req.body.read(data);
    console.log(`tmp is ${tmp}`);
    while (tmp) {


        let contentStr = new TextDecoder().decode(data.slice(0, tmp));
        body += contentStr;
        console.log(`New tmp is ${data}`)

        tmp = await req.body.read(data);
    }
    console.log(`The body is ${body}`);
    let contentType = req.headers.get("content-type");
    if (contentType) {
        contentType = contentType.toLowerCase();
    }
    let parsedBody = null;
    switch (contentType) {
        case "application/json":
            if (body && body.length > 0) {
                body = body.trim();
                if (body.startsWith("{")) {
                    console.debug(`About to parse body ${body}`)
                    parsedBody = JSON.parse(body);
                }
            }
            break;
        // default: break;
    }

    return parsedBody;
}

export function notFound(req: ServerRequest) {
    req.respond({ status: 404, body: "Not Found" });
}