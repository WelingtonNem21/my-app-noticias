import {
    StyleSheet,
    Text,
    View
} from "react-native";

export default function home() {
  return (
    <View style={style.conteiner}>
      <View>
        <Text style={style.titulo}>
          Daily <Text style={style.tituloCor}>News</Text>
        </Text>
        <Text style={style.subtitulo}>Sua leitura essencial de hoje</Text>
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
});
