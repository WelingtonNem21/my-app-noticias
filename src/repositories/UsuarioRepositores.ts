import { getDB } from "../database";
import { Usuario } from "../types/usuario";

export async function cadastrarUsuario(
  nome: string,
  email: string,
  senha: string
): Promise<void> {
  const db = await getDB();
  await db.runAsync(
    "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senha]
  );
}

export async function loginUsuario(
  email: string,
  senha: string
): Promise<Usuario | null> {
  const db = await getDB();
  const user = await db.getFirstAsync<Usuario>(
    "SELECT id, nome, email FROM usuario WHERE email = ? AND senha = ?",
    [email, senha]
  );
  return user ?? null;
}

export async function listarUsuarios(): Promise<Usuario[]> {
  const db = await getDB();
  return db.getAllAsync<Usuario>("SELECT id, nome, email FROM usuario ORDER BY id DESC");
}

export async function removerUsuario(id: number): Promise<void> {
  const db = await getDB();
  await db.runAsync("DELETE FROM usuario WHERE id = ?", [id]);
}
