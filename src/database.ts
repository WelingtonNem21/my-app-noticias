import * as Sqlite from "expo-sqlite";

export type DB = Sqlite.SQLiteDatabase;

export async function getDB(): Promise<DB> {
  const db = await Sqlite.openDatabaseAsync("noticias.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS usuario(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS post (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      conteudo TEXT NOT NULL,
      imagem TEXT,
      curtidas INTEGER DEFAULT 0,
      usuario_id INTEGER,
      FOREIGN KEY (usuario_id) REFERENCES usuario(id)
    );
  `);

  try {
    await db.execAsync(`ALTER TABLE post ADD COLUMN imagem TEXT`);
  } catch {}

  try {
    await db.execAsync(`ALTER TABLE post ADD COLUMN favorito INTEGER DEFAULT 0`);
  } catch {}

  return db;
}
