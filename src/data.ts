import { Redis, connect } from "https://denopkg.com/keroxp/deno-redis/mod.ts";



let redisConnection:Redis;

export async function connectDb() {

    const RedisConnectionDetails = {
        // Unsure why but hostname localhost fails
        "hostname": "kubernetes.docker.internal",
        // "hostname":"localhost",
        // "hostname": "127.0.0.1",
        "port": 6379
    };
    redisConnection = await connect(RedisConnectionDetails);

    let pong = await redisConnection.ping();
    console.log(`${pong} got from redis`);

    return (pong == "PONG");

}


export async function getLongUrlForShortId(shortId:string){

    let str = await redisConnection.get(shortId);
    return str;
}

export async function existsShortId(shortId:string){
    let isExists = await redisConnection.exists("shortid." + shortId);
    console.log(`isExists ${isExists}`);
    return isExists;

}
export async function saveShortUrl(longUrl: string, shortId: string) {
    await redisConnection.set("shortid." + shortId, longUrl);
    // TBD: Check if successful
    return true;
}