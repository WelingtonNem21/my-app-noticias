import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  curtirPost,
  desfavoritarPost,
  favoritarPost,
  getPostById,
} from "../../src/repositories/PostRepository";
import { Post } from "../../src/types/post";

const API_URL = "https://6a27486ba84f9d39e9086882.mockapi.io/teste/blogs";

type BlogPost = {
  id: string;
  titulo: string;
  conteudo: string;
  imagem: string;
  curtidas: number;
  usuario_id: number;
};

export default function PostDetalhe() {
  const { id, userId, source } = useLocalSearchParams<{
    id: string;
    userId: string;
    source?: string;
  }>();

  const isApi = source === "api";

  const [post, setPost] = useState<Post | null>(null);
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [curtidas, setCurtidas] = useState(0);

  useEffect(() => {
    if (isApi) {
      carregarApi();
    } else {
      carregarLocal();
    }
  }, [id]);

  async function carregarApi() {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error();
      const lista: BlogPost[] = await res.json();
      const data = lista.find((p) => String(p.id) === String(id));
      if (!data) throw new Error();
      setBlogPost(data);
      setCurtidas(data.curtidas);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar o post.");
    } finally {
      setLoading(false);
    }
  }

  async function carregarLocal() {
    try {
      setLoading(true);
      const p = await getPostById(Number(id));
      setPost(p);
      setCurtidas(p?.curtidas ?? 0);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar o post.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCurtir() {
    if (isApi) {
      setCurtidas((prev) => prev + 1);
      return;
    }
    if (!post) return;
    try {
      await curtirPost(post.id);
      setPost((prev) => (prev ? { ...prev, curtidas: prev.curtidas + 1 } : prev));
      setCurtidas((prev) => prev + 1);
    } catch {
      Alert.alert("Erro", "Não foi possível curtir.");
    }
  }

  async function handleFavoritar() {
    if (isApi || !post) return;
    try {
      if (post.favorito) {
        await desfavoritarPost(post.id);
        setPost((prev) => (prev ? { ...prev, favorito: 0 } : prev));
      } else {
        await favoritarPost(post.id);
        setPost((prev) => (prev ? { ...prev, favorito: 1 } : prev));
      }
    } catch {
      Alert.alert("Erro", "Não foi possível favoritar.");
    }
  }

  if (loading) {
    return (
      <View style={style.loading}>
        <Text style={style.loadingText}>Carregando...</Text>
      </View>
    );
  }

  const titulo = isApi ? blogPost?.titulo : post?.titulo;
  const conteudo = isApi ? blogPost?.conteudo : post?.conteudo;
  const imagem = isApi ? null : post?.imagem;
  const favorito = !isApi && !!post?.favorito;

  if (!titulo) {
    return (
      <View style={style.loading}>
        <Text style={style.loadingText}>Post não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity onPress={() => router.back()} style={style.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
        </TouchableOpacity>
        {!isApi && (
          <TouchableOpacity onPress={handleFavoritar} style={style.favoriteBtn}>
            <Ionicons
              name={favorito ? "heart" : "heart-outline"}
              size={24}
              color={favorito ? "#dd5145" : "#aaa"}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={style.imagem} />
        ) : (
          <View style={style.imagemVazia}>
            <Ionicons name="document-text-outline" size={48} color="#ddd" />
          </View>
        )}

        <View style={style.content}>
          <Text style={style.categoria}>{isApi ? "BLOG" : "PUBLICAÇÃO"}</Text>
          <Text style={style.titulo}>{titulo}</Text>
          <Text style={style.conteudo}>{conteudo}</Text>

          <View style={style.rodape}>
            <TouchableOpacity style={style.curtirBtn} onPress={handleCurtir} activeOpacity={0.8}>
              <Ionicons name="heart" size={18} color="#dd5145" />
              <Text style={style.curtidasTexto}>{curtidas}</Text>
              <Text style={style.curtirTexto}>Curtir</Text>
            </TouchableOpacity>

            {!isApi && (
              <TouchableOpacity
                style={[style.salvoBtn, favorito ? style.salvoBtnAtivo : null]}
                onPress={handleFavoritar}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={favorito ? "bookmark" : "bookmark-outline"}
                  size={16}
                  color={favorito ? "#fff" : "#dd5145"}
                />
                <Text style={[style.salvoTexto, favorito ? style.salvoTextoAtivo : null]}>
                  {favorito ? "Salvo" : "Salvar"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f2",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff5f2",
  },
  loadingText: {
    color: "#aaa",
    fontSize: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12,
    backgroundColor: "#fff5f2",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  imagem: {
    width: "100%",
    height: 240,
  },
  imagemVazia: {
    width: "100%",
    height: 160,
    backgroundColor: "#fff0ee",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
  },
  categoria: {
    fontSize: 11,
    fontWeight: "800",
    color: "#dd5145",
    letterSpacing: 1,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1a1a1a",
    lineHeight: 32,
    marginBottom: 16,
  },
  conteudo: {
    fontSize: 16,
    color: "#444",
    lineHeight: 26,
    marginBottom: 32,
  },
  rodape: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  curtirBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff0ee",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  curtidasTexto: {
    fontSize: 15,
    fontWeight: "700",
    color: "#dd5145",
  },
  curtirTexto: {
    fontSize: 14,
    color: "#dd5145",
    fontWeight: "600",
  },
  salvoBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: "#dd5145",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  salvoBtnAtivo: {
    backgroundColor: "#dd5145",
    borderColor: "#dd5145",
  },
  salvoTexto: {
    fontSize: 14,
    color: "#dd5145",
    fontWeight: "600",
  },
  salvoTextoAtivo: {
    color: "#fff",
  },
});
