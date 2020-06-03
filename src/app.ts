import { startServer } from "./server.ts";
import { handleConnections } from "./server_impl.ts";
import { connectDb } from "./data.ts";





let success = connectDb();

if (success) {
    const s = startServer();
    handleConnections(s);
}
