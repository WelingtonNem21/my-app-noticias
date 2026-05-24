import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { listarFavoritos } from "../src/repositories/PostRepository";
import { Post } from "../src/types/post";
import BottomMenu from "../src/components/BottomMenu";

export default function Salvo() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);

  const carregar = useCallback(async () => {
    try {
      const lista = await listarFavoritos();
      setPosts(lista);
    } catch {}
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.headerTitle}>Posts Salvos</Text>
        <Ionicons name="bookmark" size={22} color="#dd5145" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={style.scroll}>
        {posts.length === 0 ? (
          <View style={style.empty}>
            <Ionicons name="bookmark-outline" size={48} color="#ddd" />
            <Text style={style.emptyText}>Nenhum post salvo ainda.</Text>
            <Text style={style.emptySubText}>Favorite um post para ele aparecer aqui.</Text>
          </View>
        ) : (
          posts.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={style.card}
              activeOpacity={0.85}
              onPress={() =>
                router.push({
                  pathname: "/post/[id]",
                  params: { id: item.id, userId },
                } as any)
              }
            >
              {item.imagem ? (
                <Image source={{ uri: item.imagem }} style={style.cardImagem} />
              ) : (
                <View style={style.cardIconBox}>
                  <Ionicons name="document-text-outline" size={28} color="#dd5145" />
                </View>
              )}
              <View style={style.cardInfo}>
                <Text style={style.cardCategoria}>PUBLICAÇÃO</Text>
                <Text style={style.cardTitulo}>{item.titulo}</Text>
                <Text style={style.cardPreview} numberOfLines={1}>{item.conteudo}</Text>
                <View style={style.cardMeta}>
                  <Ionicons name="heart" size={12} color="#dd5145" />
                  <Text style={style.cardMetaTexto}>{item.curtidas} curtidas</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 16 }} />
      </ScrollView>

      <BottomMenu onCreatePress={() => {}} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f2",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: "#fff5f2",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1a1a1a",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 60,
    gap: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#bbb",
    fontWeight: "600",
  },
  emptySubText: {
    fontSize: 13,
    color: "#ccc",
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 10,
    padding: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImagem: {
    width: 72,
    height: 72,
    borderRadius: 10,
  },
  cardIconBox: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: "#fff0ee",
    justifyContent: "center",
    alignItems: "center",
  },
  cardInfo: {
    flex: 1,
    justifyContent: "center",
    gap: 3,
  },
  cardCategoria: {
    fontSize: 10,
    fontWeight: "800",
    color: "#dd5145",
    letterSpacing: 0.5,
  },
  cardTitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a1a",
    lineHeight: 20,
  },
  cardPreview: {
    fontSize: 12,
    color: "#aaa",
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  cardMetaTexto: {
    fontSize: 11,
    color: "#aaa",
  },
});
