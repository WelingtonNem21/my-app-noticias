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

export default function PostDetalhe() {
  const { id, userId } = useLocalSearchParams<{ id: string; userId: string }>();
  const [post, setPost] = useState<Post | null>(null);

  async function carregar() {
    try {
      const p = await getPostById(Number(id));
      setPost(p);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar o post.");
    }
  }

  useEffect(() => {
    carregar();
  }, [id]);

  async function handleCurtir() {
    if (!post) return;
    try {
      await curtirPost(post.id);
      setPost((prev) => prev ? { ...prev, curtidas: prev.curtidas + 1 } : prev);
    } catch {
      Alert.alert("Erro", "Não foi possível curtir.");
    }
  }

  async function handleFavoritar() {
    if (!post) return;
    try {
      if (post.favorito) {
        await desfavoritarPost(post.id);
        setPost((prev) => prev ? { ...prev, favorito: 0 } : prev);
      } else {
        await favoritarPost(post.id);
        setPost((prev) => prev ? { ...prev, favorito: 1 } : prev);
      }
    } catch {
      Alert.alert("Erro", "Não foi possível favoritar.");
    }
  }

  if (!post) {
    return (
      <View style={style.loading}>
        <Text style={style.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity onPress={() => router.back()} style={style.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavoritar} style={style.favoriteBtn}>
          <Ionicons
            name={post.favorito ? "heart" : "heart-outline"}
            size={24}
            color={post.favorito ? "#dd5145" : "#aaa"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {post.imagem ? (
          <Image source={{ uri: post.imagem }} style={style.imagem} />
        ) : (
          <View style={style.imagemVazia}>
            <Ionicons name="document-text-outline" size={48} color="#ddd" />
          </View>
        )}

        <View style={style.content}>
          <Text style={style.categoria}>PUBLICAÇÃO</Text>
          <Text style={style.titulo}>{post.titulo}</Text>
          <Text style={style.conteudo}>{post.conteudo}</Text>

          <View style={style.rodape}>
            <TouchableOpacity style={style.curtirBtn} onPress={handleCurtir} activeOpacity={0.8}>
              <Ionicons name="heart" size={18} color="#dd5145" />
              <Text style={style.curtidas}>{post.curtidas}</Text>
              <Text style={style.curtirTexto}>Curtir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[style.salvoBtn, post.favorito ? style.salvoBtnAtivo : null]}
              onPress={handleFavoritar}
              activeOpacity={0.8}
            >
              <Ionicons
                name={post.favorito ? "bookmark" : "bookmark-outline"}
                size={16}
                color={post.favorito ? "#fff" : "#dd5145"}
              />
              <Text style={[style.salvoTexto, post.favorito ? style.salvoTextoAtivo : null]}>
                {post.favorito ? "Salvo" : "Salvar"}
              </Text>
            </TouchableOpacity>
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
  curtidas: {
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
