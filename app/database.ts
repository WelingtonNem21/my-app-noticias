import * as Sqlite from 'expo-sqlite'
export type DB = Sqlite.SQLiteDatabase;

export async function getDB(): Promise<DB> {
const db = await Sqlite.openDatabaseAsync('escola.db')

await db.execAsync(`
        CREATE TABLE IF NOT EXISTS alunos(
        id Integer primary Key Autoincrement,
        nome Text NOT NULL,
        email TEXT NOT NULL
        );
    `)

    return db
}