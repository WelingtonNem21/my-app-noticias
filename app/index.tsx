import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { loginUsuario } from "../src/repositories/UsuarioRepositores";

export default function index() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha email e senha.");
      return;
    }
    try {
      setLoading(true);
      const user = await loginUsuario(email.trim().toLowerCase(), senha);
      if (!user) {
        Alert.alert("Credenciais inválidas", "Email ou senha incorretos.");
        return;
      }
      router.replace({
        pathname: "/home",
        params: { userId: user.id, nome: user.nome },
      });
    } catch {
      Alert.alert("Erro", "Não foi possível fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.topSection}>
        <View style={style.logo}>
          <Text style={style.logoText}>DN</Text>
        </View>
        <Text style={style.titulo}>
          Daily <Text style={style.tituloCor}>News</Text>
        </Text>
        <Text style={style.subtitulo}>Sua leitura essencial de hoje</Text>
      </View>

      <View style={style.card}>
        <Text style={style.cardTitle}>Entrar na conta</Text>

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

        <TouchableOpacity onPress={() => router.push("/esqueci")}>
          <Text style={style.esqueci}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          style={[style.button, loading && style.buttonDisabled]}
          activeOpacity={0.85}
          disabled={loading}
        >
          <Text style={style.buttonText}>
            {loading ? "Entrando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

        <View style={style.separador}>
          <View style={style.linha} />
          <Text style={style.separadorTexto}>ou continue com</Text>
          <View style={style.linha} />
        </View>

        <View style={style.socialRow}>
          <TouchableOpacity style={style.socialButton} activeOpacity={0.8}>
            <Text style={style.socialTexto}>G  Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.socialButton, style.socialPreto]}
            activeOpacity={0.8}
          >
            <Text style={[style.socialTexto, style.socialTextWhite]}>
               Apple
            </Text>
          </TouchableOpacity>
        </View>

        <View style={style.rodape}>
          <Text style={style.rodapeTexto}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push("/cadastro")}>
            <Text style={style.rodapeLink}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff2ed",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
  esqueci: {
    textAlign: "right",
    color: "#dd5145",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 20,
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
  separador: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: "#e8e8e8",
  },
  separadorTexto: {
    marginHorizontal: 10,
    fontSize: 12,
    color: "#aaa",
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e5e5e5",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  socialPreto: {
    backgroundColor: "#111",
    borderColor: "#111",
  },
  socialTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  socialTextWhite: {
    color: "#fff",
  },
  rodape: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  rodapeTexto: {
    fontSize: 13,
    color: "#888",
  },
  rodapeLink: {
    fontSize: 13,
    fontWeight: "700",
    color: "#dd5145",
  },
});
