import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default (props) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ color: "gray" }}>친구 {props.friendProfileLen}</Text>
      <TouchableOpacity onPress={props.onPress}>
        <MaterialIcons
          name={props.isOpened ? "keyboard-arrow-down" : "keyboard-arrow-up"}
          size={24}
          color="lightgrey"
        />
      </TouchableOpacity>
    </View>
  );
};
