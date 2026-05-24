import { router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function esqueci() {
  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.topSection}>
        <View style={style.logo}>
          <Text style={style.logoText}>DN</Text>
        </View>
        <Text style={style.titulo}>Esqueceu a senha?</Text>
        <Text style={style.subtitulo}>
          Não se preocupe. Digite seu email abaixo e enviaremos as instruções de
          recuperação.
        </Text>
      </View>

      <View style={style.card}>
        <View style={style.fieldGroup}>
          <Text style={style.label}>Email ou telefone</Text>
          <TextInput
            style={style.input}
            placeholder="exemplo@email.com"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={style.button}
          activeOpacity={0.85}
        >
          <Text style={style.buttonText}>Enviar instruções</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          style={style.backButton}
          activeOpacity={0.7}
        >
          <Text style={style.backButtonText}>← Voltar para o login</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 10,
  },
  logo: {
    backgroundColor: "#dd5145",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    lineHeight: 22,
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  backButton: {
    marginTop: 16,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 14,
    color: "#dd5145",
    fontWeight: "600",
  },
});
