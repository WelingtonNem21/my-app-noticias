export type Post = {
  id: number;
  titulo: string;
  conteudo: string;
  imagem: string | null;
  curtidas: number;
  favorito: number;
  usuario_id: number;
};
