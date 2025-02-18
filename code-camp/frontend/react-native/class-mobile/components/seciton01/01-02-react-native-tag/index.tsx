import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReactNativeTagsPage() {
  const onPressButton = () => {
    console.log("버튼이 클릭되었습니다.");
  };
  const onPressText = () => {
    console.log("텍스트가 클릭되었습니다.");
  };
  const onChangeText = (text: string) => {
    console.log(text);
  };
  const onScroll = () => {
    console.log("스크롤되었습니다.");
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "blue" }}
      // edges={["top", "bottom"]}
    >
      <StatusBar style="dark" />

      <Button onPress={onPressButton} title="버튼" />

      {/* 
        직접적으로 Text태그에 onPress를 사용해도 되지만
        보통 RN은 TouchableOpacity 태그를 감싸서 사용한다
      */}
      {/* <Text onPress={onPressText}>텍스트</Text> */}
      <TouchableOpacity onPress={onPressText}>
        <Text>텍스트</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="비밀번호를 입력해주세요"
        secureTextEntry={true}
      />

      <View style={styles.boarderList}>
        <FlatList
          data={[
            { number: 1, title: "1번" },
            { number: 2, title: "2번" },
            { number: 3, title: "3번" },
            { number: 4, title: "4번" },
            { number: 5, title: "5번" },
            { number: 6, title: "6번" },
            { number: 7, title: "7번" },
            { number: 8, title: "8번" },
            { number: 9, title: "9번" },
            { number: 10, title: "10번" },
          ]}
          renderItem={({ item, index }) => {
            return (
              <Text>
                글번호: {item.number}, 글제목: {item.title}
              </Text>
            );
          }}
          onScroll={onScroll}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "blue",
  },
  boarderList: {
    height: 100,
  },
});
