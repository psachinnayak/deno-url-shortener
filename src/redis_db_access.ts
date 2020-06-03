import { Redis, connect } from "https://denopkg.com/keroxp/deno-redis/mod.ts";



let redisConnection: Redis;


export interface IDbAccess {
    initialize: () => Promise<boolean>,
    getLongUrlForShortId: (shortId: string) => Promise<string | undefined>,
    existsShortId: (shortId: string) => Promise<boolean>,
    saveShortUrl: (longUrl: string, shortId: string) => Promise<boolean>
}

export class RedisDbAccess implements IDbAccess {
    async initialize() {
        const RedisConnectionDetails = {
            // Unsure why but hostname localhost fails. To be debugged if only in my system
            // "hostname":"localhost",
            "hostname": "127.0.0.1",
            "port": 6379
        };
        redisConnection = await connect(RedisConnectionDetails);

        let pong = await redisConnection.ping();
        console.debug(`${pong} got from redis`);

        return (pong == "PONG");
    };
    async getLongUrlForShortId(shortId: string) {

        let str = await redisConnection.get(`shortid.${shortId}`);
        return str;
    };
    async existsShortId(shortId: string) {
        let isExists = await redisConnection.exists("shortid." + shortId);
        console.debug(`isExists ${shortId} ${isExists}`);
        return isExists!=0;
    };
    async saveShortUrl(longUrl: string, shortId: string) {
        await redisConnection.set(`shortid.${shortId}`, longUrl);
        // TBD: Check if successful
        return true;
    }

}
