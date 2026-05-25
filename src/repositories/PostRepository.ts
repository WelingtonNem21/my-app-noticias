import { getDB } from "../database";
import { Post } from "../types/post";

export async function criarPost(
  titulo: string,
  conteudo: string,
  usuarioId: number,
  imagem: string | null = null
): Promise<void> {
  const db = await getDB();
  await db.runAsync(
    "INSERT INTO post (titulo, conteudo, imagem, usuario_id) VALUES (?, ?, ?, ?)",
    [titulo, conteudo, imagem, usuarioId]
  );
}

export async function listarPosts(): Promise<Post[]> {
  const db = await getDB();
  return db.getAllAsync<Post>("SELECT * FROM post ORDER BY id DESC");
}

export async function getPostById(id: number): Promise<Post | null> {
  const db = await getDB();
  const post = await db.getFirstAsync<Post>("SELECT * FROM post WHERE id = ?", [id]);
  return post ?? null;
}

export async function curtirPost(id: number): Promise<void> {
  const db = await getDB();
  await db.runAsync("UPDATE post SET curtidas = curtidas + 1 WHERE id = ?", [id]);
}

export async function favoritarPost(id: number): Promise<void> {
  const db = await getDB();
  await db.runAsync("UPDATE post SET favorito = 1 WHERE id = ?", [id]);
}

export async function desfavoritarPost(id: number): Promise<void> {
  const db = await getDB();
  await db.runAsync("UPDATE post SET favorito = 0 WHERE id = ?", [id]);
}

export async function listarFavoritos(): Promise<Post[]> {
  const db = await getDB();
  return db.getAllAsync<Post>("SELECT * FROM post WHERE favorito = 1 ORDER BY id DESC");
}

export async function removerPost(id: number): Promise<void> {
  const db = await getDB();
  await db.runAsync("DELETE FROM post WHERE id = ?", [id]);
}

export async function contarFavoritos(): Promise<number> {
  const db = await getDB();
  const row = await db.getFirstAsync<{ total: number }>(
    "SELECT COUNT(*) as total FROM post WHERE favorito = 1"
  );
  return row?.total ?? 0;
}

export async function totalCurtidasUsuario(usuarioId: number): Promise<number> {
  const db = await getDB();
  const row = await db.getFirstAsync<{ total: number }>(
    "SELECT COALESCE(SUM(curtidas), 0) as total FROM post WHERE usuario_id = ?",
    [usuarioId]
  );
  return row?.total ?? 0;
}
