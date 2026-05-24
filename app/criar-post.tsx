import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { criarPost } from "../src/repositories/PostRepository";

export default function CriarPost() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePublicar() {
    if (!titulo.trim() || !conteudo.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha o título e o conteúdo.");
      return;
    }
    if (!userId) {
      Alert.alert("Erro", "Sessão inválida. Faça login novamente.");
      router.replace("/");
      return;
    }
    try {
      setLoading(true);
      await criarPost(titulo.trim(), conteudo.trim(), Number(userId));
      Alert.alert("Post publicado!", "Seu post foi criado com sucesso.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert("Erro", "Não foi possível publicar o post. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.header}>
        <TouchableOpacity onPress={() => router.back()} style={style.backBtn}>
          <Text style={style.backText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={style.headerTitle}>Novo Post</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView
        contentContainerStyle={style.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={style.card}>
          <View style={style.fieldGroup}>
            <Text style={style.label}>Título</Text>
            <TextInput
              style={style.input}
              placeholder="Título do post..."
              placeholderTextColor="#aaa"
              value={titulo}
              onChangeText={setTitulo}
              maxLength={100}
            />
            <Text style={style.counter}>{titulo.length}/100</Text>
          </View>

          <View style={style.fieldGroup}>
            <Text style={style.label}>Conteúdo</Text>
            <TextInput
              style={style.textarea}
              placeholder="Escreva o conteúdo aqui..."
              placeholderTextColor="#aaa"
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              value={conteudo}
              onChangeText={setConteudo}
              maxLength={1000}
            />
            <Text style={style.counter}>{conteudo.length}/1000</Text>
          </View>

          <TouchableOpacity
            onPress={handlePublicar}
            style={[style.button, loading && style.buttonDisabled]}
            activeOpacity={0.85}
            disabled={loading}
          >
            <Text style={style.buttonText}>
              {loading ? "Publicando..." : "Publicar post"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backBtn: {
    width: 70,
  },
  backText: {
    fontSize: 14,
    color: "#dd5145",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  scroll: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderColor: "#e5e5e5",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#1a1a1a",
    backgroundColor: "#fafafa",
  },
  textarea: {
    minHeight: 160,
    borderColor: "#e5e5e5",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1a1a1a",
    backgroundColor: "#fafafa",
  },
  counter: {
    fontSize: 11,
    color: "#bbb",
    textAlign: "right",
    marginTop: 4,
  },
  button: {
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
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
