import { Link, router } from "expo-router";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function index() {
  return (
    <View style={style.conteiner}>
      <View>
        <Text style={style.titulo}>
          Daily <Text style={style.tituloCor}>News</Text>
        </Text>
        <Text style={style.subtitulo}>Sua leitura essencial de hoje</Text>
      </View>

      <View style={style.conteinerEmail}>
        <Text style={style.label}>Email ou Usuario</Text>
        <TextInput style={style.input} placeholder="exemplo@email.com" />
        <Text style={style.label}>Senha</Text>
        <TextInput style={style.input} placeholder="senha" />
        <Link href={"/esqueci"} style={style.esqueci}>
          Esqueci minha senha
        </Link>
        <View style={style.conteinersub}>
          <TouchableOpacity
            onPress={() => router.push("/home")}
            style={style.botton}
          >
            <Text>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.conteinerteste}>
        <TouchableOpacity style={style.google}>
          <Text>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.apple}>
          <Text style={style.textLabel}>Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  conteiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff2ed",
  },
  titulo: {
    fontSize: 45,
    fontWeight: "bold",
  },
  tituloCor: {
    color: "#dd5145",
  },
  subtitulo: {
    fontSize: 12,
    marginBottom: 15,
  },
  conteinerEmail: {
    width: "95%",
    padding: 5,
  },
  conteinersub: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    height: 50,
    borderColor: "rgba(0, 0, 0, 0.34)",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  botton: {
    height: 50,
    backgroundColor: "#d1a8a0",
    width: "70%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  conteinerteste: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  google: {
    backgroundColor: "white",
    width: 150,
    height: 60,
    borderRadius: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  apple: {
    backgroundColor: "black",
    width: 150,
    height: 60,
    borderRadius: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  textLabel: {
    color: "white",
    fontWeight: "bold",
  },
  esqueci: {
    marginVertical: 10,
    textAlign: "right",
    color: "#dd5f54",
  },
});
