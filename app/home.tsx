import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomMenu from "../src/components/BottomMenu";
import * as ImagePicker from "expo-image-picker";
import { criarPost, listarPosts } from "../src/repositories/PostRepository";
import { Post } from "../src/types/post";

const categorias = ["Para Você", "Tecnologia", "Negócios", "Política", "Esporte"];

const destaques = [
  {
    id: "1",
    categoria: "TECNOLOGIA",
    titulo: "O futuro da Inteligência Artificial em 2025",
    leitura: "5 min leitura",
    tempo: "Há 2 horas",
    cor: "#dd5145",
    imagem: "https://picsum.photos/seed/ai/400/220",
  },
  {
    id: "2",
    categoria: "NEGÓCIOS",
    titulo: "Mercado atinge máxima histórica às 9h",
    leitura: "8 min leitura",
    tempo: "Há 1 hora",
    cor: "#2563eb",
    imagem: "https://picsum.photos/seed/market/400/220",
  },
];


export default function home() {
  const { nome, userId } = useLocalSearchParams<{ nome: string; userId: string }>();
  const categoriaSelecionada = "Para Você";
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [loadingPost, setLoadingPost] = useState(false);
  const [imagem, setImagem] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const carregarPosts = useCallback(async () => {
    try {
      const lista = await listarPosts();
      setPosts(lista);
    } catch {}
  }, []);

  useEffect(() => {
    carregarPosts();
  }, [carregarPosts]);

  async function selecionarImagem() {
    Alert.alert("Adicionar imagem", "Escolha uma opção", [
      {
        text: "Galeria",
        onPress: async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            Alert.alert(
              "Permissão negada",
              "Vá em Configurações e permita o acesso à galeria."
            );
            return;
          }
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.7,
          });
          if (!result.canceled) setImagem(result.assets[0].uri);
        },
      },
      {
        text: "Câmera",
        onPress: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted") {
            Alert.alert(
              "Permissão negada",
              "Vá em Configurações e permita o acesso à câmera."
            );
            return;
          }
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.7,
          });
          if (!result.canceled) setImagem(result.assets[0].uri);
        },
      },
      { text: "Cancelar", style: "cancel" },
    ]);
  }

  async function handlePublicar() {
    if (!titulo.trim() || !conteudo.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha o título e o conteúdo.");
      return;
    }
    try {
      setLoadingPost(true);
      await criarPost(titulo.trim(), conteudo.trim(), Number(userId), imagem);
      setTitulo("");
      setConteudo("");
      setImagem(null);
      setModalVisible(false);
      await carregarPosts();
      Alert.alert("Publicado!", "Seu post foi criado com sucesso.");
    } catch (e: any) {
      Alert.alert("Erro ao publicar", e?.message ?? String(e));
    } finally {
      setLoadingPost(false);
    }
  }

  return (
    <View style={style.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.scroll}
      >
        {/* Header */}
        <View style={style.header}>
          <View>
            <Text style={style.bomDia}>BOM DIA,</Text>
            <Text style={style.userName}>{nome ?? "Usuário"}</Text>
          </View>
          <TouchableOpacity style={style.bellButton}>
            <Ionicons name="notifications-outline" size={22} color="#1a1a1a" />
          </TouchableOpacity>
        </View>

        {/* Busca */}
        <View style={style.buscaContainer}>
          <Ionicons name="search-outline" size={16} color="#aaa" style={style.buscaIcone} />
          <TextInput
            style={style.buscaInput}
            placeholder="Buscar notícias..."
            placeholderTextColor="#bbb"
          />
        </View>

        {/* Categorias */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.categoriasScroll}
        >
          {categorias.map((cat) => {
            const ativa = cat === categoriaSelecionada;
            return (
              <TouchableOpacity
                key={cat}
                style={[style.categoriaPill, ativa && style.categoriaPillAtiva]}
                activeOpacity={0.8}
              >
                <Text style={[style.categoriaTexto, ativa && style.categoriaTextoAtivo]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Destaques */}
        <View style={style.sectionHeader}>
          <Text style={style.sectionTitle}>Destaques</Text>
          <TouchableOpacity>
            <Text style={style.verTudo}>VER TUDO</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.destaquesScroll}
        >
          {destaques.map((item) => (
            <TouchableOpacity key={item.id} style={style.destaqueCard} activeOpacity={0.9}>
              <Image source={{ uri: item.imagem }} style={style.destaqueImagem} />
              <View style={style.destaqueOverlay}>
                <View style={[style.categoriaTag, { backgroundColor: item.cor }]}>
                  <Text style={style.categoriaTagTexto}>{item.categoria}</Text>
                </View>
                <Text style={style.destaqueTitulo}>{item.titulo}</Text>
                <View style={style.destaqueMeta}>
                  <Ionicons name="time-outline" size={11} color="#ddd" />
                  <Text style={style.destaqueMetaTexto}>{item.leitura}</Text>
                  <Text style={style.destaqueMetaSep}>•</Text>
                  <Text style={style.destaqueMetaTexto}>{item.tempo}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Últimas Notícias */}
        <Text style={[style.sectionTitle, { marginHorizontal: 20, marginBottom: 12 }]}>
          Últimas Notícias
        </Text>

        {posts.length === 0 ? (
          <View style={style.emptyContainer}>
            <Ionicons name="newspaper-outline" size={40} color="#ddd" />
            <Text style={style.emptyText}>Nenhuma publicação ainda.</Text>
            <Text style={style.emptySubText}>Crie o primeiro post!</Text>
          </View>
        ) : (
          posts.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={style.noticiaCard}
              activeOpacity={0.85}
              onPress={() =>
                router.push({
                  pathname: "/post/[id]",
                  params: { id: item.id, userId },
                } as any)
              }
            >
              {item.imagem ? (
                <Image source={{ uri: item.imagem }} style={style.noticiaImagem} />
              ) : (
                <View style={style.postIconBox}>
                  <Ionicons name="document-text-outline" size={28} color="#dd5145" />
                </View>
              )}
              <View style={style.noticiaInfo}>
                <Text style={style.noticiaCategoria}>PUBLICAÇÃO</Text>
                <Text style={style.noticiaTitulo}>{item.titulo}</Text>
                <Text style={style.noticiaConteudoPreview} numberOfLines={1}>
                  {item.conteudo}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: 16 }} />
      </ScrollView>

      <BottomMenu onCreatePress={() => setModalVisible(true)} userId={userId} />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={style.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableOpacity style={style.modalBackdrop} onPress={() => setModalVisible(false)} />
          <View style={style.modalCard}>
            <View style={style.modalHeader}>
              <Text style={style.modalTitle}>Novo Post</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color="#888" />
              </TouchableOpacity>
            </View>

            <Text style={style.modalLabel}>Título</Text>
            <TextInput
              style={style.modalInput}
              placeholder="Título do post..."
              placeholderTextColor="#aaa"
              value={titulo}
              onChangeText={setTitulo}
              maxLength={100}
            />

            <Text style={style.modalLabel}>Conteúdo</Text>
            <TextInput
              style={style.modalTextarea}
              placeholder="Escreva o conteúdo aqui..."
              placeholderTextColor="#aaa"
              multiline
              textAlignVertical="top"
              value={conteudo}
              onChangeText={setConteudo}
              maxLength={1000}
            />

            <Text style={style.modalLabel}>Imagem</Text>
            <TouchableOpacity style={style.imagePicker} onPress={selecionarImagem} activeOpacity={0.8}>
              {imagem ? (
                <Image source={{ uri: imagem }} style={style.imagePreview} />
              ) : (
                <View style={style.imagePickerEmpty}>
                  <Ionicons name="image-outline" size={32} color="#bbb" />
                  <Text style={style.imagePickerText}>Toque para escolher uma foto</Text>
                </View>
              )}
            </TouchableOpacity>
            {imagem && (
              <TouchableOpacity onPress={() => setImagem(null)} style={style.removeImage}>
                <Ionicons name="trash-outline" size={14} color="#dd5145" />
                <Text style={style.removeImageText}>Remover imagem</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[style.modalButton, loadingPost && style.modalButtonDisabled]}
              onPress={handlePublicar}
              activeOpacity={0.85}
              disabled={loadingPost}
            >
              <Text style={style.modalButtonText}>
                {loadingPost ? "Publicando..." : "Publicar"}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f2",
  },
  scroll: {
    paddingTop: 56,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  bomDia: {
    fontSize: 12,
    color: "#aaa",
    fontWeight: "600",
    letterSpacing: 1,
  },
  userName: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1a1a1a",
    marginTop: 2,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  buscaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 44,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  buscaIcone: {
    marginRight: 8,
  },
  buscaInput: {
    flex: 1,
    fontSize: 14,
    color: "#1a1a1a",
  },
  categoriasScroll: {
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 24,
  },
  categoriaPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  categoriaPillAtiva: {
    backgroundColor: "#dd5145",
    borderColor: "#dd5145",
  },
  categoriaTexto: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },
  categoriaTextoAtivo: {
    color: "#fff",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a1a1a",
  },
  verTudo: {
    fontSize: 12,
    fontWeight: "700",
    color: "#dd5145",
    letterSpacing: 0.5,
  },
  destaquesScroll: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 28,
  },
  destaqueCard: {
    width: 260,
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
  },
  destaqueImagem: {
    width: "100%",
    height: "100%",
  },
  destaqueOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  categoriaTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  categoriaTagTexto: {
    fontSize: 9,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  destaqueTitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 20,
    marginBottom: 6,
  },
  destaqueMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  destaqueMetaTexto: {
    fontSize: 10,
    color: "#ddd",
  },
  destaqueMetaSep: {
    color: "#ddd",
    fontSize: 10,
  },
  noticiaCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  noticiaImagem: {
    width: 72,
    height: 72,
    borderRadius: 10,
  },
  noticiaInfo: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  noticiaCategoria: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  noticiaTitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a1a",
    lineHeight: 20,
  },
  noticiaMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  noticiaMetaTexto: {
    fontSize: 11,
    color: "#aaa",
  },
  noticiaMetaSep: {
    color: "#ccc",
    fontSize: 11,
  },
  postIconBox: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: "#fff0ee",
    justifyContent: "center",
    alignItems: "center",
  },
  noticiaConteudoPreview: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 32,
    gap: 6,
  },
  emptyText: {
    fontSize: 15,
    color: "#bbb",
    fontWeight: "600",
  },
  emptySubText: {
    fontSize: 13,
    color: "#ccc",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  modalLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
  },
  modalInput: {
    height: 50,
    borderColor: "#e5e5e5",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#1a1a1a",
    backgroundColor: "#fafafa",
    marginBottom: 16,
  },
  modalTextarea: {
    height: 120,
    borderColor: "#e5e5e5",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1a1a1a",
    backgroundColor: "#fafafa",
    marginBottom: 20,
  },
  modalButton: {
    height: 52,
    backgroundColor: "#dd5145",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#dd5145",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  modalButtonDisabled: {
    opacity: 0.6,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  imagePicker: {
    borderWidth: 1.5,
    borderColor: "#e5e5e5",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
    backgroundColor: "#fafafa",
  },
  imagePreview: {
    width: "100%",
    height: 160,
  },
  imagePickerEmpty: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  imagePickerText: {
    fontSize: 13,
    color: "#bbb",
  },
  removeImage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 16,
  },
  removeImageText: {
    fontSize: 12,
    color: "#dd5145",
    fontWeight: "600",
  },
});
