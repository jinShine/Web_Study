import { ScrollView, View } from "react-native";
import Profile from "./Profile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Margin from "./Margin";

export default (props) => {
  if (!props.isOpened) {
    return null;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {props.data.map((item, index) => (
        <View key={index}>
          <Profile
            uri={item.uri}
            name={item.name}
            introduction={item.introduction}
          />
          <Margin height={13} />
        </View>
      ))}
    </ScrollView>
  );
};
