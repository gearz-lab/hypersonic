declare class Connection {
    close(): void;
}
declare class Runnable {
    get(id:string): Runnable;
    filter(filter:any): Runnable;
    insert(obj:any): Runnable;
    run(connection:Connection, callback:(error:any, next:any) => void): void;
}
declare class Database {
    table(name:string): Runnable;
}
declare module rethinkdb {
    declare function db(dbName:string):Database;
}