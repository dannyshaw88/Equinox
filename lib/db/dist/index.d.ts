import Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";
import * as schema from "./schema";
declare const sqlite: DatabaseType;
export { sqlite };
export declare const db: import("drizzle-orm/better-sqlite3").BetterSQLite3Database<typeof schema> & {
    $client: Database.Database;
};
export * from "./schema";
//# sourceMappingURL=index.d.ts.map