import { startServer } from "./server.ts";
import { handleConnections } from "./server_impl.ts";
import { RedisDbAccess } from "./redis_db_access.ts";



let db = new RedisDbAccess();
let success = db.initialize();

if (success) {
    const s = startServer();
    handleConnections(s, db);
}
