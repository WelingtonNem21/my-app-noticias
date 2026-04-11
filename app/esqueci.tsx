import { router } from "expo-router";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function esqueci() {
  return (
    <View style={style.conteiner}>
      <View style={style.logo}>
        <Text>Logo</Text>
      </View>
      <View>
        <Text style={style.titulo}>Esqueceu a senha?</Text>
        <Text style={style.subtitulo}>
          Não se preocupe. Digite seu email ou telefone {"\n"} abaixo para
          receber as instruçôes de recuperação.
        </Text>
      </View>

      <View style={style.conteinerEmail}>
        <TextInput style={style.input} placeholder="exemplo@email.com" />

        <View style={style.conteinerBoton}>
          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={style.botton}
          >
            <Text>Enviar link/código</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 30,
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
    width: "90%",
  },
  conteinerBoton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
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
    backgroundColor: "#dd5145",
    width: "70%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
});
