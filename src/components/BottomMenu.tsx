import { router, usePathname } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onCreatePress?: () => void;
  userId?: string;
};

export default function BottomMenu({ onCreatePress, userId }: Props) {
  const pathname = usePathname();

  function isActive(route: string) {
    return pathname === route || pathname.startsWith(route + "/");
  }

  function goTo(route: string) {
    router.push(route as any);
  }

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.tab} onPress={() => goTo("/home")} activeOpacity={0.7}>
        <Ionicons name={isActive("/home") ? "home" : "home-outline"} size={24} color={isActive("/home") ? "#dd5145" : "#aaa"} />
        <Text style={[style.label, isActive("/home") && style.labelActive]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.tab} onPress={() => router.push({ pathname: "/salvo", params: { userId } } as any)} activeOpacity={0.7}>
        <Ionicons name={isActive("/salvo") ? "bookmark" : "bookmark-outline"} size={24} color={isActive("/salvo") ? "#dd5145" : "#aaa"} />
        <Text style={[style.label, isActive("/salvo") && style.labelActive]}>Salvo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.createTab} onPress={onCreatePress} activeOpacity={0.85}>
        <View style={style.createButton}>
          <Ionicons name="add" size={28} color="#fff" />
        </View>
        <Text style={style.createLabel}>Criar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.tab} onPress={() => goTo("/perfil")} activeOpacity={0.7}>
        <Ionicons name={isActive("/perfil") ? "person" : "person-outline"} size={24} color={isActive("/perfil") ? "#dd5145" : "#aaa"} />
        <Text style={[style.label, isActive("/perfil") && style.labelActive]}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
    alignItems: "center",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingBottom: 2,
  },
  label: {
    fontSize: 11,
    color: "#aaa",
    fontWeight: "500",
  },
  labelActive: {
    color: "#dd5145",
    fontWeight: "700",
  },
  createTab: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#dd5145",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#dd5145",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  createLabel: {
    fontSize: 11,
    color: "#dd5145",
    fontWeight: "700",
  },
});
