import { router } from "expo-router";
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
import { cadastrarUsuario } from "../src/repositories/UsuarioRepositores";

export default function cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCadastro() {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos.");
      return;
    }
    if (senha.length < 6) {
      Alert.alert("Senha fraca", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    try {
      setLoading(true);
      await cadastrarUsuario(nome.trim(), email.trim().toLowerCase(), senha);
      Alert.alert("Conta criada!", "Seu cadastro foi realizado com sucesso.", [
        { text: "Entrar", onPress: () => router.replace("/") },
      ]);
    } catch (e: any) {
      if (e?.message?.includes("UNIQUE")) {
        Alert.alert("Email já cadastrado", "Use outro email ou faça login.");
      } else {
        Alert.alert("Erro", "Não foi possível criar a conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={style.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={style.topSection}>
          <View style={style.logo}>
            <Text style={style.logoText}>DN</Text>
          </View>
          <Text style={style.titulo}>
            Daily <Text style={style.tituloCor}>News</Text>
          </Text>
          <Text style={style.subtitulo}>Crie sua conta gratuita</Text>
        </View>

        <View style={style.card}>
          <Text style={style.cardTitle}>Criar conta</Text>

          <View style={style.fieldGroup}>
            <Text style={style.label}>Nome completo</Text>
            <TextInput
              style={style.input}
              placeholder="João da Silva"
              placeholderTextColor="#aaa"
              autoCapitalize="words"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={style.fieldGroup}>
            <Text style={style.label}>Email</Text>
            <TextInput
              style={style.input}
              placeholder="exemplo@email.com"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={style.fieldGroup}>
            <Text style={style.label}>Senha</Text>
            <TextInput
              style={style.input}
              placeholder="••••••••"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <TouchableOpacity
            onPress={handleCadastro}
            style={[style.button, loading && style.buttonDisabled]}
            activeOpacity={0.85}
            disabled={loading}
          >
            <Text style={style.buttonText}>
              {loading ? "Criando conta..." : "Criar conta"}
            </Text>
          </TouchableOpacity>

          <View style={style.footer}>
            <Text style={style.footerText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text style={style.footerLink}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff2ed",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  topSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  logo: {
    backgroundColor: "#dd5145",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#dd5145",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  logoText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  titulo: {
    fontSize: 42,
    fontWeight: "bold",
    letterSpacing: -0.5,
    color: "#1a1a1a",
  },
  tituloCor: {
    color: "#dd5145",
  },
  subtitulo: {
    fontSize: 13,
    color: "#888",
    marginTop: 4,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 16,
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
  button: {
    height: 52,
    backgroundColor: "#dd5145",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 13,
    color: "#888",
  },
  footerLink: {
    fontSize: 13,
    fontWeight: "700",
    color: "#dd5145",
  },
});
