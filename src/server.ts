import { serve } from "https://deno.land/std@0.54.0/http/server.ts";

const PortNumber = 8000;


export function startServer(){
    const s = serve({ port: PortNumber });
    console.log(`Started server on ${PortNumber}`)

    return s;
}
