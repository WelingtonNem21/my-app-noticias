import * as Sqlite from "expo-sqlite";
export type DB = Sqlite.SQLiteDatabase;

export async function getDB(): Promise<DB> {
  const db = await Sqlite.openDatabaseAsync("escola.db");

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS usuario(
        id Integer primary Key Autoincrement,
        nome Text NOT NULL,
        email TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS post (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        conteudo TEXT NOT NULL,
        curtidas INTEGER DEFAULT 0,
        usuario_id INTEGER,
        FOREIGN KEY (usuario_id) REFERENCES usuario(id)
        );
    `);

  return db;
}
